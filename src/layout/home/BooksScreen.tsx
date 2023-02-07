import { Layout, List, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import StockBook from "../../core/entities/StockBook";
import booksViMo, { BooksObserver } from "../../viewmodel/BooksViMo";
import StockBookCard from "./StockBookCard";

const styles = StyleSheet.create({
	body: {
		backgroundColor: "blue",
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},
	library: {
		flex: 2,
		paddingHorizontal: 10,
		paddingVertical: 4,
		justifyContent: "space-evenly",
		alignContent: "center",
	},
	flatListLayout: { justifyContent: "center" },
});

const BooksScreen = () => {
	const [books, setBooks] = useState<StockBook[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const displayDataRetrieved: BooksObserver = (books: StockBook[]) => {
		setBooks(books);
	};

	useEffect(() => {}, [books]);

	const queryDataFromServer = () => {
		setRefreshing(true);
		setTimeout(async () => {
			await booksViMo.getDataFromServer();
			setBooks(booksViMo.getBooksStored());
			setRefreshing(false);
		}, 2000);
	};

	useEffect(() => {
		queryDataFromServer();
		booksViMo.attach(displayDataRetrieved);
		return () => booksViMo.detach(displayDataRetrieved);
	}, []);

	// const bestSeller = retrievedBooks.map((book) => {
	// 	if (book.isBestSeller()) return book;
	// });
	// this.bestSeller = bestSeller?.[0] !== undefined ? bestSeller : [new StockBook()];

	return (
		<Layout style={styles.body}>
			<Layout style={styles.library}>
				<Layout>
					<Text style={{ fontWeight: "bold", fontStyle: "italic" }}>Biblioteca</Text>
				</Layout>
				<List
					scrollEnabled
					listKey={"library"}
					contentContainerStyle={styles.flatListLayout}
					initialNumToRender={5}
					numColumns={3}
					data={books}
					extraData={books}
					renderItem={StockBookCard}
					refreshing={refreshing}
					onRefresh={queryDataFromServer}
				/>
			</Layout>
		</Layout>
	);
};

export default BooksScreen;
