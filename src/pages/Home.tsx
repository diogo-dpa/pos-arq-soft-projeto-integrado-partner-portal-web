import { makeStyles } from "@material-ui/styles";
import EnhancedTable from "../components/EnhancedTable/EnhancedTable";
import { Link } from "react-router-dom";
import { OrderTableData } from "../components/EnhancedTable/EnhancedTableModels";
import { useEffect, useState } from "react";
import { getAllOrders } from "../services/order.service";
import { Suspense } from "react";
import { Button, CircularProgress } from "@mui/material";

export default function Home() {
	const { container, section, header, title, noDataMessage, tableSection } =
		useStyles();

	const [order, setOrders] = useState([] as OrderTableData[]);

	useEffect(() => {
		async function getOrders() {
			const orderPromise = await getAllOrders();
			setOrders(orderPromise);
		}
		getOrders();
	}, []);

	return (
		<main className={container}>
			<section className={section}>
				<div className={header}>
					<h1 className={title}>Pedidos realizados</h1>
					<Link to="neworder">
						<Button variant="contained">Novo pedido</Button>
					</Link>
				</div>
				<Suspense fallback={<CircularProgress />}>
					<div className={tableSection}>
						{order.length ? (
							<EnhancedTable rows={order} />
						) : (
							<h2 className={noDataMessage}>Sem dados no momento</h2>
						)}
					</div>
				</Suspense>
			</section>
		</main>
	);
}

const useStyles = makeStyles({
	container: {
		width: "100%",
		height: "100%",
	},
	section: {
		height: "100%",
		maxWidth: "1280px",
		margin: "0 auto",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	header: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "32px 0px",
	},
	title: {
		color: "#434343",
		fontSize: "40px",
		fontWeight: 700,
		alignSelf: "flex-start",
	},
	noDataMessage: {
		color: "#434343",
		fontSize: "28px",
		fontWeight: 500,
		alignSelf: "center",
	},
	tableSection: {
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
});
