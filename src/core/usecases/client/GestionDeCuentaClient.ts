import config from "../../config";
import LocalSecureStorage from "../../data/LocalSecureStorage";
import { ServerDataSource } from "../../data/ServerDataSource";
import Client from "../../entities/Client";

export default class GestionDeCuentaClient {
	public async crearCuenta(client: Client, repository: ServerDataSource): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}

	public static async iniciarSesion(client: Client, repository: ServerDataSource): Promise<{ token: string | null; client: Client | null } | null> {
		try {
			const secureStorage = LocalSecureStorage;
			let token = null;
			if (!client || (client?.getUser() === undefined && client?.getPassword() === undefined)) {
				token = await secureStorage?.readData({ key: config.LSS.AUTH_KEY });
			}
			const data = { token: token || null, client: client };
			const resultado = <{ token: string; client: Client } | null>await repository.downloadProfile(data);
			if (!resultado?.token && resultado?.client) return { token: token || null, client: resultado?.client };
			if (resultado?.token) await secureStorage?.createData({ key: config.LSS.AUTH_KEY, value: resultado.token });
			return resultado?.token && resultado?.client ? { token: resultado.token, client: resultado?.client } : null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public static async cerrarSesion(): Promise<boolean | null> {
		try {
			const secureStorage = LocalSecureStorage;
			const confirmation = await secureStorage?.deleteData({ key: config.LSS.AUTH_KEY });
			return confirmation ? confirmation : false;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async actualizarCuenta(clientToSearch: Client, clientToUpdate: Client, repository: ServerDataSource): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}

	public async eliminarCuenta(client: Client, repository: ServerDataSource): Promise<boolean | null> {
		throw new Error("Method not implemented.");
	}
}
