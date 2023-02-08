import BillingInfo from "./BillingInfo";
import CardTransaction from "./CardTransaction";
import Cart from "./Cart";
import Client from "./Client";
import StockBook from "./StockBook";
import ToBuyBook from "./ToBuyBook";

export type IStockBook = {
	isbn?: string;
	imgRef?: string;
	title?: string;
	author?: string;
	releaseDate?: string;
	grossPricePerUnit?: number;
	inOffer?: boolean;
	discountPercentage?: number;
	hasIva?: boolean;
	ivaPercentage?: number;
	createdDate?: string;
	description?: string;
	stock?: number;
	visible?: boolean;
	recommended?: boolean;
	bestSeller?: boolean;
	recent?: boolean;
};

export class BookConverter {
	public static bookToJSON(stockBook: StockBook): JSON {
		let json: IStockBook = {
			isbn: "",
			imgRef: "",
			title: "",
			author: "",
			releaseDate: "",
			grossPricePerUnit: 0,
			inOffer: false,
			discountPercentage: 0,
			hasIva: false,
			ivaPercentage: 0,
			createdDate: "",
			description: "",
			stock: 0,
			visible: false,
			recommended: false,
			bestSeller: false,
			recent: false,
		};
		json.isbn = stockBook.getIsbn() || "";
		json.imgRef = stockBook.getImgRef() || "";
		json.title = stockBook.getTitle() || "";
		json.author = stockBook.getAuthor() || "";
		json.releaseDate = stockBook.getReleaseDate() || "";
		json.grossPricePerUnit = stockBook.getGrossPricePerUnit() || 0;
		if (stockBook.isInOffer() !== undefined) json.inOffer = stockBook.isInOffer();
		json.discountPercentage = stockBook.getDiscountPercentage() || 0;
		if (stockBook.itHasIva()) json.hasIva = stockBook.itHasIva();
		json.ivaPercentage = stockBook.getIvaPercentage() || 0;
		json.createdDate = stockBook.getCreatedDate() || "";
		json.description = stockBook.getDescription() || "";
		json.stock = stockBook.getStock() || 0;
		if (stockBook.isVisible()) json.visible = stockBook.isVisible();
		if (stockBook.isRecommended()) json.recommended = stockBook.isRecommended();
		if (stockBook.isBestSeller()) json.bestSeller = stockBook.isBestSeller();
		if (stockBook.isRecent()) json.recent = stockBook.isRecent();
		return JSON.parse(JSON.stringify(json));
	}

	public static jsonToBook(res: IStockBook): StockBook {
		// All Attrs from body
		const {
			isbn,
			imgRef,
			title,
			author,
			releaseDate,
			grossPricePerUnit,
			inOffer,
			discountPercentage,
			hasIva,
			createdDate,
			description,
			stock,
			visible,
			recommended,
			bestSeller,
			recent,
		} = res;

		// NewStockBook with all Attrs
		return new StockBook(
			isbn,
			imgRef,
			title,
			author,
			releaseDate,
			grossPricePerUnit,
			inOffer,
			discountPercentage,
			hasIva,
			createdDate,
			description,
			stock,
			visible,
			recommended,
			bestSeller,
			recent,
		);
	}
}

export type IToBuyBook = {
	isbn?: string;
	imgRef?: string;
	title?: string;
	author?: string;
	releaseDate?: string;
	grossPricePerUnit?: number;
	inOffer?: boolean;
	discountPercentage?: number;
	hasIva?: boolean;
	cant?: number;
};
export type ICart = {
	discountCalc?: number;
	ivaCalc?: number;
	subtotal?: number;
	totalPrice?: number;
	toBuyBooks?: IToBuyBook[];
};
export type ICardTransaction = {
	id?: string;
	date?: string;
	payment?: number;
	change?: number;
	cart?: ICart;
};

export class TransactionConverter {
	public static jsonToBook(res: ICardTransaction): CardTransaction {
		// All Attrs from body
		const { id, date, payment, change, cart } = res;

		if (cart !== undefined) {
			const { discountCalc, ivaCalc, subtotal, totalPrice, toBuyBooks } = cart;

			if (toBuyBooks !== undefined) {
				// NewStockBook with all Attrs
				const newToBuyBooksArray = toBuyBooks.map(
					(item: IToBuyBook) =>
						new ToBuyBook(
							item.isbn,
							item.imgRef,
							item.title,
							item.author,
							item.releaseDate,
							item.grossPricePerUnit,
							item.inOffer,
							item.discountPercentage,
							item.hasIva,
							item.cant,
						),
				);
				const newCart = new Cart(discountCalc, ivaCalc, subtotal, totalPrice, newToBuyBooksArray);
				return new CardTransaction(id, date, payment, change, newCart);
			}
		}
		return new CardTransaction();
	}
}

export class ClientConverter {
	public static jsonToClient(req: {
		user: string;
		name: string;
		email: string;
		mobile: string;
		password: string;
		billingInfo: { toWhom: string; ci: string; provincia: string; ciudad: string; numCasa: string; calles: string };
	}): Client {
		const { user, name, email, mobile, password, billingInfo } = req;

		const client = new Client(user, name, email, mobile, password);
		const newBillingInfo = new BillingInfo(
			billingInfo.toWhom,
			billingInfo.ci,
			billingInfo.provincia,
			billingInfo.ciudad,
			billingInfo.numCasa,
			billingInfo.calles,
		);
		client.setBillingInfo(newBillingInfo);
		return client;
	}
}
