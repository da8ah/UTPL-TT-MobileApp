import { Button, Card, Icon, Layout, Text } from "@ui-kitten/components";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		textAlign: "center",
	},
	// container: { flex: 1, paddingTop: 10, paddingHorizontal: 5 },
	buttonLayout: { backgroundColor: "transparent", flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	cardPropsRow: {
		flexDirection: "row",
	},
	cardKeys: {
		width: "40%",
		textTransform: "uppercase",
	},
	cardValues: {
		width: "60%",
	},
});

const ProfileScreen = () => {
	const cuenta = {
		user: "Tiber",
		nombre: "Danilo Ochoa Hidalgo",
		email: "tiber@email.com",
		móvil: "+593000000001",
		clave: "********",
	};

	const facturacion = {
		Destinatario: "Danilo Ochoa Hidalgo",
		CI: "1000000001",
		Provincia: "Loja",
		Ciudad: "Loja",
		"Número de casa": "000",
		Calles: "Principal y Secundaria",
	};

	const cuentaChildren: JSX.Element[] = Object.entries(cuenta).map(([key, value]) => {
		return (
			<Layout style={styles.cardPropsRow}>
				<Text style={styles.cardKeys}>{key}</Text>
				<Text style={styles.cardValues}>{value}</Text>
			</Layout>
		);
	});
	const facturacionChildren: JSX.Element[] = Object.entries(facturacion).map(([key, value]) => {
		return (
			<Layout style={styles.cardPropsRow}>
				<Text style={styles.cardKeys}>{key}</Text>
				<Text style={styles.cardValues}>{value}</Text>
			</Layout>
		);
	});

	const EditIcon = () => <Icon name="shopping-bag" fill="white" height="50" width="50" />;
	const SlashIcon = () => <Icon name="credit-card" fill="white" height="50" width="50" />;
	const SaveIcon = () => <Icon name="shopping-cart" fill="white" height="50" width="50" />;
	const CardHeader = (props: { title: string }) => <Text>{props.title}</Text>;

	return (
		<Layout style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", paddingTop: 40 }}>
			<Layout>
				<Icon name="person-outline" fill="black" height="100" width="100" />
				<Text style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}>{cuenta.user}</Text>
			</Layout>
			<Layout style={[styles.common, styles.buttonLayout]}>
				<Button size="tiny" accessoryLeft={EditIcon} style={{ borderRadius: 100 }} />
				<Button size="tiny" accessoryLeft={SlashIcon} style={{ borderRadius: 100 }} />
				<Button size="tiny" accessoryLeft={SaveIcon} style={{ borderRadius: 100 }} />
			</Layout>
			<Card header={<CardHeader title="Cuenta" />}>{cuentaChildren}</Card>
			<Card header={<CardHeader title="Facturación" />}>{facturacionChildren}</Card>
		</Layout>
	);
};

export default ProfileScreen;
