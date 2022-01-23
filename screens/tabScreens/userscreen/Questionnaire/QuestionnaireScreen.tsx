// import { styles } from './styles.js';
import { Image, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text } from '../../../../components/Themed';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const QuestionnareScreen = ({ navigation, route, value }: { navigation: NavigationProp<any>, route: any, value: any }) => {
  const [isEdit, setIsEdit] = useState(false);
  const win = Dimensions.get('window');
  const [category_data, setCategory] = useState([{ category: '' }]);
  const [category_datasave, setCategorysave] = useState([{ category: '' }]);
  const [editdata, setEditdata] = useState([]);
  const [editdatasave, setEditdatasave] = useState([]);
  const [isZeroCategory, setIsZeroCategory] = useState([])
  const [percent, setPercent] = useState(0)
  const [testdata, setTextdata] = useState(['']);
  const [testdatasave, setTextdatasave] = useState(['']);
  const [filterState, setFilterState] = useState('all');

  const toast = useToast();

  function handleInput(text: string, fieldType: string) {
    let arr: any[] = testdata;
    category_data.map((item, index) => {
      //@ts-ignore
      if (item.possibleAnswers === null) {
        let name = 'name' + index;
        if (fieldType === name) {
          arr[index] = text;
          setTextdata([...arr]);
          calcPercent(editdata);
        }
      }
    })
  }

  const calcPercent = (data: any) => {
    let part_percent: number = 100 / data.length;
    let real_percent: number = 0;
    data.map((item: any, data_index: number) => {
      if (item.data === "no") {
        if (item.title != '') {
          real_percent = real_percent + part_percent;
        } else {
          testdata.map((text: any, text_index: number) => {
            if (text != "") {
              real_percent = real_percent + part_percent;
            }
          })
        }
      } else {
        if (item.doAllowMultipleAnswers) {
          let cnt: number = 0;
          let len: number = item.data.length;
          let part: number = 0;
          item.data.map((item_arr: any, arr_index: number) => {
            if (item_arr.state) {
              cnt++;
            }
            part = (cnt / len) * part_percent;
          })
          real_percent = real_percent + part;
        } else {
          item.data.map((item_arr: any, arr_index: number) => {
            if (item_arr.state) {
              real_percent = real_percent + part_percent;
            }
          })
        }
      }
    })
    setPercent(real_percent);
  }

  const btnClick = (i: number, index: number) => {
    if (isEdit) {
      if (category_data[0].category.length > 0) {
        //@ts-ignore
        if (editdata[i].doAllowMultipleAnswers) {
          //@ts-ignore
          editdata[i].data[index].state = !editdata[i].data[index].state;
          setEditdata([...editdata]);
          let filterData: string = filterState;
          answerFilter(filterData);
        } else {
          //@ts-ignore
          editdata[i].data.map((edit_data: any, k: number) => {
            if (k == index) {
              //@ts-ignore
              edit_data.state = true;
            } else {
              //@ts-ignore
              edit_data.state = false;
            }
            setEditdata([...editdata]);
            let filterData: string = filterState;
            answerFilter(filterData);
          })
        }
      }
      calcPercent(editdatasave);
    }
  }

  const handleQuestionnaire = async () => {
    let post_data: any = [];
    editdata.map((item, index) => {
      //@ts-ignore
      if (item.data === 'no') {
        //@ts-ignore
        let answerLabel: string = category_data[index].answerLabel;
        let answer: object = { [answerLabel]: testdata[index] };
        //@ts-ignore
        let questionId: string = category_data[index].questionId;
        let answer_data_individual: object = {};
        //@ts-ignore
        if (category_data[index].answers.length > 0) {
          //@ts-ignore
          let answerId: string = category_data[index].answers[0].answerId;
          answer_data_individual = { answer, questionId, answerId };
        } else {
          answer_data_individual = { answer, questionId };
        }
        post_data.push(answer_data_individual);
        cnt++;

      } else {
        let q_answer: any = [];
        let answer_data_individual: object = {};
        //@ts-ignore
        item.data.map((ans_data, i) => {
          if (ans_data.state) {
            q_answer.push(ans_data.title);
            //@ts-ignore
            let answerLabel: string = category_data[index].answerLabel;
            let answer: object = { [answerLabel]: q_answer };
            //@ts-ignore
            let questionId: string = category_data[index].questionId;
            //@ts-ignore
            if (category_data[index].answers.length > 0) {
              //@ts-ignore
              let answerId: string = category_data[index].answers[0].answerId;
              answer_data_individual = { answer, questionId, answerId };
            } else {
              answer_data_individual = { answer, questionId };
            }
          } else {
            q_answer.push();
            //@ts-ignore
            let answerLabel: string = category_data[index].answerLabel;
            let answer: object = { [answerLabel]: q_answer };
            //@ts-ignore
            let questionId: string = category_data[index].questionId;
            //@ts-ignore
            if (category_data[index].answers.length > 0) {
              //@ts-ignore
              let answerId: string = category_data[index].answers[0].answerId;
              answer_data_individual = { answer, questionId, answerId };
            } else {
              answer_data_individual = { answer, questionId };
            }
          }
        })
        post_data.push(answer_data_individual);
      }
    })
    let real_post: object = { "answers": post_data };
    let zeroArray: any[] = [];
    let cnt: number = 0;
    //@ts-ignore
    real_post.answers.map((real: any, real_index: number) => {
      // let zeroState: any = isZeroCategory
      if (real.answer == undefined) {
        cnt++;
        zeroArray.push(true);
      } else {
        zeroArray.push(false);
      }

      //@ts-ignore
      setIsZeroCategory(zeroArray);
    })

    setPercent(0);
    try {
      const value = await AsyncStorage.getItem('user_data');
      if (value !== null) {
        let data = JSON.parse(value);
        let user_id = data.userId;
        let post_data: string = JSON.stringify(real_post);
        fetch('http://ec2-3-144-42-178.us-east-2.compute.amazonaws.com:5000/api/user/' + user_id + '/answer/updateAnswers',
          {
            method: 'post',
            headers: {
              'Content-Type': "application/json",
              'password': 'passwordAUA'
            },
            body: post_data

          })
          .then((response) => response.json())
          .then(async (responseJson) => {
            if (responseJson.length !== 0) {

            }
          }).catch((error) => {
            alert('error')
          })
      }
    } catch (error) {
      // Error retrieving data
    }
    setIsEdit(false);
  }
  const Edit = () => {
    console.log("state=====", isEdit)
    if (isEdit) {
      // let text_data = testdatasave;
      // let edit_data = editdatasave;
      // let ceto_data = category_datasave;
      // setTextdata(text_data);
      // setEditdata(edit_data);
      // setCategory(ceto_data);
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }

  const answerFilter = (text: string) => {
    if (text == 'all') {
      setFilterState('all');
      let data = editdatasave;
      let data_text = testdatasave;
      let data_cate = category_datasave;
      setTimeout(function () {
        setEditdata([...data]);
        setTextdata(data_text);
        setCategory(data_cate);
      }, 0.1);

    } else if (text == 'answered') {
      setFilterState('answered');
      let save_arr: any = [];
      let save_text: any = [];
      let save_cate: any = [];
      editdatasave.map((save_data: any, save_index: number) => {
        if (save_data.data == 'no') {
          if (save_data.title.length > 0) {
            save_arr.push(save_data);
            save_text.push(save_data.title);
            save_cate.push(category_datasave[save_index]);
          }
        } else {
          let cnt: number = 0;
          save_data.data.map((item: any, index: number) => {
            if (item.state) {
              cnt++;
            }
          })
          if (cnt > 0) {
            save_arr.push(save_data);
            save_text.push('');
            save_cate.push(category_datasave[save_index]);
          }
        }
      })
      if (save_arr.length > 0) {
        setEditdata(save_arr);
      } else {
        toast.show("There is no Answered Question.", {
          type: "danger",
          dangerColor: '#FF737F',
          duration: 4000,
          animationType: "slide-in",
        });
      }
      if (save_text.length > 0) {
        setTextdata(save_text);
      }
      if (save_cate.length > 0) {
        setCategory(save_cate);
      }
    } else if (text == 'unanswered') {
      setFilterState('unanswered');
      let save_arr: any = [];
      let save_text: any = [];
      let save_cate: any = [];
      editdatasave.map((save_data: any, save_index: number) => {
        if (save_data.data == 'no') {
          if (save_data.title.length == 0) {
            save_arr.push(save_data);
            save_text.push(save_data.title);
            save_cate.push(category_datasave[save_index]);
          }
        } else {
          let cnt: number = 0;
          save_data.data.map((item: any, index: number) => {
            if (item.state) {
              cnt++;
            }
          })
          if (cnt == 0) {
            save_arr.push(save_data);
            save_text.push('');
            save_cate.push(category_datasave[save_index]);
          }
        }
      })
      if (save_arr.length > 0) {
        setEditdata(save_arr);
      } else {
        toast.show("There is no Unanswered Question.", {
          type: "danger",
          dangerColor: '#FF737F',
          duration: 4000,
          animationType: "slide-in",
        });
      }
      if (save_text.length > 0) {
        setTextdata(save_text);
      }
      if (save_cate.length > 0) {
        setCategory(save_cate);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const { category_name, user_id } = route.params;
      let fetchurl: any = 'http://ec2-3-144-42-178.us-east-2.compute.amazonaws.com:5000/api/user/' + user_id + '/category/' + category_name + '/answers';
      fetch(fetchurl,
        {
          method: 'get',
          headers: {
            'Content-Type': "application/json",
            'password': 'passwordAUA'
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("db data", responseJson);
          let textarr: any = [];
          if (responseJson.length !== 0) {
            let arr: any[] = [];
            responseJson.map((data: any, i: number) => {
              textarr.push('');
              if (data.answers && data.answers.length > 0) {
                if (data.answerType !== "array") {
                  let answerLabel: string = data.answerLabel;
                  let title: any = data.answers[0].answer[answerLabel];
                  textarr[i] = title;
                  let item = { 'data': 'no', title, 'questionId': data.questionId, answerId: data.answers[0].answerId, doAllowMultipleAnswers: data.doAllowMultipleAnswers };
                  arr.push(item);
                } else {
                  textarr[i] = '';
                  let arr_poss: any[] = [];
                  let arr_num: any[] = [];
                  let obj_data: {
                    data: any[],
                    doAllowMultipleAnswers: boolean;
                  }
                  let key: any = data.answerLabel;
                  data.possibleAnswers.map((possibleanswer: any, pos_index: number) => {
                    let cnt: number = 0;
                    data.answers[0].answer[key].map((answer: any, k: number) => {
                      if (answer == possibleanswer) {
                        cnt++;
                        let item = { title: possibleanswer, state: true, saveState: false, 'questionId': data.questionId, 'answerID': answer.answerId };
                        arr_poss.push(item);
                        arr_num.push(pos_index);
                      }
                    })
                    if (cnt == 0) {
                      let item = { title: possibleanswer, state: false, saveState: false, 'questionId': data.questionId, 'answerID': data.answers[0].answerId };
                      arr_poss.push(item);
                    }
                  })
                  obj_data = { 'data': arr_poss, doAllowMultipleAnswers: data.doAllowMultipleAnswers };
                  arr.push(obj_data);
                }
              } else if (!data.answers || data.answers.length == 0) {
                if (data.possibleAnswers === null) {
                  textarr[i] = '';
                  let item = { 'data': 'no', 'title': '', 'questionId': data.questionId, doAllowMultipleAnswers: data.doAllowMultipleAnswers };
                  arr.push(item);
                } else if (data.possibleAnswers.length > 0) {
                  textarr[i] = '';
                  let arr_poss: any[] = [];
                  let obj_data: {
                    data: any[],
                    doAllowMultipleAnswers: boolean;
                  }
                  data.possibleAnswers.map((poss: any, j: number) => {
                    let item = { title: poss, state: false, saveState: false };
                    arr_poss.push(item);
                  })
                  obj_data = { 'data': arr_poss, doAllowMultipleAnswers: data.doAllowMultipleAnswers };
                  arr.push(obj_data);
                }
              }
            })
            //@ts-ignore
            setEditdata(arr);
            //@ts-ignore
            setEditdatasave(arr);
            setTextdata(textarr);
            setTextdatasave(textarr);
            setCategory(responseJson);
            setCategorysave(responseJson);
            calcPercent(arr);
          }
        }).catch((error) => {
          alert('error')
        })

    } catch (error) {
      // Error retrieving data
    }
  }

  const renderList = () => {
    if (category_data[0].category.length > 0) {
      return category_data.map((item: any, i) => {
        return (
          <View key={i} style={{ marginLeft: 20, marginRight: 20, flex: 1 }}>
            <View>
              <View style={styles.homePopularView} >
                <Text style={styles.homeTitleText}>{item.questionText}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                  {
                    //@ts-ignore
                    editdata[i].data === 'no' ? <View style={styles.loginForm}>
                      <TextInput
                        theme={{
                          roundness: 16,
                        }}
                        underlineColorAndroid="transparent"
                        outlineColor={!isEdit ? "#B00020" : "transparent"}
                        activeOutlineColor={!isEdit ? "#B00020" : "#30C0E9"}
                        disabled={!isEdit}
                        value={testdata[i]}
                        onChangeText={(text: any) => handleInput(text, 'name' + i)}
                        label="write your data"
                        autoComplete={'pass'}
                        mode="outlined"
                        error={false}
                        accessibilityLabel='name'
                      />
                    </View> :
                      //@ts-ignore
                      editdata[i].data.map((item: any, index: any) => {
                        return <View key={index} style={{ flexDirection: 'row' }}>
                          <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 5, marginTop: 3, marginBottom: 3, }}>
                            <Button mode='contained'
                              color={isEdit && item.state ? '#30C0E9' : item.state && !isEdit ? '#7BC67E' : '#D0D8E0'}
                              style={{ borderRadius: 20 }}
                              labelStyle={{ color: 'white' }}
                              contentStyle={{ flexDirection: 'row-reverse' }}
                              icon={isEdit && item.state ? "close-circle" : ''}
                              onPress={() => btnClick(i, index)}
                              accessibilityRole={'button'}
                              accessibilityLabel={i + 'testbtn' + index}
                            >
                              {item.title}
                            </Button>
                          </TouchableOpacity>
                        </View>
                      })}
                </View>
              </View>
              {isZeroCategory[i] && isEdit && <Text style={{ color: '#FF737F', fontSize: 12, fontWeight: '300' }}>Select at least one parameter</Text>}
            </View>
            <View style={{ height: 20 }}></View>
          </View>
        )
      })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={styles.loginWrap}>
          <View style={styles.gotobtn}>
            <View style={{ width: 80 }} >
              <TouchableOpacity
                onPress={() => navigation.goBack()} >
                <Image style={{ width: 50, height: 50, marginLeft: '5%' }} source={require('../../../../assets/icons/backBtn.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
            {
              category_data[0].category.length > 0 ? <Text style={styles.title}>{category_data[0].category}</Text>
                : <></>
            }
            <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
              <Text style={[styles.title, { color: isEdit ? '#30C0E9' : '#D0D8E0' }]}>{percent.toFixed(0)}%</Text>
              <TouchableOpacity accessibilityRole='button' accessibilityLabel='editbtn' style={{ marginTop: 5, }} onPress={() => Edit()}>
                {isEdit ?
                  <Image style={{ width: 25, height: 30, marginTop: 'auto', marginBottom: 10, marginRight: 30, marginLeft: 5, top: 7 }} source={require('../../../../assets/icons/close.jpg')} />
                  :
                  <Image style={{ width: 25, height: 30, marginTop: 'auto', marginBottom: 10, marginRight: 30, marginLeft: 5, top: 7 }} source={require('../../../../assets/icons/edit.jpg')} />
                }
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.questionProgress} >
            <View style={styles.progGender}>
              <View style={[styles.progGenderIN, { width: percent.toFixed(0) + '%' }]}></View>
            </View>
          </View>
          <View style={styles.answer_filter}>
            <TouchableOpacity onPress={() => answerFilter('all')}>
              <Text style={[styles.filter_btn, { color: '#30C0E9' }]} accessibilityRole='button' accessibilityLabel='btn_all'>All</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => answerFilter('answered')} accessibilityRole='button' accessibilityLabel='btn_answered'>
              <Text style={[styles.filter_btn, { color: '#30C0E9' }]}>Answered</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => answerFilter('unanswered')} accessibilityRole='button' accessibilityLabel='btn_unanswered'>
              <Text style={[styles.filter_btn, { color: '#30C0E9' }]}>Unanswered</Text>
            </TouchableOpacity>

          </View>
          {
            renderList()
          }
          <View style={{ height: 80 }}></View>

        </View>
      </ScrollView><View accessibilityRole='button' accessibilityLabel='qasavebtn' style={{ position: 'absolute', height: 60, width: win.width - 40, borderRadius: 30, bottom: 5, marginLeft: 20 }}>
        <TouchableOpacity onPress={isEdit ? () => handleQuestionnaire() : () => { navigation.goBack() }}>
          <Text style={[styles.homeTitleText1, { textAlign: 'center' }]}>{isEdit ? 'Save' : 'Goto Profile'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionnareScreen

import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  homeTitleText1: {
    fontSize: 20,
    // height:50,
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#30C0E9',
    padding: 15,
    paddingTop: 10,
    borderRadius: 30
  },
  btnStyle: {
    backgroundColor: '#30C0E9',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    color: 'white'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 'auto',
    marginLeft: 20
  },
  subText: {
    fontSize: 16,
    color: '#ACB7C2',
    marginTop: '2%',
    marginBottom: '2%',
  },
  loginWrap: {
    flex: 1,
  },
  questionProgress: {
    paddingRight: '7%',
    paddingLeft: '7%',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progGender: {
    height: 9,
    flexDirection: "row",
    width: '100%',
    backgroundColor: '#D0D8E0',
    borderColor: '#000',
    borderRadius: 5
  },
  progGenderIN: {
    height: 9,
    flexDirection: "row",
    backgroundColor: '#7BC67E',
    borderColor: '#7BC67E',
    borderWidth: 1,
    borderRadius: 5
  },
  homePopularView: {
    width: '98%',
    marginLeft: '1%',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  homeTitleArrow: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 13
  },
  homeTitleText: {
    fontSize: 16,
    fontWeight: '500'
  },
  homeTitleImage: {
    width: 42,
    height: 42,
    marginRight: 10
  },
  homeTitleView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    marginBottom: 20
  },
  loginForm: {
    // flex: 2,
    justifyContent: 'center',
    paddingLeft: '5%',
    paddingRight: '4%',
  },
  answer_filter: {
    margin: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  filter_btn: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 15,
  },
  gotobtn: {
    margin: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10,
  },
});