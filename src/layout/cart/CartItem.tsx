import { Input, Layout, Text } from "@ui-kitten/components";
import { Image, ListRenderItem, ListRenderItemInfo, ScrollView, StyleSheet } from "react-native";
import StockBook from "../../core/entities/StockBook";
import ToBuyBook from "../../core/entities/ToBuyBook";

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	cardLayout: {
		backgroundColor: "transparent",
		flexDirection: "row",
		height: 150,
		paddingVertical: 2,
		borderRadius: 7,
	},
	cardLeft: { backgroundColor: "blue", width: "30%" },
	cardMiddle: { backgroundColor: "red", width: "40%", justifyContent: "space-around" },
	cardRight: { backgroundColor: "darkgreen", width: "30%" },
	imageLayout: { height: 100, alignItems: "center" },
	image: {
		height: 70,
		resizeMode: "contain",
	},

	// bodyProperties: {
	// 	backgroundColor: transparent,
	// 	paddingHorizontal: 1,
	// 	flexDirection: "row",
	// 	justifyContent: "space-between",
	// },
});

const CartItem: ListRenderItem<ToBuyBook> = (info: ListRenderItemInfo<ToBuyBook>) => {
	const price = 20;
	const cant = 2;
	const discountAmount = 5;
	const totalPrice = 40;
	const author = "HIRR SEBASTIAN";
	const title = "En busca de TOTORO";

	return (
		<Layout style={styles.cardLayout}>
			<Layout style={styles.cardLeft}>
				<Text style={{ fontSize: 9 }}>9876543212345</Text>
				<Layout style={styles.imageLayout}>
					<Image style={styles.image} source={require("../../../assets/bookstore.png")} />
				</Layout>
				<ScrollView
					horizontal
					alwaysBounceHorizontal
					showsVerticalScrollIndicator={false}
					fadingEdgeLength={50}
					contentContainerStyle={{ width: title?.length !== undefined ? (title?.length < 30 ? "100%" : "auto") : "100%" }}
				>
					<Text style={{ fontSize: 9 }}>{author}</Text>
				</ScrollView>
				<ScrollView
					horizontal
					alwaysBounceHorizontal
					showsVerticalScrollIndicator={false}
					fadingEdgeLength={50}
					contentContainerStyle={{ width: title?.length !== undefined ? (title?.length < 30 ? "100%" : "auto") : "100%" }}
				>
					<Text style={{ fontSize: 11 }}>{title}</Text>
				</ScrollView>
			</Layout>
			<Layout style={[styles.common, styles.cardMiddle]}>
				<Text style={{ backgroundColor: "white", width: "100%", textAlign: "center" }}>Dis: * IVA: *</Text>
				<Layout style={{ backgroundColor: "white", width: "100%", flexDirection: "row", justifyContent: "center" }}>
					<Layout style={{ alignItems: "center" }}>
						<Text style={{ fontSize: 20 }}>💲{price.toFixed(2)}</Text>
						<Text style={{ backgroundColor: "white", width: "100%", textAlign: "left" }}>-{discountAmount.toFixed(2)}</Text>
					</Layout>
					<Text style={{ fontSize: 20 }}> x 📦 {cant}</Text>
				</Layout>
			</Layout>
			<Layout style={[styles.common, styles.cardRight]}>
				<Text style={{ fontSize: 30 }}>💲{totalPrice.toFixed(2)}</Text>
			</Layout>
		</Layout>
	);
};

export default CartItem;
