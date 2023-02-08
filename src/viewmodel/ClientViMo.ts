import serverDataSource, { ServerDataSource } from "../core/data/ServerDataSource";
import BillingInfo from "../core/entities/BillingInfo";
import Client from "../core/entities/Client";
import GestionDeCuentaClient from "../core/usecases/client/GestionDeCuentaClient";

export type AuthObserver = (authState: boolean) => void;
export type ProfileObserver = (client: Client) => void;
class ClientViMo {
	private authObserver: AuthObserver | null = null;
	private profileObserver: ProfileObserver | null = null;
	private repository: ServerDataSource | null = serverDataSource;
	private client: Client = new Client();

	private auth = false;
	public isAuth(): boolean {
		return this.auth;
	}

	private jwt: string | null = null;
	public getJWT() {
		return this.jwt;
	}

	public getClient(): Client {
		return this.client;
	}

	public attachAuth(observer: AuthObserver) {
		this.authObserver = observer;
	}
	public detachAuth() {
		this.authObserver = null;
	}

	public async login(ClientToSearch?: Client) {
		let credenciales;
		if (this.repository) credenciales = await GestionDeCuentaClient.iniciarSesion(ClientToSearch || new Client(), this.repository);
		if (credenciales?.token) this.jwt = credenciales.token;
		if (credenciales?.client) this.client = credenciales.client;
		if (this.jwt && this.client) this.auth = true;
		if (this.authObserver) this.authObserver(this.auth);
	}

	public async logout() {
		const confirmation = await GestionDeCuentaClient.cerrarSesion();
		if (confirmation) {
			this.client.setUser("");
			this.client.setName("");
			this.client.setEmail("");
			this.client.setMobile("");
			this.client.setPassword("");
			this.client.setBillingInfo(new BillingInfo());
			this.client = new Client();
		}
		if (this.jwt) this.jwt = null;
		this.auth = false;
		if (this.authObserver) this.authObserver(this.auth);
	}
}

const clientViMo = new ClientViMo();

export default clientViMo;
