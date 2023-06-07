import clientViMo from "../../../viewmodel/ClientViMo";
import config from "../../config";
import LocalSecureStorage from "../../data/LocalSecureStorage";
import { ServerDataSource } from "../../data/ServerDataSource";
import Cart from "../../entities/Cart";
import Client from "../../entities/Client";

export default class CarritoDelClient {
	public static async obtenerCredencialesDePago(repository: ServerDataSource): Promise<string | null> {
		try {
			const secureStorage = LocalSecureStorage;
			const spk = await secureStorage?.readData({ key: config.LSS.STRIPE_KEY });
			if (spk) return spk;
			const resultado = <string | null>await repository.queryPaymentKey({ token: clientViMo.getJWT() });
			if (resultado) await secureStorage?.createData({ key: config.LSS.STRIPE_KEY, value: resultado });
			return resultado;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public static async realizarPago(
		cart: Cart,
		repository: ServerDataSource,
	): Promise<{
		codeStatus: string;
		clientSecret: string | null;
	} | null> {
		try {
			const price = cart.getTotalPrice()?.toFixed(2) || null;
			if (!price) return { codeStatus: ":400", clientSecret: null };
			const resultado = <{ codeStatus: string; clientSecret: string | null }>await repository.sendPayment({ token: clientViMo.getJWT(), price });
			return resultado;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
