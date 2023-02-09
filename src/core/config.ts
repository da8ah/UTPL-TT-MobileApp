const serverURL = "https://expressjs-bookstore.azurewebsites.net";

const config = {
	URL: {
		INTERFACE: `${serverURL}/api`,
		AUTHENTICATION: `${serverURL}/signin`,
		REGISTRATION: `${serverURL}/signup`,
	},
	LSS: {
		AUTH_KEY: "authTokenSaved",
	},
};

export default config;
