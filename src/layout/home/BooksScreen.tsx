import { Layout, List, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import StockBook from "../../core/entities/StockBook";
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
	flatListLayout: { justifyContent: "center", alignItems: "center" },
});

const books = [
	new StockBook(),
	new StockBook(),
	new StockBook(),
	new StockBook(),
	new StockBook(),
	new StockBook(),
	new StockBook(),
	new StockBook(),
	new StockBook(),
	new StockBook(),
];

const BooksScreen = () => (
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
				// refreshing={refreshing}
				// onRefresh={queryDataFromServer}
			/>
		</Layout>
	</Layout>
);

export default BooksScreen;
