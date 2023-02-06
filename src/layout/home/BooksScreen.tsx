import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Layout, List, Text } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import StockBook from "../../core/entities/StockBook";
import { RootStackParamList } from "../NavigationTypes";
import Bookshelf from "./Bookshelf";
import StockBookCard from "./StockBookCard";

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	container: {
		flex: 1,
	},
	header: {
		flex: 1,
		backgroundColor: "tomato",
		color: "white",
		paddingVertical: 15,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		marginTop: 30,
	},
	body: {
		backgroundColor: "blue",
		flex: 24,
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
});

const BooksScreen = () => (
	<Layout style={{ flex: 1 }}>
		<BooksHeader />
		<BooksBody />
	</Layout>
);

export default BooksScreen;

const UserIcon = () => <Icon name="person" fill="white" height="30" width="30" />;
const CartIcon = () => <Icon name="shopping-cart" fill="white" height="30" width="30" />;
const BooksHeader = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();
	const [startLocationY, setStartLocationY] = useState(0);

	return (
		<Layout
			style={[styles.common, styles.header]}
			onStartShouldSetResponder={() => true}
			onResponderStart={(e) => setStartLocationY(e.nativeEvent.locationY)}
			onResponderRelease={(e) => {
				if (startLocationY >= 0 && startLocationY <= 70 && startLocationY < e.nativeEvent.locationY && e.nativeEvent.locationY <= 90)
					navigation.navigate("Home");
			}}
		>
			<Layout style={{ backgroundColor: "transparent", width: "100%", flexDirection: "row", justifyContent: "space-evenly" }}>
				<Button size="tiny" status="danger" accessoryLeft={UserIcon} style={{ borderRadius: 100 }} onPress={() => navigation.navigate("Profile")} />
				<Text category="h3" status="basic" style={{ fontStyle: "italic" }}>
					BOOKSTORE
				</Text>
				<Button size="tiny" status="danger" accessoryLeft={CartIcon} style={{ borderRadius: 100 }} onPress={() => navigation.navigate("Cart")} />
			</Layout>
		</Layout>
	);
};

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

const BooksBody = () => (
	<Layout style={styles.body}>
		<Bookshelf />
		<Layout style={[styles.library]}>
			<Layout>
				<Text>Biblioteca</Text>
			</Layout>
			<List
				scrollEnabled
				// testID='listBooks'
				// listKey={"books"}
				// style={styles.mainListLayout}
				// contentContainerStyle={styles.flatListLayout}
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
