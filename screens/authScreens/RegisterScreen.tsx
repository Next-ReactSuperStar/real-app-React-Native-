import { styles } from './styles.js';
import { Image, View, ScrollView, TouchableOpacity, ToastAndroid, KeyboardAvoidingView, ActivityIndicator, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { TextInput, HelperText } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'
import React, { useState } from 'react';
import { useToast } from "react-native-toast-notifications";
import { Text } from '../../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from '@aws-amplify/auth';
import { RegisterMsgErr } from '../../constants/Msgtxt'

const Register = ({ navigation }: { navigation: NavigationProp<any>, route: any }) => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [email_error, setEmail_error] = useState('');
  const [username_error, setUsername_error] = useState('');
  const [password_error, setPassword_error] = useState('');
  const toast = useToast();

  // const fetchData = () => {
  //   fetch('http://ec2-3-144-42-178.us-east-2.compute.amazonaws.com:5000/api/question/getCategories',
  //     {
  //       method: 'get',
  //       headers: {
  //         'Content-Type': "application/json",
  //         'password': 'passwordAUA'
  //       },
  //     })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       if (responseJson.length !== 0) {
  //         // setCategory(responseJson);
  //         console.log("category data", responseJson);
  //       }
  //     }).catch((error) => {
  //       alert('error')
  //     })
  // }

  const onSignup = () => {
    if (username) {
      if (email) {
        if (password) {
          if (checked) {
            setButtonLoader(true);
            const user = Auth.signUp({
              username,
              password,
              attributes: {
                email,
                name: username,
              },
              validationData: [],
            })
              .then(async (data) => {
                setButtonLoader(false);
                let user_data: string = data.userSub;
                try {
                  await AsyncStorage.setItem('socialID', JSON.stringify(user_data));
                } catch (error) {
                  // Error saving data
                }
                console.log("social_data", user_data);
                fetch('http://ec2-3-144-42-178.us-east-2.compute.amazonaws.com:5000/api/user',
                  {
                    method: 'post',
                    headers: {
                      'Content-Type': "application/json",
                      'password': 'passwordAUA'
                    },
                    body: JSON.stringify({
                      "socialId": user_data,
                      "email": email
                    })

                  })
                  .then((response) => response.json())
                  .then(async (responseJson) => {
                    if (responseJson.length !== 0) {
                      // setCategory(responseJson);
                      console.log("category data", responseJson);
                      try {
                        await AsyncStorage.setItem('user_data', JSON.stringify(responseJson));
                      } catch (error) {
                        // Error saving data
                      }
                    }
                  }).catch((error) => {
                    alert('error')
                  })

                toast.show("Sign up success. You are now signed up.", {
                  type: "success",
                  successColor: '#7BC67E',
                  duration: 4000,
                  animationType: "slide-in",
                });
                navigation.navigate('EnterCode', { username, password, screen: 'otp-verification' });
              })
              .catch((err) => {
                setButtonLoader(false)
                if (err.message && err.message == 'User already exists') {
                  toast.show(RegisterMsgErr.userErr, {
                    type: "danger",
                    dangerColor: '#FF737F',
                    duration: 5000,
                    animationType: "slide-in",
                  });
                } else if (err.message && err.message != 'User already exists') {
                  toast.show(RegisterMsgErr.passwordErr, {
                    type: "danger",
                    dangerColor: '#FF737F',
                    duration: 5000,
                    animationType: "slide-in",
                  });
                }
              });
          }
        } else {
          setPassword_error('Password Required !')
        }
      } else {
        setEmail_error('Email Required !')
      }
    } else {
      setUsername_error('User Name Required !')
    }
  }

  function handleInput(text: string, fieldType: string) {
    if (fieldType === "name") {
      setUsername(text)
      setUsername_error('')
    } else if (fieldType === "email") {
      setEmail(text)
      setEmail_error('')
    } else if (fieldType === "password") {
      setPassword(text)
      setPassword_error('')
    }
  }

  return (
    // <ScrollView>
    <KeyboardAvoidingView style={styles.containerDiv} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.loginWrap}>
        <View style={{ width: 80 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()} >
            <Image style={{ width: 50, height: 50, marginLeft: '5%' }} source={require('../../assets/icons/backBtn.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
        <View style={{ paddingLeft: '5%' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Create your account</Text>
          </View>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
        {/* <View>

      </View> */}
        <View style={styles.loginForm}>
          <TextInput
            theme={{
              roundness: 16,
            }}
            underlineColorAndroid="transparent"
            outlineColor={username_error ? "#B00020" : "transparent"}
            activeOutlineColor={username_error ? "#B00020" : "#30C0E9"}
            value={username}
            onChangeText={(text: string) => handleInput(text, 'name')}
            label="Username"
            autoComplete={'pass'}
            mode="outlined"
            error={false}
            accessibilityLabel='username'
          />
          {username_error != '' && <Text style={styles.err_txt}>{username_error}</Text>}
          {/* <HelperText type="error" visible={username_error}>{username_error}</HelperText> */}
        </View>
        {username_error == '' && <View style={{ display: 'flex', alignItems: 'center', flex: 1, maxHeight: 20 }}></View>}
        <View style={styles.loginForm}>
          <TextInput
            theme={{
              roundness: 16,
            }}
            underlineColorAndroid="transparent"
            outlineColor={email_error ? "#B00020" : "transparent"}
            activeOutlineColor={email_error ? "#B00020" : "#30C0E9"}
            value={email}
            onChangeText={(text: string) => handleInput(text, 'email')}
            label="UserEmail"
            autoComplete={'pass'}
            mode="outlined"
            error={false}
            accessibilityLabel='email'
          />
          {email_error != '' && <Text style={styles.err_txt}>{email_error}</Text>}
          {/* <HelperText type="error" visible={email_error}>{email_error}</HelperText> */}
        </View>
        {email_error == '' && <View style={{ display: 'flex', alignItems: 'center', flex: 1, maxHeight: 20 }}></View>}
        <View style={styles.loginForm}>
          <TextInput
            theme={{
              roundness: 16,
            }}
            underlineColorAndroid="transparent"
            outlineColor={password_error ? "#B00020" : "transparent"}
            activeOutlineColor={password_error ? "#B00020" : "#30C0E9"}
            value={password}
            onChangeText={(text: string) => handleInput(text, 'password')}
            label="Password"
            secureTextEntry={showPassword ? true : false}
            autoComplete={'pass'}
            mode="outlined"
            error={false}
            right={<TextInput.Icon onPress={() => { setShowPassword(!showPassword) }} name="eye" />}
            accessibilityLabel='password'
          />
          {password_error != '' && <Text style={styles.err_txt}>{password_error}</Text>}
          {/* <HelperText type="error" visible={password_error}>{password_error}</HelperText> */}
        </View>
        {password_error == '' && <View style={{ display: 'flex', alignItems: 'center', flex: 1, maxHeight: 20 }}></View>}
        <CheckBox
          title='I have read the Privace Policy'
          containerStyle={{ backgroundColor: 'transparent' }}
          checked={checked}
          style={{ flex: 1 }}
          onPress={() => {
            setChecked(!checked);
          }}
          accessibilityLabel='privacy-policy'
        />
        <View style={{ padding: '7%', width: '100%', justifyContent: 'center' }}>
          {
            buttonLoader
              ? <TouchableOpacity
                disabled
                onPress={() => { }}
              >
                <ActivityIndicator style={styles.btnStyle} size="small" color="#fff" />
              </TouchableOpacity>
              : <TouchableOpacity
                onPress={onSignup}
                disabled={checked ? false : true}
              >
                <Text style={styles.btnStyle} accessibilityLabel='signup' accessibilityRole='button'>GET STARTED</Text>
              </TouchableOpacity>
          }
        </View>
        <View style={{ display: 'flex', alignItems: 'center', flex: 2 }}></View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
