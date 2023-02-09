import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { BottomNavigation, BottomNavigationTab, Button, Icon, Layout, Text } from "@ui-kitten/components";
import React, { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import clientViMo from "../viewmodel/ClientViMo";
import CartScreen from "./cart/CartScreen";
import BooksScreen from "./home/BooksScreen";
import HomeScreen from "./home/HomeScreen";
import { RootStackParamList } from "./NavigationTypes";

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	header: {
		backgroundColor: "black",
		color: "white",
		flex: 3,
		justifyContent: "center",
		paddingVertical: 20,
	},
	body: {
		flex: 20,
		justifyContent: "center",
		alignContent: "center",
	},
	shelf: {
		flex: 1,
	},

	button: {},
});

const MainTabsNavScreen = () => {
	// BottomSheet
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleCloseModalPress = useCallback(() => {
		bottomSheetModalRef.current?.close();
	}, []);

	const CloseIcon = () => <Icon name="close" fill="white" height="15" width="15" />;
	const CloseBottomSheetButton = () => (
		<Button
			status="warning"
			accessoryLeft={CloseIcon}
			style={{ width: 30, height: 30, borderRadius: 100, paddingHorizontal: 15 }}
			onPress={() => {
				handleCloseModalPress();
			}}
		/>
	);

	return (
		<Layout style={{ flex: 1, paddingTop: 30 }}>
			<Header presentBottomSheet={handlePresentModalPress} closeBottomSheet={handleCloseModalPress} />
			<Body />
			<BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={["80%"]}>
				<CartScreen closeButton={<CloseBottomSheetButton />} />
			</BottomSheetModal>
		</Layout>
	);
};
export default MainTabsNavScreen;

const Header = (props: { presentBottomSheet: () => void; closeBottomSheet: () => void }) => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();

	const UserIcon = () => <Icon name="person" fill="white" height="30" width="30" />;
	const CartIcon = () => <Icon name="shopping-cart" fill="white" height="30" width="30" />;
	return (
		<Layout style={[styles.common, styles.header]} onStartShouldSetResponder={() => true} onResponderStart={() => props.closeBottomSheet()}>
			<Text category='h5' style={{ color: "white", fontFamily: "serif" }}>
				¡Bienvenidos!
			</Text>
			<Layout style={{ backgroundColor: "transparent", width: "100%", flexDirection: "row", justifyContent: "space-evenly" }}>
				<Button
					size="small"
					status="info"
					accessoryLeft={UserIcon}
					style={{ borderRadius: 100 }}
					onPress={() => {
						props.closeBottomSheet();
						navigation.navigate(clientViMo.isAuth() ? "Profile" : "SignIn");
					}}
				/>
				<Text category="h1" status="danger" style={{ fontStyle: "italic" }}>
					BOOKSTORE
				</Text>
				<Button size="small" status="danger" accessoryLeft={CartIcon} style={{ borderRadius: 100 }} onPress={() => props.presentBottomSheet()} />
			</Layout>
		</Layout>
	);
};

const Body = () => {
	const Tab = createBottomTabNavigator();

	return (
		<Layout style={styles.body}>
			<Tab.Navigator initialRouteName="Home" tabBar={(props) => <UiKittenBottomTabNav {...props} />} screenOptions={{ headerShown: false }}>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Books" component={BooksScreen} />
			</Tab.Navigator>
		</Layout>
	);
};

const UiKittenBottomTabNav = ({ navigation, state }: BottomTabBarProps) => {
	const HomeIcon = () => <Icon name="sun" fill="black" height="30" width="30" />;
	const HomeTitle = () => <Text style={{ color: "black", fontSize: 10 }}>Relevantes</Text>;
	const BooksIcon = () => <Icon name="book-open" fill="black" height="30" width="30" />;
	const BooksTitle = () => <Text style={{ color: "black", fontSize: 10 }}>Biblioteca</Text>;
	return (
		<BottomNavigation
			style={{ height: "7%" }}
			indicatorStyle={{ backgroundColor: "black", borderWidth: 0.1 }}
			selectedIndex={state.index}
			onSelect={(index) => navigation.navigate(state.routeNames[index])}
		>
			<BottomNavigationTab
				icon={<HomeIcon />}
				title={HomeTitle}
				onPressIn={() => {
					navigation.navigate("Home");
				}}
			/>
			<BottomNavigationTab
				icon={<BooksIcon />}
				title={BooksTitle}
				onPressIn={() => {
					navigation.navigate("Books");
				}}
			/>
		</BottomNavigation>
	);
};
