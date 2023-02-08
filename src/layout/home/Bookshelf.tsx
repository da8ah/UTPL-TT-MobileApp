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

const Bookshelf = (props: { tag: string; identifier: string; books: StockBook[] }) => (
	<Layout style={[styles.shelf]}>
		<Layout>
			<Text style={{ paddingLeft: 20, fontWeight: "bold", fontStyle: "italic" }}>{props.tag}</Text>
		</Layout>
		<List
			horizontal
			scrollEnabled
			listKey={props.identifier}
			contentContainerStyle={styles.flatListLayout}
			initialNumToRender={5}
			data={props.books}
			extraData={props.books}
			renderItem={StockBookCard}
		/>
	</Layout>
);
export default Bookshelf;
