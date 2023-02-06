import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import MainNavigator from "./src/layout/MainNavigator";

export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
			<SafeAreaView style={{ flex: 1 }}>
				<MainNavigator />
				<StatusBar style="auto" />
			</SafeAreaView>
		</ApplicationProvider>
	</>
);
