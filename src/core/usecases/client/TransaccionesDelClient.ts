import Client from "../../entities/Client";
import IPersistenciaTransacciones from "../../ports/persistencia/IPersistenciaTransacciones";

export default class TransaccionesDelClient {
	public static async listarTodasLasTransacciones(repository: AbstractRepository): Promise<CardTransaction[] | null> {
		const repo = repository as ServerDataSource;
		repo.setStrategy(new PersistenciaDeTransacciones());
		const data = <CardTransaction[]>await repo.downloadBooks();
		if (!data) return null;
		return data;
	}
	public async registrarTransaccion(client: Client, iPersistenciaTransacciones: IPersistenciaTransacciones): Promise<Client> {
		return await iPersistenciaTransacciones.guardarNuevaTransaccion(client);
	}

	public async listarMisTransacciones(client: Client, iPersistenciaTransacciones: IPersistenciaTransacciones): Promise<Client> {
		return await iPersistenciaTransacciones.obtenerTransacciones(client);
	}
}
