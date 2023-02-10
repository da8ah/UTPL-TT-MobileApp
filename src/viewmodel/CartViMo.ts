import serverDataSource, { ServerDataSource } from "../core/data/ServerDataSource";
import Cart from "../core/entities/Cart";
import StockBook from "../core/entities/StockBook";
import ToBuyBook from "../core/entities/ToBuyBook";

export type CartObserver = (cart?: Cart) => void;
export class CartViMo {
	private observer: CartObserver | null = null;
	private repository: ServerDataSource | null = serverDataSource;
	private cart: Cart = new Cart();
	private books: StockBook[] = [];

	public getCart(): Cart {
		this.cart.calculate();
		return this.cart;
	}

	public attach(observer: CartObserver) {
		this.observer = observer;
	}

	public detach() {
		this.observer = null;
	}

	public addBookToCart(stockBook: StockBook, cant: number) {
		if (this.books.includes(stockBook)) return;
		this.books.push(stockBook);
		const toAdd: ToBuyBook = new ToBuyBook(
			stockBook.getIsbn(),
			stockBook.getImgRef(),
			stockBook.getTitle(),
			stockBook.getAuthor(),
			stockBook.getReleaseDate(),
			stockBook.getGrossPricePerUnit(),
			stockBook.isInOffer(),
			stockBook.getDiscountPercentage(),
			stockBook.itHasIva(),
			cant,
		);
		this.cart.addToBuyBook(toAdd);
	}

	public getAvailableStock(toBuyBook?: ToBuyBook) {
		// const index = this.cart.getToBuyBooks()?.indexOf(toBuyBook);
		// if (this.books && index)
		//return this.books[index].getStock();
		// console.log(this.books[index].getStock());
		console.log(this.books);
	}

	public getBookByIndex(index: number) {
		const books = this.cart?.getToBuyBooks();
		if (books === undefined) return;
		return books[index];
	}
}

const cartViMo = new CartViMo();

export default cartViMo;
