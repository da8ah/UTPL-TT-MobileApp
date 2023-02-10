import { Button, Input, Layout, Modal, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Image, ListRenderItem, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import ToBuyBook from "../../core/entities/ToBuyBook";
import cartViMo from "../../viewmodel/CartViMo";

const transparent = "transparent";
const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	cardLayout: {
		backgroundColor: "palegoldenrod",
		flexDirection: "row",
		height: 100,
		padding: 2,
		margin: 2,
		borderRadius: 7,
	},
	cardLeft: { backgroundColor: transparent, width: "30%" },
	cardCenter: { backgroundColor: transparent, width: "35%", justifyContent: "space-around" },
	cardRight: { backgroundColor: transparent, width: "35%" },
	imageLayout: { backgroundColor: transparent, height: 75, alignItems: "center", borderRadius: 5 },
	image: {
		height: 75,
		resizeMode: "contain",
	},
});

const CartItem: ListRenderItem<ToBuyBook> = (info: ListRenderItemInfo<ToBuyBook>) => <CardToBuyBook book={info.item} />;

export default CartItem;

const CardToBuyBook = (props: { book: ToBuyBook }) => {
	const [cant, setCant] = useState(props.book.getCant() || 0);

	return (
		<Layout style={styles.cardLayout}>
			<ItemLeftPanel book={props.book} />
			<ItemCenterPanel book={props.book} cant={cant} cantUpdater={setCant} />
			<ItemRightPanel book={props.book} cant={cant} />
		</Layout>
	);
};

const ItemLeftPanel = (props: { book: ToBuyBook }) => {
	const title = props.book.getTitle();
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
				contentContainerStyle={{ height: 20 }}
			>
				<Text style={{ fontSize: 12, textAlignVertical: "center" }}>{title}</Text>
			</ScrollView>
		</Layout>
	);
};

const ItemCenterPanel = (props: { book: ToBuyBook; cant: number; cantUpdater: (cant: number) => void }) => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalChildren, setModalChildren] = useState<JSX.Element>();

	const grossPrice = props.book.getGrossPricePerUnit() || 0;
	const discountAmount = props.book.getDiscountedAmount() || 0;
	const price = (props.book.getGrossPricePerUnit() || NaN) - discountAmount;
	const inOffer = props.book.isInOffer();
	const itHasIva = props.book.itHasIva();

	return (
		<Layout style={[styles.common, styles.cardCenter]}>
			<Layout style={{ backgroundColor: transparent, width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
				<Text style={{ color: "darkgrey", fontSize: 10, fontStyle: "italic" }}>{inOffer ? "* En Oferta" : ""}</Text>
				<Text style={{ color: "darkgrey", fontSize: 10, fontStyle: "italic" }}>{itHasIva ? "* IVA" : ""}</Text>
			</Layout>
			<Layout style={{ backgroundColor: transparent, width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
				<Layout style={{ backgroundColor: transparent, alignItems: "center" }}>
					<Text style={{ fontSize: 20 }}>💲{price.toFixed(2)}</Text>
					<Text
						style={{
							backgroundColor: transparent,
							color: "red",
							width: "100%",
							textAlign: "right",
							textAlignVertical: "top",
							fontSize: 12,
							fontStyle: "italic",
							textDecorationLine: "line-through",
						}}
					>
						{inOffer ? `$${grossPrice.toFixed(2)}` : ""}
					</Text>
				</Layout>
				<Layout style={{ backgroundColor: transparent, alignItems: "flex-start", flexDirection: "row" }}>
					<Text style={{ fontSize: 20 }}> x 📦</Text>
					<TouchableOpacity
						style={{ backgroundColor: "tomato", height: 20, width: 20, borderRadius: 100, justifyContent: "center", alignItems: "center" }}
						onPressIn={() => {
							setModalChildren(<ModalCant book={props.book} cantUpdater={props.cantUpdater} setModalVisibility={setModalVisibility} />);
							setModalVisibility(true);
						}}
					>
						<Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{props.cant}</Text>
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

const ItemRightPanel = (props: { book: ToBuyBook; cant: number }) => {
	const totalPrice = (props.book.getPriceCalcPerUnit() || NaN) * props.cant;

	return (
		<Layout style={[styles.common, styles.cardRight]}>
			<Text style={{ color: "yellowgreen", fontSize: 25, fontWeight: "bold", textAlign: "left" }} numberOfLines={1}>
				💲{totalPrice.toFixed(2)}
			</Text>
		</Layout>
	);
};

const ModalCant = (props: { book: ToBuyBook; cantUpdater: (cant: number) => void; setModalVisibility: (value: boolean) => void }) => {
	const [cant, setCant] = useState("0");
	const stock = cartViMo.getAvailableStock(props.book) || 0;
	return (
		<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
			<Layout style={{ flexDirection: "row", justifyContent: "center" }}>
				<Text style={{ textAlign: "right" }}>Cantidad de Artículos </Text>
				<Text style={{ width: "20%", textAlign: "center" }}>
					{Number(cant) !== 0 ? cant : "0"}/{stock?.toFixed(0)}
				</Text>
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
						const pattern = /^\d{0,2}$/;
						if (!Number.isNaN(Number(newCant)) && new RegExp(pattern).test(newCant)) setCant(newCant);
					}}
				/>
			</Layout>
			<Button
				status="danger"
				size="small"
				style={{ width: "50%" }}
				onPress={() => {
					if (stock) {
						if (Number.parseInt(cant) > stock) {
							setCant(stock.toFixed(0) || "0");
							return;
						}
						if (Number.parseInt(cant) > 0 && Number.parseInt(cant) <= stock) {
							cartViMo.updateCantToBuy(props.book, Number.parseInt(cant));
							props.cantUpdater(Number.parseInt(cant));
						}
						props.setModalVisibility(false);
					}
				}}
			>
				Confirmar
			</Button>
		</Layout>
	);
};
