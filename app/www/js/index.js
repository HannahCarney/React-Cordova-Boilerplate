/**
 * index.js
 */

import { main } from './app'

// SCSS (SASS)
import '../style/app.scss'


// TODO - Improve cordova check
const isCordova = document.URL.startsWith('file')


const app = {
	initialize: function() {
		console.log(isCordova ? 'Cordova running on device' : 'Development mode')

		if (isCordova) document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
		// Fallback for when running in development  
		if (!isCordova) main()

	},
	onDeviceReady: function() {
		this.receivedEvent('deviceready')
	},
	receivedEvent: function(id) {
		main()
	}
}

app.initialize()
