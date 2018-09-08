const initialState = {
	language:"ru",
	user:'',
	status:{
		indie:{
			statusMusic:0,
			duration:0
		},
		trance:{
			statusMusic:0,
			duration:0
		}
	}
	
}

const config = (state = initialState, action) => {
	switch(action.type){

		case "UPDATE_RADIO_INDIE" :
			return {
				...state,
				status:{
					...state.status,
					indie:{
						statusMusic:action.statusMusic,
						duration:action.duration
					}
				}
			}

		case "UPDATE_USER_INFO" :
			return {
				...state,
				user:action.user
			}

		case "CHANGE_LANGUAGE" :
			return {
				...state,
				language:action.language
			}

		default :
			return state

	}
}

export default config