import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView
} from 'react-native'
import { Icon } from 'react-native-elements'
import Spinner from 'react-native-spinkit'

class RadioView extends Component {
	constructor(props){
		super(props)

		this.state = {
			click:true
		}

	}

	openScreenListenRadio(music, title, cover, length){

		let { click } = this.state
		let that = this

		if(click){

			this.setState({
				click:false
			})

			setTimeout(()=>{
				that.setState({
					click:true
				})
			},1300)

			this.props.navigation.navigate('ListenRadio', {
				music:music,
				title:title,
				cover:cover,
				length:length
			})

		}

	}

	render(){

		let { user } = this.props.config
		let radios = this.props.radio.radios
		let station = this.props.radio.station
		let playing = this.props.radio.playing

		return(
			<View style={styles.mainView}>
				<View style={styles.viewHeader}>

					<Text style={styles.textLogoApp}>Mix stream</Text>

				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					
					{
						radios.map((radio, index)=>{
							return (
								<TouchableOpacity key={index} onPress={this.openScreenListenRadio.bind(this, radio.music, radio.style, radio.cover, radio.music.length)}>
									<View style={styles.mainCoverRadio}>
										{
											station === radio.style ? <View style={styles.mainStatusMainStyle}><Spinner isVisible={true} color="#fff" size={40} type="Pulse" /></View> : <View></View>
										}
										<Image style={styles.mainCoverImage} source={{uri:radio.cover}}/>
										<View style={styles.mainTitleRadio}>
											<Text style={styles.mainTitleRadioStyle}>{ radio.style }</Text>
											<Text style={styles.mainDescriptionRadioStyle}>{ radio.description }</Text>
										</View>
									</View>
								</TouchableOpacity>
							)
						})
					}

				</ScrollView>
			</View>
		)

	}

}

const styles = StyleSheet.create({
	mainStatusMainStyle:{
		position:'absolute',
		top:10,
		right:10,
		zIndex:102
	},
	mainDescriptionRadioStyle:{
		color:'rgba(255,255,255,0.87)',
		fontSize:16,
		marginTop:7,
		padding:0,
		margin:0,
		textAlign:'center'
	},
	mainTitleRadioStyle:{
		color:'#fff',
		fontSize:37,
		fontWeight:'bold',
		padding:0,
		margin:0
	},
	mainTitleRadio:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		paddingRight:10,
		paddingLeft:10,
		left:0,
		zIndex:100,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'rgba(0,0,0,0.5)'
	},
	mainCoverImage:{
		position:'absolute',
		width:'100%',
		height:'100%',
		top:0,
		left:0,
		resizeMode:'cover',
		zIndex:1
	},
	mainCoverRadio:{
		width:'100%',
		height:270,
		position:'relative',
		marginBottom:3
	},
	viewHeader:{
		width:'100%',
		height:50,
		paddingLeft:10,
		paddingRight:10,
		flexDirection:'row',
		justifyContent:'space-between'
	},
	textLogoApp:{
		fontSize:25,
		color:'rgba(255,255,255,0.4)',
	},
	mainView:{
		width:'100%',
		height:'100%',
		backgroundColor:'#2f232f',
		paddingTop:30
	}
})

const mapStateToProps = (state)=>{
	return{
		splashscreen:state.splashscreens,
		config:state.config,
		radio:state.radio
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioView)