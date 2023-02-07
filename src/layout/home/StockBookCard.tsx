import { Button, Icon, Input, Layout, Modal, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Image, ListRenderItem, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import StockBook from "../../core/entities/StockBook";

const transparent = "transparent";
const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	mainLayout: { backgroundColor: transparent, width: 120, height: 200, marginHorizontal: 2 },
	cardLayout: { backgroundColor: transparent, height: 170, borderRadius: 7 },
	cardImage: { backgroundColor: "gainsboro", height: 120, justifyContent: "space-around", alignItems: "center", borderRadius: 10 },
	cardBody: { backgroundColor: transparent, height: 50, paddingHorizontal: 2 },
	image: { height: 120, resizeMode: "contain" },
	price: {
		backgroundColor: transparent,
		width: "100%",
		height: 20,
		paddingHorizontal: 3,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	// icons: { width: "20%", justifyContent: "space-evenly" },

	// bodyProperties: {
	// 	backgroundColor: transparent,
	// 	paddingHorizontal: 1,
	// 	flexDirection: "row",
	// 	justifyContent: "space-between",
	// },
	buttonLayout: { backgroundColor: transparent, height: 30 },
	button: { width: "70%" },
});

const StockBookCard: ListRenderItem<StockBook> = (info: ListRenderItemInfo<StockBook>) => (
	<Layout style={styles.mainLayout}>
		{/* Card */}
		<Layout style={styles.cardLayout}>
			<CardImage />
			<CardBody />
		</Layout>
		{/* Button */}
		<CardButton itemIndex={info.index} />
	</Layout>
);

export default StockBookCard;

const CardImage = () => (
	<Layout style={styles.cardImage}>
		<Image style={styles.image} source={require("../../../assets/bookstore.png")} />
	</Layout>
);

const CardBody = () => {
	const props = { title: "Historia de TOTORO", author: "HIRR SEBASTIAN", price: 25, isInOffer: true, discountPercentage: 10 };
	return (
		<Layout style={styles.cardBody}>
			<Layout style={{ backgroundColor: transparent, paddingVertical: 2 }}>
				<ScrollView
					horizontal
					alwaysBounceHorizontal
					style={{ height: 15 }}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					fadingEdgeLength={50}
				>
					<Text style={{ fontSize: 14, textAlignVertical: "top" }}>{props.title}</Text>
				</ScrollView>
				<Text style={{ width: "100%", height: 10, fontSize: 9, fontStyle: "italic" }} adjustsFontSizeToFit={true}>
					{props.author}
				</Text>
			</Layout>
			<Layout style={[styles.common, styles.price]}>
				<Text style={{ color: "darkgreen", fontSize: 15 }} adjustsFontSizeToFit={true}>
					{`💲${props.price ? props.price.toFixed(2) : "NaN"}`}
				</Text>
				<Text style={{ color: "red", fontSize: 13, fontStyle: "italic" }}>{props.isInOffer ? `-${props.discountPercentage}%` : ""}</Text>
			</Layout>
		</Layout>
	);
};

const CardButton = (props: { itemIndex: number }) => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalChildren, setModalChildren] = useState<JSX.Element>();
	const [cant, setCant] = useState("0");

	const ButtonIcon = () => <Icon name="plus-circle" fill="white" height="10" width="10" />;
	return (
		<Layout style={[styles.common, styles.buttonLayout]}>
			<Layout style={[styles.common, { backgroundColor: transparent, flexDirection: "row", justifyContent: "space-evenly" }]}>
				<Button style={styles.button} size="tiny" status="primary" accessoryRight={ButtonIcon} onPress={() => {}}>
					Agregar
				</Button>
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
