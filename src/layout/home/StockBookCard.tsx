import { Button, Icon, Input, Layout, Modal, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Image, ListRenderItem, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import StockBook from "../../core/entities/StockBook";
import cartViMo from "../../viewmodel/CartViMo";

const transparent = "transparent";
const styles = StyleSheet.create({
	common: { width: "100%", justifyContent: "center", alignItems: "center", textAlign: "center" },
	mainLayout: { backgroundColor: transparent, width: 125, height: 200, marginHorizontal: 2 },
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
	buttonLayout: { backgroundColor: transparent, height: 30 },
	button: { width: "70%" },
});

const StockBookCard: ListRenderItem<StockBook> = (info: ListRenderItemInfo<StockBook>) => (
	<Layout style={styles.mainLayout}>
		{/* Card */}
		<Layout style={styles.cardLayout}>
			<CardImage />
			<CardBody book={info.item} />
		</Layout>
		{/* Button */}
		<CardButton book={info.item} />
	</Layout>
);

export default StockBookCard;

const CardImage = () => (
	<Layout style={styles.cardImage}>
		<Image style={styles.image} source={require("../../../assets/bookstore.png")} />
	</Layout>
);

const CardBody = (props: { book: StockBook }) => {
	const price = props.book.getGrossPricePerUnit();

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
					<Text style={{ fontSize: 14, textAlignVertical: "top" }}>{props.book.getTitle()}</Text>
				</ScrollView>
				<Text style={{ width: "100%", height: 10, fontSize: 9, fontStyle: "italic" }} adjustsFontSizeToFit={true}>
					{props.book.getAuthor()}
				</Text>
			</Layout>
			<Layout style={[styles.common, styles.price]}>
				<Text style={{ color: "darkgreen", fontSize: 15 }} adjustsFontSizeToFit={true}>
					{`💲${price ? price?.toFixed(2) : "NaN"}`}
				</Text>
				<Text style={{ color: "red", fontSize: 13, fontStyle: "italic" }}>
					{props.book.isInOffer() ? `-${props.book.getDiscountPercentage()}%` : ""}
				</Text>
			</Layout>
		</Layout>
	);
};

const CardButton = (props: { book: StockBook }) => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalChildren, setModalChildren] = useState<JSX.Element>();
	const [cant, setCant] = useState("1");

	const ButtonIcon = () => <Icon name="plus-circle" fill="white" height="10" width="10" />;
	return (
		<Layout style={[styles.common, styles.buttonLayout]}>
			<Layout style={[styles.common, { backgroundColor: transparent, flexDirection: "row", justifyContent: "space-evenly" }]}>
				<Button
					style={styles.button}
					size="tiny"
					status="primary"
					accessoryRight={ButtonIcon}
					onPress={() => {
						cartViMo.addBookToCart(props.book, Number.parseInt(cant));
					}}
				>
					Agregar
				</Button>
				<TouchableOpacity
					style={{ backgroundColor: "royalblue", height: 20, width: 20, borderRadius: 100, justifyContent: "center", alignItems: "center" }}
					onPressIn={() => {
						setModalChildren(<ModalCant stock={props.book.getStock()} cantUpdater={setCant} setModalVisibility={setModalVisibility} />);
						setModalVisibility(true);
					}}
				>
					<Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{cant}</Text>
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

const ModalCant = (props: { stock?: number; cantUpdater: (cant: string) => void; setModalVisibility: (value: boolean) => void }) => {
	const [cant, setCant] = useState("0");

	return (
		<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
			<Layout style={{ flexDirection: "row", justifyContent: "center" }}>
				<Text style={{ textAlign: "right" }}>Cantidad de Artículos </Text>
				<Text style={{ width: "20%", textAlign: "center" }}>
					{Number(cant) !== 0 ? cant : "0"}/{props?.stock || 0}
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
				size="small"
				style={{ width: "50%" }}
				onPress={() => {
					if (props?.stock && Number.parseInt(cant) <= props?.stock) {
						props.cantUpdater(cant);
						props.setModalVisibility(false);
					} else setCant(props.stock?.toFixed(0) || "0");
				}}
			>
				Confirmar
			</Button>
		</Layout>
	);
};
