const serverURL = "https://expressjs-bookstore.azurewebsites.net";

const config = {
	URL: {
		REPOSITORY: `${serverURL}/api`,
		AUTHENTICATION: `${serverURL}/signin`,
	},
	LSS: {
		AUTH_KEY: "authTokenSaved",
	},
};

export default config;
