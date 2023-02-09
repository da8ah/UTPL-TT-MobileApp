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
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const [books, setBooks] = useState<StockBook[]>([]);
	const [bestSeller, setBestSeller] = useState<StockBook[]>([]);
	const [recommended, setRecommended] = useState<StockBook[]>([]);
	const [recent, setRecent] = useState<StockBook[]>([]);
	const [inOffer, setInOffer] = useState<StockBook[]>([]);

	const displayDataRetrieved: BooksObserver = (books: StockBook[]) => {
		setBooks(books);
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
	};

	useEffect(() => {}, [books, inOffer, bestSeller, recommended, recent]);

	const fetchData = () => {
		setRefreshing(true);
		setTimeout(async () => {
			await booksViMo.getDataFromServer();
			setRefreshing(false);
		}, 2000);
	};

	useEffect(() => {
		booksViMo.attach(displayDataRetrieved);
		fetchData();
		return () => booksViMo.detach(displayDataRetrieved);
	}, []);

	return (
		<Layout style={styles.body}>
			<ScrollView>
				<Bookshelf identifier={"inOffer"} tag={"En Oferta"} books={inOffer} refreshing={refreshing} />
				<Bookshelf identifier={"bestSeller"} tag={"Más Vendido"} books={bestSeller} refreshing={refreshing} />
				<Bookshelf identifier={"recommended"} tag={"Recomendado"} books={recommended} refreshing={refreshing} />
				<Bookshelf identifier={"recent"} tag={"Reciente"} books={recent} refreshing={refreshing} />
			</ScrollView>
		</Layout>
	);
};

export default HomeScreen;
