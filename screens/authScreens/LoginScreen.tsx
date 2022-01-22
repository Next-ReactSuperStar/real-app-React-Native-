import { styles } from './styles.js';
import { Image, View, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import React, { useState, } from 'react';
import { Text } from '../../components/Themed';
import { TextInput } from 'react-native-paper';
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Auth from '@aws-amplify/auth';

const Login = ({ navigation }: { navigation: NavigationProp<any>, route: any }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(true);
	const [buttonLoader, setButtonLoader] = useState(false);
	const [username_error, setUsername_error] = useState('');
	const [password_error, setPassword_error] = useState('');
	const dispatch = useDispatch()
	const toast = useToast();
	const onPress = () => {
		navigation.navigate('Register')
	}

	function userSignin() {
		if (username) {
			if (password) {
				setButtonLoader(true);
				const user = Auth.signIn(username, password)
					.then(async (user) => {
						setButtonLoader(false);
						let user_value = user.attributes;

						fetch('http://ec2-3-144-42-178.us-east-2.compute.amazonaws.com:5000/api/user/socialId/' + user_value.sub,
							{
								method: 'get',
								headers: {
									'Content-Type': "application/json",
									'password': 'passwordAUA'
								},

							})
							.then((response) => response.json())
							.then(async (responseJson) => {
								if (responseJson.length !== 0) {
									console.log("UserID", responseJson);
									try {
										await AsyncStorage.setItem('user_data', JSON.stringify(responseJson));
									} catch (error) {
										// Error saving data
									}

								}
							}).catch((error) => {
								alert('error')
							})



						toast.show('Login success. You are now signed in.', {
							type: "success",
							successColor: "#7BC67E",
							duration: 4000,
							animationType: "slide-in",
						});
						try {
							await AsyncStorage.setItem('user', JSON.stringify(user_value));
						} catch (error) {
							// Error saving data
						}
						// AsyncStorage.setItem('user', JSON.stringify(user_value));
						navigation.navigate('Root', { name: username, user_data: user_value });
					})
					.catch((err) => {
						if (!err.message) {
							setButtonLoader(false);
							toast.show(err);
						} else {
							if (err.code === 'UserNotConfirmedException') {
								setButtonLoader(false);
								// toast.show('User Not Confirmed');
								navigation.navigate('EnterCode', { username, password, screen: 'otp-verification' });
							}
							if (err.message) {
								setButtonLoader(false)
								toast.show(err.message, {
									type: "danger",
									dangerColor: '#FF737F',
									duration: 4000,
									animationType: "slide-in",
								});
								// if (Platform.OS == 'android') ToastAndroid.showWithGravity(err.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
							}
						}
					});
			} else {
				setPassword_error('Password Required');
			}
		} else {
			setUsername_error('User Name Required');
		}
	}

	function handleInput(text: string, fieldType: string) {
		if (fieldType === "name") {
			setUsername(text)
			setUsername_error('')
		} else if (fieldType === "password") {
			setPassword(text)
			setPassword_error('')
		}
	}

	return (
		// <ScrollView>
		<KeyboardAvoidingView style={styles.containerDiv}>
			<View style={styles.loginWrap}>
				{/*  */}
				<View style={{ width: 80 }}>
					<TouchableOpacity
						onPress={() => navigation.goBack()} >
						<Image style={{ width: 50, height: 50 }} source={require('../../assets/icons/backBtn.png')} />
					</TouchableOpacity>
				</View>
				<View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
				<View>
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.title}>Welcome Back!</Text>
					</View>
				</View>
				<View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
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
						<Text style={styles.err_txt}>{username_error}</Text>
						{/* <HelperText type="error" visible={!!username_error}>{username_error}</HelperText> */}
					</View>
					<View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
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
						<Text style={styles.err_txt}>{password_error}</Text>
						{/* <HelperText type="error" visible={password_error}>{password_error}</HelperText> */}
					</View>
					<View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
					<View style={[styles.loginForm]}>
						{
							buttonLoader
								? <TouchableOpacity
									disabled
									onPress={() => { }}
								>
									<ActivityIndicator style={styles.btnStyle} size="small" color="#fff" />
								</TouchableOpacity>
								: <TouchableOpacity
									onPress={userSignin}
								>
									<Text style={styles.btnStyle} accessibilityRole='button' accessibilityLabel='login'>Log in</Text>
								</TouchableOpacity>
						}
					</View>
				
				<View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
				<View style={styles.loginVerticalPart}>
					<TouchableOpacity
						onPress={() => navigation.navigate('ForgotPass')}
					>
						<Text style={styles.subText} >Forgot Password</Text>
					</TouchableOpacity>
				</View>
				<View style={{ display: 'flex', alignItems: 'center', flex: 7 }}></View>
				<View style={styles.loginVerticalPart}>
					<View style={styles.loginVerticalPart}>
						<Text style={styles.loginTitle}>Don't have an account?&nbsp;
							<Text onPress={onPress} style={styles.login_btnStyle} accessibilityLabel='signup' accessibilityRole='button'>Sign Up</Text>
						</Text>
					</View>
				</View>
				{/*  */}
			</View>
		</KeyboardAvoidingView>
	);
};
export default Login
