const initialState = {
	radios:[{
			style:'Indie',
			description:'Отборные миксы в жанре Indie со всего света. Если Вам нравятся красивые мелодии, захватывающий дух звук гитары, то вам сюда!',
			cover:"http://5.23.54.45:5633/media/covers/indie.jpeg",
			music:[{
				url:'http://5.23.54.45:5633/media/indie/1/1.mp3',
				name:'Stay Here IndieChill Mix',
				author:'MORindie',
				time:'0:59:10'
			},{
				url:'http://5.23.54.45:5633/media/indie/2/2.mp3',
				name:'Wishlight One Hour Indie Folk Alternative Mix',
				author:'Pengroves',
				time:'1:05:08'
			},{
				url:'http://5.23.54.45:5633/media/indie/3/3.mp3',
				name:'The Ultimate Indie-Folk',
				author:'alexrainbirdMusic',
				time:'1:09:13'
			},{
				url:'http://5.23.54.45:5633/media/indie/4/4.mp3',
				name:'Indie/Rock/Alternative Compilation – December 2017',
				author:'alexrainbirdMusic',
				time:'1:25:16'
			},{
				url:'http://5.23.54.45:5633/media/indie/5/5.mp3',
				name:'September 2017 Indie Folk / Pop / Chill',
				author:'SamFish Music',
				time:'0:49:10'
			},{
				url:'http://5.23.54.45:5633/media/indie/6/6.mp3',
				name:'Indie/Rock/Alternative Compilation - January 2018',
				author:'alexrainbirdMusic',
				time:'1:28:30'
			},{
				url:'http://5.23.54.45:5633/media/indie/7/7.mp3',
				name:'Dark Forest - An Indie Folk Alternative (Halloween 2017)',
				author:'alexrainbirdMusic',
				time:'1:12:40'
			}]
		},
		{
			style:'Progressive house',
			cover:"http://5.23.54.45:5633/media/covers/house.jpeg",
			description:"Разновидность хаус-музыки. Возник в начале 1990-х годов на территории Великобритании. Отличается своей мелодичностью",
			music:[{
				url:'http://5.23.54.45:5633/media/house/1/1.mp3',
				name:'Best Progressive House Mix 2017 Vol. #15',
				time:"1:00:58"
			},{
				url:'http://5.23.54.45:5633/media/house/2/2.mp3',
				name:'"Taking You Higher" (Progressive House Mix)',
				time:"1:16:50"
			}]
		},
		{
			style:'Trap',
			cover:"http://5.23.54.45:5633/media/covers/trap.jpeg",
			description:"Музыкальный жанр, уходящий корнями в ранние 1990-е на Юг США. Для него типичны агрессивная текстовая составляющая и звук, в котором движущей силой инструменталов являются 808-я драм-машина, либо густо протяжённые саббасовые партии",
			music:[{
				url:'http://5.23.54.45:5633/media/trap/1/1.mp3',
				name:'Samurai Trap & Bass Japanese Type Beat Lofi HipHop Mix',
				time:"1:02:45"
			},{
				url:'http://5.23.54.45:5633/media/trap/2/2.mp3',
				name:'TRAP MUSIC 2017 Bass Boosted Best Trap Mix BEST EDM',
				time:"0:53:43"
			},{
				url:'http://5.23.54.45:5633/media/trap/3/3.mp3',
				name:'Indian Trap Music Mix 2017 Insane Hard Trappin for Cars Indian Bass Boosted',
				time:"0:45:10"
			}]
		}		
	],
	playing:false,
	station:'',
	indexMusic:0
}

const radio = (state = initialState, action) => {
	switch(action.type){

		case "UPDATE_INDEX_MUSIC" :
			return {
				...state,
				indexMusic:action.index
			}

		case "UPDATE_PLAYING" :
			return {
				...state,
				station:action.station
			}

		case "UPDATE_STATUS_PLAYING" :
			return {
				...state,
				playing:action.status
			}

		default :
			return state

	}
}

export default radio