import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Layout, List, Text } from "@ui-kitten/components";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import StockBook from "../../core/entities/StockBook";
import ToBuyBook from "../../core/entities/ToBuyBook";
import { RootStackParamList } from "../NavigationTypes";
import CartItem from "./CartItem";

const styles = StyleSheet.create({
	container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "grey" },
	cartHeader: {
		backgroundColor: "black",
		flex: 2,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	cartStatus: { flex: 3, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	cartBooks: { flex: 17 },
	button: {},
	statusLayouts: { alignItems: "center" },
	statusProperties: { textAlign: "center", fontSize: 12, fontWeight: "bold" },
});

const books = [
	new ToBuyBook(),
	new ToBuyBook(),
	new ToBuyBook(),
	new ToBuyBook(),
	new ToBuyBook(),
	new ToBuyBook(),
	new ToBuyBook(),
	new ToBuyBook(),
	new ToBuyBook(),
	new ToBuyBook(),
];

const CartScreen = (props: { closeButton?: JSX.Element }) => {
	// const fecha = new Intl.DateTimeFormat("ec", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());
	const fecha = new Date().toDateString();
	const descuento = 10;
	const iva = 4.34;
	const subtotal = 23.66;
	const total = 200;

	// render
	return (
		<Layout style={{ flex: 1 }}>
			<Layout style={styles.cartHeader}>
				<Text category="h3" style={{ color: "white", fontStyle: "italic" }}>
					En mi Carrito
				</Text>
				{props.closeButton}
			</Layout>
			<Layout style={styles.cartStatus}>
				<Layout style={{ width: "30%", alignItems: "center" }}>
					<Text style={{ fontWeight: "bold" }}>Fecha</Text>
					<Text>{fecha}</Text>
				</Layout>
				<Layout style={[styles.statusLayouts]}>
					<Text style={[styles.statusProperties]}>Descuento</Text>
					<Text style={[styles.statusProperties, { color: "mediumspringgreen", fontSize: 13 }]}>-{descuento.toFixed(2)}</Text>
				</Layout>
				<Layout style={[styles.statusLayouts]}>
					<Text style={[styles.statusProperties]}>IVA</Text>
					<Text style={[styles.statusProperties, { color: "darkred" }]}>+{iva.toFixed(2)}</Text>
				</Layout>
				<Layout style={[styles.statusLayouts]}>
					<Text style={[styles.statusProperties]}>Subtotal</Text>
					<Text style={[styles.statusProperties]}>{subtotal.toFixed(2)}</Text>
				</Layout>
				<Layout style={[styles.statusLayouts, { width: "20%" }]}>
					<Text style={[styles.statusProperties, { width: "100%", fontSize: 18 }]}>TOTAL</Text>
					<Text style={[styles.statusProperties, { width: "100%", fontSize: 18, textAlign: "left" }]}>$ {total.toFixed(2)}</Text>
				</Layout>
			</Layout>
			<Layout style={styles.cartBooks}>
				<List
					scrollEnabled
					// testID='listBooks'
					// listKey={"books"}
					// style={styles.mainListLayout}
					// contentContainerStyle={styles.flatListLayout}
					initialNumToRender={5}
					data={books}
					extraData={books}
					renderItem={CartItem}
					// refreshing={refreshing}
					// onRefresh={queryDataFromServer}
				/>
			</Layout>
			<Button status="primary" style={styles.button}>
				Procesar
			</Button>
		</Layout>
	);
};

export default CartScreen;
