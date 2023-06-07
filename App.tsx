import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import RootNavigator from "./src/layout/RootNavigator";

export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
			<SafeAreaView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<RootNavigator />
					<StatusBar style="auto" />
				</BottomSheetModalProvider>
			</SafeAreaView>
		</ApplicationProvider>
	</>
);
