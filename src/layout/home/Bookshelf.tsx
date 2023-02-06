import { List, Text } from "@ui-kitten/components";
import { Layout } from "@ui-kitten/components";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import StockBook from "../../core/entities/StockBook";
import StockBookCard from "./StockBookCard";

const styles = StyleSheet.create({
	shelf: {
		flex: 1,
	},
	flatListLayout: {
		alignItems: "flex-end",
	},
});

const books = [new StockBook(), new StockBook(), new StockBook(), new StockBook(), new StockBook(), new StockBook()];

const Bookshelf = () => (
	<Layout style={[styles.shelf]}>
		<Layout>
			<Text>Más vendidos</Text>
		</Layout>
		<List
			horizontal
			scrollEnabled
			// testID='listBooks'
			// listKey={"books"}
			// style={styles.mainListLayout}
			contentContainerStyle={styles.flatListLayout}
			initialNumToRender={5}
			data={books}
			extraData={books}
			renderItem={StockBookCard}
			// refreshing={refreshing}
			// onRefresh={queryDataFromServer}
		/>
	</Layout>
);
export default Bookshelf;
