import OneSignal from 'onesignal-node';

const { ONESIGNAL_USER_AUTH_KEY, ONESIGNAL_APP_AUTH_KEY, ONESIGNAL_APP_ID } = process.env;

const onesignalClient = new OneSignal.Client({
	userAuthKey: ONESIGNAL_USER_AUTH_KEY,
	app: {
		appAuthKey: ONESIGNAL_APP_AUTH_KEY,
		appId: ONESIGNAL_APP_ID
	}
});

export default (message) => {
	const notification = new OneSignal.Notification({
		included_segments: [ 'Active Users' ],
		contents: { tr: message, en: message }
	});

	return onesignalClient.sendNotification(notification, (err, httpResponse, data) => {
		if (err) {
			return console.log('Bildirim Gönderilemedi!');
		}

		console.log(data, httpResponse.statusCode, 'BİLDİRİM GÖNDERİLDİ');
	});
};
