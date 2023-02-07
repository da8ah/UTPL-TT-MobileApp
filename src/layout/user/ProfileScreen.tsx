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
	cardPropsRow: { backgroundColor: "transparent", flexDirection: "row" },
	cardKeys: {
		width: "40%",
		fontSize: 10,
		textTransform: "uppercase",
	},
	cardValues: {
		width: "60%",
	},
});

const ProfileScreen = () => {
	const cuenta = {
		usuario: "Tiber",
		nombre: "Danilo Ochoa Hidalgo",
		email: "tiber@email.com",
		móvil: "+593000000001",
		clave: "********",
	};
	const cuentaChildren: JSX.Element[] = Object.entries(cuenta).map(([key, value], index) => (
		<Layout key={`clientProp${index}`} style={styles.cardPropsRow}>
			<Text style={styles.cardKeys} adjustsFontSizeToFit>
				{key}
			</Text>
			<Text style={styles.cardValues}>{value}</Text>
		</Layout>
	));

	const facturacion = {
		Destinatario: "Danilo Ochoa Hidalgo",
		CI: "1000000001",
		Provincia: "Loja",
		Ciudad: "Loja",
		"Número de casa": "000",
		Calles: "Principal y Secundaria",
	};
	const facturacionChildren: JSX.Element[] = Object.entries(facturacion).map(([key, value], index) => (
		<Layout key={`billingInfoProp${index}`} style={styles.cardPropsRow}>
			<Text style={styles.cardKeys} adjustsFontSizeToFit>
				{key}
			</Text>
			<Text style={styles.cardValues}>{value}</Text>
		</Layout>
	));

	const CardIcon = () => <Icon name="credit-card" fill="darkgrey" height="50" width="50" />;
	const BagIcon = () => <Icon name="shopping-bag" fill="darkgrey" height="50" width="50" />;
	const CardHeader = (props: { title: string }) => (
		<Text style={{ backgroundColor: "black", color: "white", padding: 2, paddingLeft: 20 }}>{props.title}</Text>
	);

	return (
		<Layout style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", paddingTop: 35 }}>
			<Layout>
				<Icon name="person-outline" fill="black" height="100" width="100" />
				<Text style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}>
					{cuenta.usuario}
				</Text>
			</Layout>
			<Layout style={[styles.common, styles.buttonLayout]}>
				<Button size="tiny" status="basic" accessoryLeft={CardIcon} style={{ borderRadius: 100 }} />
				<Button size="tiny" status="basic" accessoryLeft={BagIcon} style={{ borderRadius: 100 }} />
			</Layout>
			<Card key="client" header={<CardHeader title="Cuenta" />} style={{ width: "80%", borderRadius: 20 }}>
				{cuentaChildren}
			</Card>
			<Card key="billingInfo" header={<CardHeader title="Facturación" />} style={{ width: "80%", borderRadius: 20 }}>
				{facturacionChildren}
			</Card>
		</Layout>
	);
};

export default ProfileScreen;
