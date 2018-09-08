import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
	KeyboardAvoidingView,
	ToastAndroid
} from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import * as Animatable from 'react-native-animatable'
import Spinner from 'react-native-spinkit'

//images
import bgSplashImage from '../../media/bg-splash.jpg'
import logo from '../../media/logo.png'

class SplashScreenLoadApp extends Component {
	constructor(props){
		super(props)

		this.state = {
			fontSize:20,
			bottom:-100,
			visibleLoading:true,
			name:''
		}

	}

	componentDidMount(){

		let that = this

		BackgroundTimer.setTimeout(() => {
			that.props.changeStatusLoadApp(false)
			if(this.props.config.user.length > 0){

				that.props.changeStatusSplash(false)

			}else{

				that.setState({
					visibleLoading:false,
					bottom:20
				})

			}


		}, 2100)

	}

	saveUserName(){

		let that = this

		that.props.changeStatusSplash(false)

	}

	render(){

		let { loadApp } = this.props.splashscreen

		return(
			<View style={styles.mainViewSplash}>
				<Image style={styles.imageSplash} source={bgSplashImage}/>

				<KeyboardAvoidingView style={styles.mainViewSplashContent}>
					<View style={styles.mainViewSplashContent}>

						<Animatable.Image style={styles.imageLogo} source={logo}/>

						<View style={styles.viewLoadingSpinner}>
							<Spinner isVisible={this.state.visibleLoading} color="#fff" size={80} type="Pulse" />
						</View>

						<Animatable.View transition={["bottom"]} style={[styles.mainViewForm, {bottom:this.state.bottom}]}>
							<TouchableOpacity style={styles.mainViewFormButton} onPress={this.saveUserName.bind(this)} ><Text style={styles.buttonUser}>Слушать</Text></TouchableOpacity>
						</Animatable.View>

					</View>
				</KeyboardAvoidingView>

			</View>
		)

	}

}

const styles = StyleSheet.create({
	buttonUser:{
		width:'98%',
		marginLeft:'1%',
		fontSize:23,
		textAlign:'center',
		padding:10,
		color:'rgba(0,0,0,0.8)',
		borderRadius:4
	},
	inputTextUser:{
		width:'100%',
		paddingRight:10,
		paddingLeft:10,
		fontSize:19
	},
	mainViewForm:{
		width:'90%',
		height:65,
		backgroundColor:'rgba(255,255,255,0.58)',
		borderRadius:8,
		position:'absolute',
		left:'5%',
		justifyContent:'center',
		alignItems:'center'
	},
	mainViewFormButton:{
		width:'90%',
		height:65,
		borderRadius:8,
		position:'absolute',
		left:'5%',
		justifyContent:'center',
		alignItems:'center'
	},
	viewLoadingSpinner:{
		width:100,
		justifyContent:'center',
		alignItems:'center',
		height:100,
		marginTop:5
	},
	imageLogo:{
		width:'95%',
		height:180,
		resizeMode:'contain'
	},
	imageSplash:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:1,
		resizeMode:'cover'
	},
	mainViewSplashContent:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:10,
		justifyContent:'center',
		alignItems:'center'
	},
	mainViewSplash:{
		width:'100%',
		height:'100%',
		justifyContent:'center',
		position:'relative',
		alignItems:'center'
	}
})

const mapStateToProps = (state)=>{
	return{
		splashscreen:state.splashscreens,
		config:state.config
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		changeStatusSplash:(status)=>{
			dispatch({
				type:'CHANGE_STATUS_LOAD_SCREEN_APP',
				status:status
			})
		},
		changeStatusLoadApp:(status)=>{
			dispatch({
				type:'CHANGE_STATUS_LOAD_APP',
				status:status
			})
		},
		updateUserInfo:(user)=>{
			dispatch({
				type:'UPDATE_USER_INFO',
				user:user
			})
		}		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreenLoadApp)