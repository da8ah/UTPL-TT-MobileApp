import BillingInfo from "./BillingInfo";
import CardTransaction from "./CardTransaction";
import Cart from "./Cart";
import Client from "./Client";
import StockBook from "./StockBook";
import ToBuyBook from "./ToBuyBook";
import User from "./User";

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

export class InputValidator {
	private static userPattern = /^[A-Za-z]((\_|\.)?[A-Za-z0-9]){5,19}$/;
	private static namePattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){1,4}$/;
	private static emailPattern = /^([\w\.\-]+){1,3}@([\w\-]+)((\.(\w){2,3})+)$/;
	private static mobilePattern = /^(\+593)?\s?(\d{10}|\d{9})$/;
	private static passworPattern = /^[\w\W\s]{5,}$/;

	private static toWhomPattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){1,4}$/;
	private static ciPattern = /^\d{10}$/;
	private static provinciaPattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\.)?(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){0,4}$/;
	private static ciudadPattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\.)?(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){0,4}$/;
	private static numCasaPattern = /^\d((\-|\s)?\d){1,10}$/;
	private static callesPattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]{1,15}((\.|\-|\,)?\s?[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]{1,15}){3,10}$/;

	public static validateUser(user: User): boolean {
		if (!new RegExp(this.userPattern).test(user.getUser() || "")) return false;
		if (!new RegExp(this.namePattern).test(user.getName() || "")) return false;
		if (!new RegExp(this.emailPattern).test(user.getEmail() || "")) return false;
		if (!new RegExp(this.mobilePattern).test(user.getMobile() || "")) return false;
		if (!new RegExp(this.passworPattern).test(user.getPassword() || "")) return false;
		return true;
	}
	public static validateUserToUpdate(user: User): boolean {
		if (!(user.getUser() === undefined || new RegExp(this.userPattern).test(user.getUser() || ""))) return false;
		if (!(user.getName() === undefined || new RegExp(this.namePattern).test(user.getName() || ""))) return false;
		if (!(user.getEmail() === undefined || new RegExp(this.emailPattern).test(user.getEmail() || ""))) return false;
		if (!(user.getMobile() === undefined || new RegExp(this.mobilePattern).test(user.getMobile() || ""))) return false;
		if (!(user.getPassword() === undefined || new RegExp(this.passworPattern).test(user.getPassword() || ""))) return false;
		return true;
	}

	public static validateBillingInfo(billingInfo: BillingInfo): boolean {
		if (!new RegExp(this.toWhomPattern).test(billingInfo.getToWhom() || "")) return false;
		if (!new RegExp(this.ciPattern).test(billingInfo.getCi() || "")) return false;
		if (!new RegExp(this.provinciaPattern).test(billingInfo.getProvincia() || "")) return false;
		if (!new RegExp(this.ciudadPattern).test(billingInfo.getCiudad() || "")) return false;
		if (!new RegExp(this.numCasaPattern).test(billingInfo.getNumCasa() || "")) return false;
		if (!new RegExp(this.callesPattern).test(billingInfo.getCalles() || "")) return false;
		return true;
	}
	public static validateBillingInfoToUpdate(billingInfo: BillingInfo): boolean {
		if (!(billingInfo.getToWhom() === undefined || new RegExp(this.toWhomPattern).test(billingInfo.getToWhom() || ""))) return false;
		if (!(billingInfo.getCi() === undefined || new RegExp(this.ciPattern).test(billingInfo.getCi() || ""))) return false;
		if (!(billingInfo.getProvincia() === undefined || new RegExp(this.provinciaPattern).test(billingInfo.getProvincia() || ""))) return false;
		if (!(billingInfo.getCiudad() === undefined || new RegExp(this.ciudadPattern).test(billingInfo.getCiudad() || ""))) return false;
		if (!(billingInfo.getNumCasa() === undefined || new RegExp(this.numCasaPattern).test(billingInfo.getNumCasa() || ""))) return false;
		if (!(billingInfo.getCalles() === undefined || new RegExp(this.callesPattern).test(billingInfo.getCalles() || ""))) return false;
		return true;
	}
}
