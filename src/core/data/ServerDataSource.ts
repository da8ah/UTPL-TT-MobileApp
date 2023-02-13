import config from "../config";
import BillingInfo from "../entities/BillingInfo";
import Cart from "../entities/Cart";
import Client from "../entities/Client";
import StockBook from "../entities/StockBook";
import { BookConverter, ClientConverter, InputValidator, IStockBook, TransactionConverter } from "../entities/utils";

export class ServerDataSource {
	private static repository: ServerDataSource | null = null;
	private apiURL: string | null = config.URL.INTERFACE;

	// SINGLETON
	private constructor() {}

	public static getInstance(): ServerDataSource | null {
		if (!this.repository) this.repository = new ServerDataSource();
		return this.repository;
	}

	// CLIENT
	public async uploadNewProfile(client: Client): Promise<string | null> {
		try {
			if (!(InputValidator.validateUser(client) && InputValidator.validateBillingInfo(client.getBillingInfo() || new BillingInfo()))) return ":400";
			const regURL = config.URL.REGISTRATION;
			if (!regURL) return null;
			const httpContent = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(client),
			};
			return await fetch(regURL, httpContent).then((res) => res.status.toString());
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async downloadProfile(data: { token: string | null; client: Client | null }): Promise<{
		token: string | null;
		client: Client | null;
	} | null> {
		if (!this.apiURL) return null;

		try {
			let token = null;
			let client = null;

			// Token already saved - Returns Client
			if (data.token) {
				const httpContent = {
					method: "GET",
					headers: {
						Authorization: data.token,
					},
				};
				await fetch(`${this.apiURL}/clients/signin`, httpContent)
					.then((res) => res.json())
					.then((body) => (client = ClientConverter.jsonToClient(body)));
				return { token: null, client: client };
			}

			// Token not saved - Returns Token & Client
			const authURL = config.URL.AUTHENTICATION;
			if (!authURL) return null;
			if (data?.client?.getUser() !== undefined && data?.client?.getPassword() !== undefined) {
				const httpContent = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ user: data.client.getUser(), password: data.client.getPassword() }),
				};
				await fetch(authURL, httpContent)
					.then((res) => {
						token = res.headers.get("set-cookie")?.split(";")[0].split("=")[1];
						res.headers.delete("set-cookie");
						return res.json();
					})
					.then((body) => (client = ClientConverter.jsonToClient(body)));
				return { token, client: client };
			}

			// Otherwise returns both null
			return { token: null, client: null };
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	// BOOKS
	public async downloadBooks(): Promise<StockBook[] | null> {
		if (!this.apiURL) return null;

		try {
			let data: StockBook[] = await fetch(`${this.apiURL}/books`)
				.then((res) => res.json())
				.then((data) => data.map((item: IStockBook) => BookConverter.jsonToBook(item)));

			return data;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	// TRANSACTIONS
	public async queryPaymentKey(data: { token: string | null }): Promise<string | null> {
		if (!(this.apiURL || data.token)) return null;
		try {
			if (data.token) {
				const httpContent = {
					method: "GET",
					headers: {
						Authorization: data.token,
					},
				};
				return await fetch(`${this.apiURL}/clients/payments`, httpContent).then((res) => {
					const spk = res.headers.get("set-cookie")?.split(";")[0].split("=")[1];
					res.headers.delete("set-cookie");
					return spk || null;
				});
			}
			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async sendPayment(data: { token: string | null; price: string }): Promise<{
		codeStatus: string;
		clientSecret: string | null;
	} | null> {
		if (!(this.apiURL || data.token)) return null;
		try {
			if (data.token) {
				const checkPaymentFormat = (price: string): boolean => {
					const priceRegEx: RegExp = /^[\d]+[.,]{1}[\d]{2}$/;
					let priceTrim = price.trim();
					return priceRegEx.test(priceTrim);
				};
				if (!checkPaymentFormat(data.price)) return { codeStatus: ":400", clientSecret: null };
				const priceSplitted = data.price.split(/[.,]{1}/);
				const priceWithStripeFormat = priceSplitted[0] + priceSplitted[1];
				const bodyContent = JSON.stringify({
					amount: `${priceWithStripeFormat}`,
					paymentMethodType: "card",
				});
				const httpContent = {
					method: "POST",
					headers: {
						Authorization: data.token,
						"Content-Type": "application/json",
					},
					body: bodyContent,
				};
				const resultado = await fetch(`${this.apiURL}/clients/payments`, httpContent).then(async (res) => {
					const clientSecret = await res.json().then((obj) => obj.clientSecret);
					return { codeStatus: res.status.toString(), clientSecret };
				});
				return resultado;
			}
			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async saveTransaction(data: { token: string | null; client: Client; cart: Cart }): Promise<string | null> {
		if (!(this.apiURL || data.token)) return null;
		try {
			if (data.token) {
				const bodyContent = TransactionConverter.CardTransactionToJSON(data.client, data.cart);
				const httpContent = {
					method: "POST",
					headers: {
						Authorization: data.token,
						"Content-Type": "application/json",
					},
					body: bodyContent,
				};
				return await fetch(`${this.apiURL}/clients/transactions`, httpContent).then((res) => res.status.toString());
			}
			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export default ServerDataSource.getInstance();
