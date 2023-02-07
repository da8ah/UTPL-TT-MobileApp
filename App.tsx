import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import RootNavigator from "./src/layout/RootNavigator";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
			<SafeAreaView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<RootNavigator />
				</BottomSheetModalProvider>
				<StatusBar style="auto" />
			</SafeAreaView>
		</ApplicationProvider>
	</>
);
