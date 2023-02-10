import { Layout, List, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Cart from "../../core/entities/Cart";
import cartViMo, { CartObserver } from "../../viewmodel/CartViMo";
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
	statusLayouts: { backgroundColor: "transparent", alignItems: "center", paddingVertical: 5 },
	statusProperties: { textAlign: "center", fontSize: 12, fontWeight: "bold" },
});

const CartScreen = (props: { closeButton?: JSX.Element; orderButton?: JSX.Element }) => {
	const [cart, setCart] = useState<Cart>(cartViMo.getCart());
	const [books, setBooks] = useState(cart.getToBuyBooks());
	const [descuento, setDescuento] = useState(cart?.getDiscountCalc() || 0);
	const [iva, setIva] = useState(cart?.getIvaCalc() || 0);
	const [subtotal, setSubtotal] = useState(cart?.getSubtotal() || 0);
	const [total, setTotal] = useState(cart?.getTotalPrice() || 0);
	const fecha = new Date().toLocaleDateString("ec");

	useEffect(() => {}, [cart, books, fecha, descuento, iva, subtotal, total]);

	const updateCart: CartObserver = (cart: Cart) => {
		setCart(cart);
		setBooks(cart.getToBuyBooks());
		setDescuento(cart?.getDiscountCalc() || 0);
		setIva(cart?.getIvaCalc() || 0);
		setSubtotal(cart?.getSubtotal() || 0);
		setTotal(cart?.getTotalPrice() || 0);
	};

	useEffect(() => {
		cartViMo.attach(updateCart);
		return () => cartViMo.detach();
	}, []);

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
				<Layout style={[styles.statusLayouts, { width: "20%" }]}>
					<Text style={{ fontWeight: "bold" }}>Fecha</Text>
					<Text>{fecha}</Text>
				</Layout>
				<Layout style={[styles.statusLayouts]}>
					<Text style={[styles.statusProperties]}>Subtotal</Text>
					<Text style={[styles.statusProperties, { fontSize: 13 }]}>{subtotal.toFixed(2)}</Text>
				</Layout>
				<Layout style={[styles.statusLayouts]}>
					<Text style={[styles.statusProperties]}>IVA</Text>
					<Text style={[styles.statusProperties, { color: "darkred" }]}>+{iva.toFixed(2)}</Text>
				</Layout>
				<Layout style={[styles.statusLayouts]}>
					<Text style={[styles.statusProperties]}>Descuento</Text>
					<Text style={[styles.statusProperties, { color: "darkgreen" }]}>-{descuento.toFixed(2)}</Text>
				</Layout>
				<Layout style={[styles.statusLayouts, { backgroundColor: "orange", width: "25%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]}>
					<Text style={[styles.statusProperties, { width: "100%", fontSize: 18 }]}>TOTAL</Text>
					<Text style={[styles.statusProperties, { width: "100%", fontSize: 18 }]}>$ {total.toFixed(2)}</Text>
				</Layout>
			</Layout>
			<Layout style={styles.cartBooks}>
				<List scrollEnabled listKey={"cart"} initialNumToRender={5} data={books} extraData={books} renderItem={CartItem} />
			</Layout>
			{props.orderButton}
		</Layout>
	);
};

export default CartScreen;
