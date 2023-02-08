import config from "../config";
import Client from "../entities/Client";
import StockBook from "../entities/StockBook";
import { BookConverter, ClientConverter, IStockBook } from "../entities/utils";

export class ServerDataSource {
	private static repository: ServerDataSource | null = null;
	private apiURL: string | null = config.URL.REPOSITORY;

	// SINGLETON
	private constructor() {}

	public static getInstance(): ServerDataSource | null {
		if (!this.repository) this.repository = new ServerDataSource();
		return this.repository;
	}

	// CLIENT
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
				await fetch(`${authURL}`, httpContent)
					.then((res) => {
						token = res.headers.get("set-cookie")?.split(";")[0].split("=")[1];
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
}

export default ServerDataSource.getInstance();
