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
		paddingHorizontal: 0,
		paddingVertical: 4,
		justifyContent: "space-evenly",
		alignContent: "center",
	},
	flatListLayout: { justifyContent: "center" },
	items: {justifyContent: "flex-start", marginVertical: 10}
});

const BooksScreen = () => {
	const [books, setBooks] = useState<StockBook[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const displayDataRetrieved: BooksObserver = (books: StockBook[]) => {
		setBooks(books);
	};

	useEffect(() => {}, [books]);

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
			<Layout style={styles.library}>
				<Layout>
					<Text style={{ fontWeight: "bold", fontStyle: "italic" }}>Biblioteca</Text>
				</Layout>
				<List
					scrollEnabled
					key={"library"}
					contentContainerStyle={styles.flatListLayout}
					columnWrapperStyle={styles.items}
					initialNumToRender={5}
					numColumns={3}
					data={books}
					extraData={books}
					renderItem={StockBookCard}
					refreshing={refreshing}
					onRefresh={fetchData}
				/>
			</Layout>
		</Layout>
	);
};

export default BooksScreen;
