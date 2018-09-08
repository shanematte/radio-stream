import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	DeviceEventEmitter
} from 'react-native'
import RadioView from './app'

import SplashScreenLoadApp from './splashscreens/load-app'
import BackgroundTimer from 'react-native-background-timer'
import PushNotification from 'react-native-push-notification'

class RadioMain extends Component {
	constructor(props){
		super(props)

		this.state = {

		}

	}

	componentDidMount(){

		let that = this

	}


	render(){

		let { statusLoadScreenApp } = this.props.splashscreen

		return(
			<View style={styles.mainView}>
				<StatusBar hidden={false} barStyle="dark-content" backgroundColor="transparent" translucent={true} />
				{
					statusLoadScreenApp ? <SplashScreenLoadApp/> : <RadioView navigation={this.props.navigation} />
				}
			</View>
		)

	}

}

const styles = StyleSheet.create({
	mainView:{
		width:'100%',
		height:'100%',
		backgroundColor:'#fff'
	}
})

const mapStateToProps = (state)=>{
	return{
		splashscreen:state.splashscreens
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioMain)