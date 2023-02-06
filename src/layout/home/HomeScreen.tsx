import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Text } from "@ui-kitten/components";
import { Layout } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet, Animated } from "react-native";
import { RootStackParamList } from "../NavigationTypes";
import Bookshelf from "./Bookshelf";

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
		flex: 3,
		justifyContent: "flex-end",
		paddingVertical: 20,
		color: "white",
		backgroundColor: "tomato",
	},
	body: {
		backgroundColor: "blue",
		flex: 20,
		justifyContent: "center",
		alignContent: "center",
		paddingBottom: 20,
	},
	shelf: {
		flex: 1,
	},
});

const HomeScreen = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();
	const [startLocationY, setStartLocationY] = useState(0);

	return (
		<Layout
			style={{ flex: 1 }}
			onStartShouldSetResponder={() => true}
			onResponderStart={(e) => {
				setStartLocationY(e.nativeEvent.locationY);
			}}
			onResponderRelease={(e) => {
				if (startLocationY <= 720 && startLocationY >= 700 && e.nativeEvent.locationY <= 200 && e.nativeEvent.locationY >= 0)
					navigation.navigate("Books");
			}}
		>
			<HomeHeader />
			<HomeBody />
		</Layout>
	);
};
export default HomeScreen;

const UserIcon = () => <Icon name="person" fill="white" height="30" width="30" />;
const CartIcon = () => <Icon name="shopping-cart" fill="white" height="30" width="30" />;
const HomeHeader = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();

	return (
		<Layout style={[styles.common, styles.header]}>
			<Text category='h5' style={{ color: "white", fontFamily: "serif" }}>
				¡Bienvenidos!
			</Text>

			<Layout style={{ backgroundColor: "transparent", width: "100%", flexDirection: "row", justifyContent: "space-evenly" }}>
				<Button size="small" status="info" accessoryLeft={UserIcon} style={{ borderRadius: 100 }} onPress={() => navigation.navigate("Profile")} />
				<Text category="h1" status="basic" style={{ fontStyle: "italic" }}>
					BOOKSTORE
				</Text>
				<Button size="small" status="info" accessoryLeft={CartIcon} style={{ borderRadius: 100 }} onPress={() => navigation.navigate("Cart")} />
			</Layout>
		</Layout>
	);
};

const HomeBody = () => (
	<Layout style={styles.body}>
		<Bookshelf />
		<Bookshelf />
		<Bookshelf />
	</Layout>
);
