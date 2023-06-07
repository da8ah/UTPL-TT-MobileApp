import serverDataSource, { ServerDataSource } from "../core/data/ServerDataSource";
import BillingInfo from "../core/entities/BillingInfo";
import Client from "../core/entities/Client";
import GestionDeCuentaClient from "../core/usecases/client/GestionDeCuentaClient";

export type SignUpObserver = () => void;
class SignUpViMo {
	private observer: SignUpObserver | null = null;
	private repository: ServerDataSource | null = serverDataSource;

	// OBSERVER
	public attach(observer: SignUpObserver) {
		this.observer = observer;
	}
	public detach() {
		this.observer = null;
	}

	// USECASE
	public async signup(client: Client): Promise<string | null> {
		if (!this.repository) return null;
		return await GestionDeCuentaClient.crearCuenta(client || new Client(), this.repository);
	}

	// DATA
	public clearInputs() {
		if (this.observer) this.observer();
	}

	// public
}

const signUpViMo = new SignUpViMo();

export default signUpViMo;
