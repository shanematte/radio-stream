import React, { Component } from 'react'
import {
	BackHandler
} from 'react-native'
import { Provider, connect } from 'react-redux'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import getStore from './store/index'
import RadioMain from './components/radio'
import MainRoute from './routes/index'

console.disableYellowBox = true

const navReducer = (state, action) => {
  	const nextState = MainRoute.router.getStateForAction(action, state)
  	return nextState || state
}

class StartApp extends Component {

	constructor(props){
		super(props)

		this.state = {

		}		

	}

  	componentDidMount() {
    	BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this))
  	}

  	componentWillUnmount() {
    	BackHandler.removeEventListener("hardwareBackPress", this.onBackPress.bind(this))
  	}

  	onBackPress(){

    	const { dispatch, nav } = this.props

	    if (nav.index === 0) {

	      return true

	    }

    	dispatch(NavigationActions.back())
    	return true

  	}

	render(){
		
		return(
		    <MainRoute navigation={addNavigationHelpers({
		        dispatch: this.props.dispatch,
		        state: this.props.nav,
		    })} />
		)
	}

}

const mapStateToProps = (state) => ({
  	nav: state.nav
})

const AppWithNavigationState = connect(mapStateToProps)(StartApp)

class App extends Component {

	render(){
		return(
			<Provider store={getStore(navReducer)}>
				<AppWithNavigationState/>
			</Provider>
		)
	}
}

export default App