import serverDataSource, { ServerDataSource } from "../core/data/ServerDataSource";
import Cart from "../core/entities/Cart";
import StockBook from "../core/entities/StockBook";
import ToBuyBook from "../core/entities/ToBuyBook";
import CarritoDelClient from "../core/usecases/client/CarritoDelClient";
import TransaccionesDelClient from "../core/usecases/client/TransaccionesDelClient";

export type CartObserver = (cart: Cart) => void;
export class CartViMo {
	private observer: CartObserver | null = null;
	private repository: ServerDataSource | null = serverDataSource;
	private cart: Cart = new Cart();
	private books: StockBook[] = [];
	private callFromCart = false;
	private spk: string | null = null;

	public getSPK() {
		return this.spk;
	}

	public wasCalledFromCart() {
		return this.callFromCart;
	}
	public setCallFromCart(value: boolean) {
		this.callFromCart = value;
	}

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
		// Verify if book already exists
		let found = false;
		this.books.forEach((book) => {
			if (!found) found = book.getIsbn() === stockBook.getIsbn();
		});

		// If exists update cant
		if (found) {
			this.cart.getToBuyBooks()?.forEach((book) => {
				if (book.getIsbn() === stockBook.getIsbn()) book.setCant(cant);
			});
			return;
		}

		// If not exists then add
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

	public removeBookFromCart(index: number) {
		this.books.splice(index, 1);
		this.cart.rmToBuyBook(index);
		this.cart.calculate();
		if (this.observer) this.observer(this.cart);
	}

	public updateCantToBuy(toBuyBook: ToBuyBook, cant: number) {
		const books = this.cart.getToBuyBooks();
		if (books === undefined) return;
		const index = books.indexOf(toBuyBook);
		if (index !== undefined) books[index].setCant(cant);
		this.cart.calculate();
		if (this.observer) this.observer(this.cart);
	}

	public getAvailableStock(toBuyBook: ToBuyBook) {
		const index = this.cart.getToBuyBooks()?.indexOf(toBuyBook);
		if (this.books && index !== undefined) return this.books[index].getStock();
	}

	public async queryPublishableKey() {
		let credenciales;
		if (this.repository) credenciales = await CarritoDelClient.obtenerCredencialesDePago(this.repository);
		if (credenciales) this.spk = credenciales;
	}

	public async sendPaymentToServer() {
		if (!this.repository) return null;
		return await CarritoDelClient.realizarPago(this.cart, this.repository);
	}

	public async sendTransactionToServer() {
		if (!this.repository) return null;
		const resultado = await TransaccionesDelClient.registrarTransaccion(this.cart, this.repository);
		if (resultado) {
			this.books = [];
			this.cart = new Cart();
		}
		if (this.observer && this.cart) this.observer(this.getCart());
		return resultado;
	}
}

const cartViMo = new CartViMo();

export default cartViMo;
