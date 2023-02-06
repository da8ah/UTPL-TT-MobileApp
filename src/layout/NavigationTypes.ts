import { NativeStackScreenProps } from "@react-navigation/native-stack";
import HandleProps from "@gorhom/bottom-sheet";

export type RootStackParamList = {
	Home: undefined;
	Books: undefined;
	Profile: undefined;
	Cart: React.FC<HandleProps>;
	Order: undefined;
	SignIn: undefined;
	SignUp: undefined;
};

// export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
