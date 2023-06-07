import { ServerDataSource } from "../data/ServerDataSource";
import StockBook from "../entities/StockBook";

export default class GestionDeInicio {
	public static async listarCatalogoDeLibros(repository: ServerDataSource): Promise<StockBook[] | null> {
		const data = <StockBook[]>await repository.downloadBooks();
		if (!data) return null;
		return data;
	}
}
