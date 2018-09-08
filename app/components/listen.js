import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
	StatusBar,
	KeyboardAvoidingView,
	ToastAndroid,
	Dimensions,
	Platform,
	Animated,
	ScrollView
} from 'react-native'
import Spinner from 'react-native-spinkit'
import BackgroundTimer from 'react-native-background-timer'
import * as Animatable from 'react-native-animatable'
import Interactable from 'react-native-interactable'
import { Icon } from 'react-native-elements'
import RNAudioStreamer from 'react-native-audio-streamer'

const Screen = {
  	width: Dimensions.get('window').width,
  	height: Dimensions.get('window').height
}

class ListenRadio extends Component {
	constructor(props){
		super(props)

		this.state = {
			cover:'',
			music:[],
			title:'',
			length:0,
			curentRadio:0,
			statusMusic:0,
			duration:0,
			statusStream:'BUFFERING',
			playRadio:true,
			playingMusic:false,
			titleMix:''
		}

		this._deltaY = new Animated.Value(Screen.height)

	}

	randomInteger(min, max) {
	    let rand = min - 0.5 + Math.random() * (max - min + 1)
	    rand = Math.round(rand)
	    return rand
  	}

	componentDidMount(){
		let that = this
		let radioParams = this.props.navigation.state.params
		let { statusMusic, duration, music, title, playingMusic } = this.state
		let config = this.props.config
		let radio = this.props.radio


		this.setState({
			cover:radioParams.cover,
			music:radioParams.music,
			title:radioParams.title,
			length:radioParams.length-1
		})

		if(radio.station != radioParams.title){

			let randomIndex = this.randomInteger(0, radioParams.length-1)

			that.props.updateStatusPlayer(radioParams.title)
			that.props.updateIndexMusic(randomIndex)
			that.setState({
				playingMusic:true,
				statusMusic:randomIndex,
				titleMix:radioParams.music[randomIndex].name
			})

			that.props.updateStatusPlaying(true)
			RNAudioStreamer.setUrl(radioParams.music[randomIndex].url)
			RNAudioStreamer.play()

		}else{

			that.props.updateStatusPlayer(radioParams.title)
			that.props.updateIndexMusic(radio.indexMusic)
			that.setState({
				playingMusic:true,
				statusMusic:radio.indexMusic,
				titleMix:radioParams.music[radio.indexMusic].name
			})

		}

		setInterval(()=>{

			RNAudioStreamer.status((err, status)=>{
				if(!err) 

				if(status == 'PLAYING'){
					that.props.updateStatusPlaying(true)
					that.setState({
						playingMusic:true,
						statusStream:''
					})
				}else if(status == 'BUFFERING'){
					that.setState({
						statusStream:'BUFFERING'
					})
				}else{
					that.props.updateStatusPlaying(false)
					that.setState({
						playingMusic:false,
						statusStream:''
					})
				}

			})

		},2300)

	}


	tooglePlayRadio(){

		this.setState({
			playRadio:!this.state.playRadio
		})

		if(!this.state.playRadio){
			RNAudioStreamer.play()
		}else{
			RNAudioStreamer.pause()
		}

	}


	playMix(url, name, index){

		this.props.updateIndexMusic(index)

		RNAudioStreamer.setUrl(url)
		RNAudioStreamer.play()

		this.setState({
			titleMix:name,
			statusMusic:index
		})

	}

	render(){

		let { cover, music, title, statusStream, playingMusic, statusMusic, titleMix } = this.state

		let radioParams = this.props.navigation.state.params
		let radio = this.props.radio

		return(
			<View style={styles.mainViewListenRadio}>

				<StatusBar hidden={true} backgroundColor="transparent" translucent={true} />
				
				<Image style={styles.mainCoverListenRadio} source={{uri:cover}}/>
				<View style={styles.mainCoverListenRadioOverlay}></View>

				<View style={styles.mainContentRadio}>

					<View style={styles.mainRadioViewInfo}>
						<Text style={styles.mainRadioViewInfoTitle}>{ title } mix</Text>
						<View style={styles.coverCircleImageRadioAnimationImage}>
							<Image style={styles.coverCircleImageRadio} source={{uri:cover}}/>
							<TouchableOpacity style={styles.coverCircleImageRadioCircleAnim} onPress={this.tooglePlayRadio.bind(this)}>
								<View style={styles.coverCircleImageRadioCircleAnim}>

									{
										<Spinner isVisible={this.state.playingMusic} color="#fff" size={200} type="Pulse" />
									}

								</View>
							</TouchableOpacity>
						</View>
						<Text style={styles.mainStatusStream}>{ titleMix }</Text>
						<Text style={styles.mainStatusStreamText}>{ statusStream }</Text>
					</View>

	        		<View style={styles.panelContainer} pointerEvents={'box-none'}>
			          	<Animated.View
				            pointerEvents={'box-none'}
				            style={[styles.panelContainer]} />
	          			<Interactable.View
				            verticalOnly={true}
				            snapPoints={[{y: 0}, {y: Screen.height-65}, {y: Screen.height-65}]}
				            boundaries={{top: -340}}
				            initialPosition={{y: Screen.height - 65}}
				            animatedValueY={this._deltaY}>
				            <View style={styles.panel}>
				              	<View style={styles.mainWindowHeaderChat}>
				              		<View>

					              		<Animated.View pointerEvents={'box-none'} style={[{padding:0,margin:0,backgroundColor:'transparent',flexDirection:'row',justifyContent:'flex-start'}, {
									            top: this._deltaY.interpolate({
									              inputRange: [0, Screen.height-100],
									              outputRange: [14, 0],
									              extrapolateRight: 'clamp'
									            })
									          }]}>
					              			<Text style={styles.mainWindowHeaderChatTitle}>Миксы  в жанре { title }</Text>
					              		</Animated.View>

					              		<Animated.View pointerEvents={'box-none'} style={[{padding:0,margin:0,backgroundColor:'transparent',flexDirection:'row',justifyContent:'flex-start'}, {
									            opacity: this._deltaY.interpolate({
									              inputRange: [0, Screen.height-100],
									              outputRange: [0, 0.5],
									              extrapolateRight: 'clamp'
									            })
									          }]}>
					              			<Text style={styles.mainWindowHeaderChatDesc}>потяните вверх</Text>
					              		</Animated.View>
				              			
				              		</View>
				              		<Animated.View pointerEvents={'box-none'} style={[{padding:0,margin:0,backgroundColor:'transparent',flexDirection:'row',justifyContent:'flex-end'}, {
								            opacity: this._deltaY.interpolate({
								              inputRange: [0, Screen.height-100],
								              outputRange: [0, 0.5],
								              extrapolateRight: 'clamp'
								            })
								          }]}>
				              			<Icon  name="ios-arrow-round-up-outline" type="ionicon" size={37} color="rgba(255,255,255,0.75)"/>
				              		</Animated.View>
				              	</View>
				              	<View style={styles.mainWindowChat}>
				              		<ScrollView showsVerticalScrollIndicator={false}>

				              			{
				              				radioParams.music.map((music, index)=>{
				              					return (
				              						<TouchableOpacity onPress={this.playMix.bind(this, music.url, music.name, index)}>
				              							<View style={styles.mainItemMix}>
				              								<View style={styles.mainInfoMix}>
				              									<Text style={styles.mainItemMixTitle}>{music.name}</Text>
				              									<Text style={styles.mainItemMixTitleAuthor}>{music.author}</Text>
				              									<View style={styles.timeMusic}>
				              										<Icon name="ios-time-outline" size={16} color="rgba(255,255,255,0.6)" type="ionicon" />
				              										<Text style={styles.timeMusicText}> { music.time }</Text>
				              									</View>
				              								</View>
				              								<View style={styles.mainInfoMixStatus}>
				              									<Spinner isVisible={statusMusic == index ? playingMusic : false} color="rgba(255,255,255,0.4)" size={40} type="Pulse" />
				              								</View>
				              							</View>
				              						</TouchableOpacity>
				              					)
				              				})
				              			}
				              			
				              		</ScrollView>
				              	</View>
				            </View>
	          			</Interactable.View>
	        		</View>
        		</View>

			</View>
		)

	}

}

const styles = StyleSheet.create({
	timeMusicText:{
		color:'rgba(255,255,255,0.4)'
	},
	timeMusic:{
		flexDirection:'row',
		marginTop:5
	},
	mainInfoMix:{
		flexDirection:'column',
		width:'85%'
	},
	mainInfoMixStatus:{
		width:'15%',
		justifyContent:'center',
		alignItems:'center'
	},
	mainItemMixTitle:{
		color:'#fff',
		fontSize:18
	},
	mainItemMixTitleAuthor:{
		color:'rgba(255,255,255,0.6)',
		fontSize:16
	},
	mainItemMix:{
		width:'100%',
		marginBottom:7,
		flexDirection:'row',
		justifyContent:'space-between',
		padding:15,
		alignItems:'center',
		borderRadius:4,
		backgroundColor:'rgba(255,255,255,0.2)'
	},
	mainStatusStreamText:{
		fontSize:15,
		textAlign:'center',
		color:'rgba(255,255,255,0.6)'
	},
	mainWindowHeaderChatDesc:{
		fontSize:15,
		color:'rgba(255,255,255,0.3)'
	},
	coverCircleImageRadioAnimationImage:{
		width:Screen.width/2,
		height:Screen.width/2,
		borderRadius:100,
		position:'relative'
	},
	mainStatusStream:{
		backgroundColor:'rgba(0,0,0,0.8)',
		color:'rgba(255,255,255,0.97)',
		fontSize:22,
		paddingTop:7,
		textAlign:'center',
		paddingBottom:7,
		paddingLeft:15,
		paddingRight:15,
		borderRadius:5,
		marginTop:8
	},
	coverCircleImageRadioCircleAnim:{
		width:'100%',
		height:'100%',
		borderRadius:100,
		position:'absolute',
		zIndex:100,
		top:0,
		left:0,
		justifyContent:'center',
		alignItems:'center'
	},
	coverCircleImageRadio:{
		width:'100%',
		height:'100%',
		borderRadius:100,
		position:'absolute',
		top:0,
		left:0,
		zIndex:10,
		resizeMode:'cover'
	},
	mainRadioViewInfoTitle:{
		fontSize:28,
		paddingTop:10,
		paddingBottom:10,
		paddingRight:20,
		paddingLeft:20,
		backgroundColor:'rgba(0,0,0,0.5)',
		borderRadius:4,
		marginBottom:15,
		color:'rgba(255,255,255,0.5)'
	},
	mainRadioViewInfo:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:10,
		justifyContent:'center',
		alignItems:'center'
	},
	mainContentRadio:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:10
	},
	mainCoverListenRadio:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:1,
		resizeMode:'cover'
	},
	mainCoverListenRadioOverlay:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:2,
		backgroundColor:'rgba(0,0,0,0.67)'
	},
	mainViewListenRadio:{
		width:'100%',
		height:'100%',
		position:'relative'
	},
	mainWindowChat:{
		width:'100%',
		height: Screen.height - 55,
		padding:5,
		paddingBottom:1
	},
	mainWindowHeaderChatTitle:{
		color:'rgba(255,255,255,0.75)',
		fontSize:17,
		padding:0
	},
	mainWindowHeaderChat:{
		width:'100%',
		height:65,
		padding:10,
		flexDirection:'row',
		justifyContent:'space-between',
		backgroundColor:'rgba(255,255,255,0.03)'
	},
  	panelContainer: {
	    position: 'absolute',
	    top: 0,
	    bottom: 0,
	    left: 0,
	    right: 0,
	    zIndex:100
  	},
  	panel: {
	    height: Screen.height + 2,
	    backgroundColor: '#2f232fde',
	    flexDirection: 'column'
  	},
})

const mapStateToProps = (state)=>{
	return{
		config:state.config,
		radio:state.radio
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		updateStatusPlayer:(station)=>{

			dispatch({
				type:'UPDATE_PLAYING',
				station:station
			})

		},
		updateStatusPlaying:(status)=>{

			dispatch({
				type:'UPDATE_STATUS_PLAYING',
				status:status
			})

		},
		updateIndexMusic:(index)=>{

			dispatch({
				type:'UPDATE_INDEX_MUSIC',
				index:index
			})

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListenRadio)