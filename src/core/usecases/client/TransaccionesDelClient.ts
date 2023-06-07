import clientViMo from "../../../viewmodel/ClientViMo";
import { ServerDataSource } from "../../data/ServerDataSource";
import Cart from "../../entities/Cart";
import Client from "../../entities/Client";

export default class TransaccionesDelClient {
	public static async registrarTransaccion(cart: Cart, repository: ServerDataSource): Promise<string | null> {
		try {
			const resultado = <string>await repository.saveTransaction({ token: clientViMo.getJWT(), client: clientViMo.getClient(), cart });
			return resultado;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async listarMisTransacciones(client: Client): Promise<Client> {
		throw new Error("Method not implemented.");
	}
}
