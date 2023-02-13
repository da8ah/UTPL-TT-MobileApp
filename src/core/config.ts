const serverURL = "https://expressjs-bookstore.azurewebsites.net";

const config = {
	URL: {
		INTERFACE: `${serverURL}/api`,
		AUTHENTICATION: `${serverURL}/signin`,
		REGISTRATION: `${serverURL}/signup`,
	},
	LSS: {
		AUTH_KEY: "authTokenSaved",
		STRIPE_KEY: "paymentKeySaved",
	},
};

export default config;
