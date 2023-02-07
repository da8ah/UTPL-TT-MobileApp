import serverDataSource, { ServerDataSource } from "../core/data/ServerDataSource";
import Client from "../core/entities/Client";
import GestionDeCuentaClient from "../core/usecases/client/GestionDeCuentaClient";

export type ClientObserver = (authState: boolean) => void;
class ClientViMo {
	private observer: ClientObserver | null = null;
	private repository: ServerDataSource | null = serverDataSource;
	private client: Client = new Client();
	private jwt: string | null = null;

	public getJWT() {
		return this.jwt;
	}

	public getClient(): Client {
		return this.client;
	}

	public attach(observer: ClientObserver) {
		this.observer = observer;
	}
	public detach() {
		this.observer = null;
	}

	public async login(ClientToSearch?: Client) {
		let credenciales;
		if (this.repository) credenciales = await GestionDeCuentaClient.iniciarSesion(ClientToSearch || new Client(), this.repository);
		if (credenciales?.token) this.jwt = credenciales.token;
		if (credenciales?.client) this.client = credenciales.client;
	}

	public async logout() {
		const confirmation = await GestionDeCuentaClient.cerrarSesion();
		if (confirmation) {
			this.client.setUser("");
			this.client.setName("");
			this.client.setEmail("");
			this.client.setMobile("");
			this.client.setPassword("");
			this.client = new Client();
		}
		if (this.observer) this.observer(false);
	}
}

const clientViMo = new ClientViMo();

export default clientViMo;
