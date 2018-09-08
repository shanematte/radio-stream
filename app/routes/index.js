import React from 'react'
import RadioMain from '../components/radio'
import ListenRadio from '../components/listen'
import { StackNavigator } from 'react-navigation'

const MainRoute = StackNavigator({
	'RadioMain':{
		screen:RadioMain
	},
	'ListenRadio':{
		screen:ListenRadio
	}	
},{
	headerMode:'none',
    mode: "card"    
})

export default MainRoute


