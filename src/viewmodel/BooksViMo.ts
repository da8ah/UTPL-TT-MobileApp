import serverDataSource, { ServerDataSource } from "../core/data/ServerDataSource";
import StockBook from "../core/entities/StockBook";
import GestionDeInicio from "../core/usecases/GestionDeInicio";

export type BooksObserver = (books: StockBook[]) => void;

export class BooksViMo {
	private observers: BooksObserver[] | null = null;
	private repository: ServerDataSource | null = serverDataSource;
	private books: StockBook[] = [];

	public attach(observer: BooksObserver) {
		if (!this.observers) this.observers = [];
		this.observers.push(observer);
	}

	public detach(observer: BooksObserver) {
		const spliceIndex = this.observers?.indexOf(observer);
		if (spliceIndex !== undefined) {
			const observers = this.observers?.concat(
				this.observers?.splice(0, spliceIndex - 1),
				this.observers?.splice(spliceIndex, this.observers?.length),
			);
			if (observers !== undefined) this.observers = observers;
		}
	}

	public async getDataFromServer() {
		let retrievedBooks = null;
		if (this.repository) retrievedBooks = await GestionDeInicio.listarCatalogoDeLibros(this.repository);
		if (retrievedBooks) this.books = retrievedBooks;
		if (this.observers && this.books)
			this.observers.forEach((observer) => {
				if (observer) observer(this.books);
			});
	}

	public getBooksStored(): StockBook[] {
		return this.books;
	}

	public getBookByIndex(index: number): StockBook {
		return this.books[index] || new StockBook();
	}
}

const booksViMo = new BooksViMo();

export default booksViMo;
