import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import clientViMo, { AuthObserver } from "../viewmodel/ClientViMo";
import SignInScreen from "./auth/SignInScreen";
import SignUpScreen from "./auth/SignUpScreen";
import MainTabsNavScreen from "./MainTabsNavScreen";
import { RootStackParamList } from "./NavigationTypes";
import ProfileScreen from "./user/ProfileScreen";

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
						<Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, animation: "slide_from_left" }} />
						{/* <Stack.Screen name="Order" component={OrderScreen} /> */}
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
