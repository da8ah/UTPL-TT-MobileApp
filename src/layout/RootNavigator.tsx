import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import clientViMo, { AuthObserver } from "../viewmodel/ClientViMo";
import SignInScreen from "./auth/SignInScreen";
import SignUpScreen from "./auth/SignUpScreen";
import OrderScreen from "./cart/OrderScreen";
import MainTabsNavScreen from "./MainTabsNavScreen";
import { RootStackParamList } from "./NavigationTypes";
import ProfileScreen from "./user/ProfileScreen";
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
const RootNavigator = () => {
	const [isAuth, setAuth] = useState<boolean>(false);
	const [loginAttempts, setLoginAttempts] = useState(0);

	const changeAuthState: AuthObserver = (authState: boolean) => {
		setAuth(authState);
	};

	const tryLogin = async () => {
		if (loginAttempts < 2) await clientViMo.login();
	};

	useEffect(() => {
		clientViMo.attachAuth(changeAuthState);
		setLoginAttempts(1);
		tryLogin();
		setTimeout(async () => {
			if (!isAuth) tryLogin();
			setLoginAttempts(2);
		}, 2000);
		return () => clientViMo.detachAuth();
	}, []);

	const Stack = createNativeStackNavigator<RootStackParamList>();
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Group>
					<Stack.Screen name="Main" component={MainTabsNavScreen} />
				</Stack.Group>
				{isAuth ? (
					<Stack.Group>
						<Stack.Screen
							name="Profile"
							component={ProfileScreen}
							options={{ headerShown: true, headerTitle: "Perfil", animation: "slide_from_left" }}
						/>
						<Stack.Screen name="Order" component={OrderScreen} options={{ animation: "slide_from_right" }} />
					</Stack.Group>
				) : (
					<Stack.Group>
						<Stack.Screen name="SignIn" component={SignInScreen} />
						<Stack.Screen name="SignUp" component={SignUpScreen} options={{ animation: "slide_from_right" }} />
					</Stack.Group>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
