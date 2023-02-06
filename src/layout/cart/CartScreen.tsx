import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Layout, List, Text } from "@ui-kitten/components";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import StockBook from "../../core/entities/StockBook";
import ToBuyBook from "../../core/entities/ToBuyBook";
import { RootStackParamList } from "../NavigationTypes";
import CartItem from "./CartItem";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		backgroundColor: "grey",
	},
	cartHeader: { flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 },
	cartStatus: { flex: 1 },
	cartBooks: { flex: 8 },
	button: {},
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

const CartScreen = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();

	// hooks
	const sheetRef = useRef<BottomSheet>(null);

	const handleClosePress = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	const CloseIcon = () => <Icon name="close" fill="white" height="15" width="15" />;
	const fecha = new Date().toLocaleDateString();

	// render
	return (
		<Layout style={styles.container}>
			<BottomSheet ref={sheetRef} index={0} snapPoints={["90%"]}>
				<BottomSheetView style={{ backgroundColor: "blue", flex: 1 }}>
					<Layout style={styles.cartHeader}>
						<Text category="h1" status="basic">
							Mi Carrito
						</Text>
						<Button
							status="danger"
							accessoryLeft={CloseIcon}
							style={{ width: 30, height: 30, borderRadius: 100, paddingHorizontal: 15 }}
							onPress={() => {
								handleClosePress();
								navigation.navigate("Home");
							}}
						/>
					</Layout>
					<Layout style={styles.cartStatus}>
						<Text>{fecha}</Text>
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
					<Button status="danger" style={styles.button}>
						Procesar
					</Button>
				</BottomSheetView>
			</BottomSheet>
		</Layout>
	);
};

export default CartScreen;
