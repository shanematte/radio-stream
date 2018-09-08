const initialState = {
	statusLoadScreenApp:true,
	loadApp:true
}

const splashscreens = (state = initialState, action) => {
	switch(action.type){

		case "CHANGE_STATUS_LOAD_APP" :
			return {
				...state,
				loadApp:action.status
			}	

		case "CHANGE_STATUS_LOAD_SCREEN_APP" :
			return {
				...state,
				statusLoadScreenApp:action.status
			}

		default :
			return state

	}
}

export default splashscreens