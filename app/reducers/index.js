import { combineReducers } from 'redux'

//reducers
import config from './config'
import splashscreens from './splashscreens'
import radio from './radio'

const reducers = (navReducers) => {
	return combineReducers({
		config:config,
		splashscreens:splashscreens,
		nav:navReducers,
		radio:radio
	})
}

export default reducers