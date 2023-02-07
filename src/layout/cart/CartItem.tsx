import { Button, Input, Layout, Modal, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Image, ListRenderItem, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import StockBook from "../../core/entities/StockBook";
import ToBuyBook from "../../core/entities/ToBuyBook";

const transparent = "transparent";
const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	cardLayout: {
		backgroundColor: "white",
		flexDirection: "row",
		height: 100,
		padding: 2,
		marginVertical: 2,
		borderRadius: 7,
	},
	cardLeft: { backgroundColor: transparent, width: "30%" },
	cardCenter: { backgroundColor: transparent, width: "40%", justifyContent: "space-around" },
	cardRight: { backgroundColor: "black", width: "30%" },
	imageLayout: { backgroundColor: "gainsboro", height: 75, alignItems: "center", borderRadius: 5 },
	image: {
		height: 75,
		resizeMode: "contain",
	},
});

const CartItem: ListRenderItem<ToBuyBook> = (info: ListRenderItemInfo<ToBuyBook>) => (
	<Layout style={styles.cardLayout}>
		<ItemLeftPanel />
		<ItemCenterPanel />
		<ItemRightPanel />
	</Layout>
);

export default CartItem;

const ItemLeftPanel = () => {
	const author = "HIRR SEBASTIAN";
	const title = "En busca de TOTORO";
	return (
		<Layout style={styles.cardLeft}>
			<Layout style={styles.imageLayout}>
				<Image style={styles.image} source={require("../../../assets/bookstore.png")} />
			</Layout>
			<ScrollView
				style={{ height: 25 }}
				horizontal
				alwaysBounceHorizontal
				showsVerticalScrollIndicator={false}
				fadingEdgeLength={50}
				contentContainerStyle={{ width: title?.length !== undefined ? (title?.length < 30 ? "100%" : "auto") : "100%" }}
			>
				<Text style={{ fontSize: 12, textAlignVertical: "center" }}>{title}</Text>
			</ScrollView>
		</Layout>
	);
};

const ItemCenterPanel = () => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalChildren, setModalChildren] = useState<JSX.Element>();
	const [cant, setCant] = useState("0");

	const price = 20;
	const inOffer = true;
	const itHasIva = true;
	const discountAmount = 5;
	return (
		<Layout style={[styles.common, styles.cardCenter]}>
			<Layout style={{ backgroundColor: transparent, width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
				<Text style={{ fontSize: 10, fontStyle: "italic" }}>{inOffer ? "* En Oferta" : ""}</Text>
				<Text style={{ fontSize: 10, fontStyle: "italic" }}>{itHasIva ? "* IVA" : ""}</Text>
			</Layout>
			<Layout style={{ backgroundColor: transparent, width: "100%", flexDirection: "row", justifyContent: "center" }}>
				<Layout style={{ backgroundColor: transparent, alignItems: "center" }}>
					<Text style={{ fontSize: 20 }}>💲{price.toFixed(2)}</Text>
					<Text
						style={{ backgroundColor: transparent, width: "100%", textAlign: "right", textAlignVertical: "top", fontSize: 12, fontStyle: "italic" }}
					>
						{inOffer ? `-${discountAmount.toFixed(2)}` : ""}
					</Text>
				</Layout>
				<Layout style={{ backgroundColor: transparent, alignItems: "flex-start", flexDirection: "row" }}>
					<Text style={{ fontSize: 20 }}> x 📦</Text>
					<TouchableOpacity
						style={{ backgroundColor: "royalblue", height: 20, width: 20, borderRadius: 100, justifyContent: "center", alignItems: "center" }}
						onPressIn={() => {
							setModalChildren(<ModalCant cantUpdater={setCant} />);
							setModalVisibility(true);
						}}
					>
						<Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>1</Text>
					</TouchableOpacity>
				</Layout>
			</Layout>
			<Modal
				visible={modalVisibility}
				style={{ width: "70%" }}
				backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				onBackdropPress={() => setModalVisibility(false)}
				children={modalChildren}
			/>
		</Layout>
	);
};

const ItemRightPanel = () => {
	const totalPrice = 40;
	return (
		<Layout style={[styles.common, styles.cardRight]}>
			<Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>💲{totalPrice.toFixed(2)}</Text>
		</Layout>
	);
};

const ModalCant = (props: { cantUpdater: (cant: string) => void }) => {
	const [cant, setCant] = useState("0");

	return (
		<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
			<Layout style={{ flexDirection: "row", justifyContent: "center" }}>
				<Text style={{ textAlign: "right" }}>Cantidad de Artículos</Text>
				<Text style={{ width: "20%", textAlign: "center" }}>{Number(cant) !== 0 ? cant : "0"}</Text>
			</Layout>
			<Layout style={{ marginVertical: 20 }}>
				<Input
					selectTextOnFocus
					keyboardType="phone-pad"
					size="small"
					textAlign="center"
					cursorColor='black'
					defaultValue={cant}
					value={cant}
					onChangeText={(newCant) => {
						const pattern = /^\d{0,1}$/;
						if (!Number.isNaN(Number(newCant)) && new RegExp(pattern).test(newCant)) setCant(newCant);
					}}
				/>
			</Layout>
			<Button
				size="small"
				style={{ width: "50%" }}
				onPress={() => {
					// const parse = Number(cant);
					// if (!Number.isNaN(parse)) {
					// 	props.setStock(parse);
					// 	props.book.setStock(parse);
					// 	newStockBookViMo.updateDraft(props.book);
					// 	props.setModalVisibility(false);
					// }
				}}
			>
				Confirmar
			</Button>
		</Layout>
	);
};
