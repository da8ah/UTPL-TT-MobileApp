import { Layout } from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import StockBook from "../../core/entities/StockBook";
import Bookshelf from "./Bookshelf";

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},
});

const books = [new StockBook(), new StockBook(), new StockBook(), new StockBook(), new StockBook(), new StockBook()];

const HomeScreen = () => (
	<Layout style={styles.body}>
		<ScrollView>
			<Bookshelf identifier={"inOffer"} tag={"En Oferta"} books={books} />
			<Bookshelf identifier={"bestSeller"} tag={"Más Vendido"} books={books} />
			<Bookshelf identifier={"recommended"} tag={"Recomendado"} books={books} />
			<Bookshelf identifier={"recent"} tag={"Reciente"} books={books} />
		</ScrollView>
	</Layout>
);

export default HomeScreen;
