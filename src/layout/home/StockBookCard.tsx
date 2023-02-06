import { useNavigation } from "@react-navigation/native";
import { Icon, Input, Text } from "@ui-kitten/components";
import { Button } from "@ui-kitten/components";
import { Modal } from "@ui-kitten/components";
import { Layout } from "@ui-kitten/components";
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
	mainLayout: {
		backgroundColor: "black",
		width: 120,
		height: 200,
		marginHorizontal: 2,
	},
	cardLayout: {
		backgroundColor: "transparent",
		height: 155,
		paddingVertical: 2,
		borderRadius: 7,
	},
	cardHeader: {
		backgroundColor: "red",
		width: "100%",
		height: 15,
		paddingHorizontal: 3,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardBody: {
		backgroundColor: "transparent",
		width: "100%",
		height: 100,
		alignItems: "center",
	},
	cardFooter: {
		backgroundColor: "transparent",
		width: "100%",
		height: 40,
		paddingHorizontal: 2,
	},
	// icons: { width: "20%", justifyContent: "space-evenly" },
	imageLayout: { width: "80%", height: 100, alignItems: "center" },
	image: {
		maxWidth: "80%",
		height: 70,
		resizeMode: "contain",
	},

	// bodyProperties: {
	// 	backgroundColor: transparent,
	// 	paddingHorizontal: 1,
	// 	flexDirection: "row",
	// 	justifyContent: "space-between",
	// },
	buttonLayout: {
		backgroundColor: "darkgrey",
		height: 45,
	},
	button: { width: "70%" },
});

const StockBookCard: ListRenderItem<StockBook> = (info: ListRenderItemInfo<StockBook>) => {
	return (
		<Layout style={styles.mainLayout}>
			{/* Card */}
			<Layout style={styles.cardLayout}>
				<StockBookCardHeader />
				<StockBookCardBody />
				<StockBookCardFooter />
			</Layout>
			{/* Button */}
			<StockBookCardButton itemIndex={info.index} />
		</Layout>
	);
};

export default StockBookCard;

const StockBookCardHeader = () => {
	const props = { isbn: "9876543212345", price: 25 };

	return (
		<Layout style={[styles.common, styles.cardHeader]}>
			<Text style={{ fontSize: 10 }} adjustsFontSizeToFit={true}>
				{props.isbn}
			</Text>
			<Text style={{ fontSize: 12.5 }} adjustsFontSizeToFit={true}>
				{props.price ? props.price.toFixed(2) : "NaN"} 💲
			</Text>
		</Layout>
	);
};

const StockBookCardBody = () => {
	const props = { isInOffer: true, discountPercentage: 10 };

	return (
		<Layout style={styles.cardBody}>
			<Layout style={styles.imageLayout}>
				<Text style={{ width: "100%", position: "absolute", zIndex: 1, color: "red", fontStyle: "italic", textAlign: "right" }}>
					{props.isInOffer ? `-${props.discountPercentage}%` : ""}
				</Text>
				<Image style={styles.image} source={require("../../../assets/bookstore.png")} />
			</Layout>
		</Layout>
	);
};

const StockBookCardFooter = () => {
	const props = { title: "Historia de TOTORO", author: "HIRR SEBASTIAN" };

	return (
		<Layout style={styles.cardFooter}>
			<ScrollView
				horizontal
				alwaysBounceHorizontal
				style={{ height: 20 }}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				fadingEdgeLength={50}
			>
				<Text style={{ fontStyle: "italic" }}>{props.title}</Text>
			</ScrollView>
			<ScrollView
				horizontal
				alwaysBounceHorizontal
				style={{ height: 20 }}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				fadingEdgeLength={50}
			>
				<Text style={{ fontSize: 11 }} adjustsFontSizeToFit={true}>
					{props.author}
				</Text>
			</ScrollView>
		</Layout>
	);
};

const ButtonIcon = () => <Icon name="plus-circle" fill="white" height="10" width="10" />;
const StockBookCardButton = (props: { itemIndex: number }) => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalChildren, setModalChildren] = useState<JSX.Element>();
	const [cant, setCant] = useState("0");

	return (
		<Layout style={[styles.common, styles.buttonLayout]}>
			<Layout style={[styles.common, { backgroundColor: "red", flexDirection: "row", justifyContent: "space-evenly" }]}>
				<Button style={styles.button} size="tiny" status="info" accessoryRight={ButtonIcon} onPress={() => {}}>
					Agregar
				</Button>
				<TouchableOpacity
					style={{ backgroundColor: "white", borderRadius: 100, paddingHorizontal: 10 }}
					onPressIn={() => {
						setModalChildren(<ModalCant cantUpdater={setCant} />);
						setModalVisibility(true);
					}}
				>
					<Text>1</Text>
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
