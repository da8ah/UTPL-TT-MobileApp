import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabsNavScreen from "./MainTabsNavScreen";
import { RootStackParamList } from "./NavigationTypes";
import ProfileScreen from "./user/ProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				presentation: "modal",
				gestureEnabled: true,
				gestureDirection: "vertical",
				animationTypeForReplace: "pop",
			}}
		>
			<Stack.Group>
				<Stack.Screen name="Main" component={MainTabsNavScreen} />
			</Stack.Group>
			<Stack.Group>
				<Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, animation: "slide_from_left" }} />
				{/* <Stack.Screen name="Order" component={OrderScreen} /> */}
			</Stack.Group>
			<Stack.Group>
				{/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
				{/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
			</Stack.Group>
		</Stack.Navigator>
	</NavigationContainer>
);

export default RootNavigator;