import { Layout } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import StockBook from "../../core/entities/StockBook";
import booksViMo, { BooksObserver } from "../../viewmodel/BooksViMo";
import Bookshelf from "./Bookshelf";

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},
});

const HomeScreen = () => {
	const [books, setBooks] = useState<StockBook[]>([]);
	const [bestSeller, setBestSeller] = useState<StockBook[]>([]);
	const [recommended, setRecommended] = useState<StockBook[]>([]);
	const [recent, setRecent] = useState<StockBook[]>([]);
	const [inOffer, setInOffer] = useState<StockBook[]>([]);

	const displayDataRetrieved: BooksObserver = (books: StockBook[]) => {
		setBooks(books);
	};

	useEffect(() => {
		const inOffer = books.filter((book) => {
			if (book.isInOffer()) return book;
		});
		const bestSeller = books.filter((book) => {
			if (book.isBestSeller()) return book;
		});
		const recommended = books.filter((book) => {
			if (book.isRecommended()) return book;
		});
		const recent = books.filter((book) => {
			if (book.isRecent()) return book;
		});

		inOffer?.[0] !== undefined ? setInOffer(inOffer) : [new StockBook()];
		bestSeller?.[0] !== undefined ? setBestSeller(bestSeller) : [new StockBook()];
		recommended?.[0] !== undefined ? setRecommended(recommended) : [new StockBook()];
		recent?.[0] !== undefined ? setRecent(recent) : [new StockBook()];
	}, [books]);

	const queryDataFromServer = () => {
		setTimeout(async () => {
			await booksViMo.getDataFromServer();
			setBooks(booksViMo.getBooksStored());
		}, 2000);
	};

	useEffect(() => {
		queryDataFromServer();
		booksViMo.attach(displayDataRetrieved);
		return () => booksViMo.detach(displayDataRetrieved);
	}, []);

	return (
		<Layout style={styles.body}>
			<ScrollView>
				<Bookshelf identifier={"inOffer"} tag={"En Oferta"} books={inOffer} />
				<Bookshelf identifier={"bestSeller"} tag={"Más Vendido"} books={bestSeller} />
				<Bookshelf identifier={"recommended"} tag={"Recomendado"} books={recommended} />
				<Bookshelf identifier={"recent"} tag={"Reciente"} books={recent} />
			</ScrollView>
		</Layout>
	);
};

export default HomeScreen;
