import { Button, TextField } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import CommonSelect from "../components/CommonSelect/CommonSelect";
import { STATUS_OPTIONS } from "../helpers/consts";
import {
	OrderTableData,
	StatusOrderEnum,
} from "../components/EnhancedTable/EnhancedTableModels";
import CustomSnackbar from "../components/CustomSnackbar/CustomSnackbar";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrderByBatchID, updateOrder } from "../services/order.service";
import { returnStatusFormatted } from "../helpers/methods";

export default function EditOrder() {
	const {
		container,
		title,
		fillInSection,
		inputSection,
		input,
		dropzoneSection,
		descriptionLinks,
		saveButton,
	} = useStyles();

	const [order, setOrder] = useState({} as OrderTableData);
	const [editedOrder, setEditedOrder] = useState({} as OrderTableData);

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

	const handleEditOrder = async () => {
		try {
			await updateOrder(editedOrder.batchId, {
				responsible: editedOrder.responsible,
				status: editedOrder.status,
			});
			setShowSuccessSnackbar(true);

			setTimeout(() => {
				navigate("/");
			}, 1000);
		} catch (err: any) {
			console.warn(err.message);
		}
	};

	useEffect(() => {
		async function getOrderByID(id: string) {
			const orderPromise = await getOrderByBatchID(id);
			setOrder(orderPromise);
			setEditedOrder(orderPromise);
		}

		const id = pathname.split("/").pop();

		if (id && isNaN(Number(id))) getOrderByID(id);
	}, [pathname]);

	const isInProgressStatusOrder = order.status === StatusOrderEnum.inProgress;

	return (
		<main>
			<section className={container}>
				<h1 className={title}>Editar pedido</h1>
				<div className={fillInSection}>
					<div className={inputSection}>
						<TextField
							value={editedOrder.batchId}
							onChange={(e) =>
								setEditedOrder((old) => ({
									...old,
									batchId: e.target.value,
								}))
							}
							label="Identificador Batch"
							disabled
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							value={editedOrder.responsible}
							onChange={(e) =>
								setEditedOrder((old) => ({
									...old,
									responsible: e.target.value,
								}))
							}
							label="Responsável"
							className={input}
							InputLabelProps={{
								shrink: true,
							}}
							disabled={!isInProgressStatusOrder}
						/>
						<CommonSelect
							label="Status"
							onChange={(e) =>
								setEditedOrder((old) => ({ ...old, status: e.target.value }))
							}
							value={returnStatusFormatted(editedOrder.status).value}
							options={STATUS_OPTIONS}
							disabled={!isInProgressStatusOrder}
						/>
					</div>
					<ul className={dropzoneSection}>
						<span className={descriptionLinks}>
							Os links dos arquivos enviados são disponibilizados abaixo para
							download.
						</span>
						{order.files?.map((fl: string) => (
							<li key={`link-${fl}`}>
								<a href={fl} download>
									{fl}
								</a>
							</li>
						))}
					</ul>
					{order.ticketURL && (
						<section>
							<h3>Visualize o boleto aqui</h3>
							<a href={order.ticketURL} target="_blank" rel="noreferrer">
								{order.ticketURL}
							</a>
						</section>
					)}
				</div>
				{isInProgressStatusOrder && (
					<Button
						className={saveButton}
						variant="contained"
						onClick={handleEditOrder}
					>
						Salvar alterações
					</Button>
				)}
			</section>
			<CustomSnackbar
				handleClose={() => setShowSuccessSnackbar(false)}
				message="Atualizado com sucesso"
				open={showSuccessSnackbar}
			/>
		</main>
	);
}

const useStyles = makeStyles((theme) =>
	createStyles({
		previewChip: {
			minWidth: 160,
			maxWidth: 210,
			backgroundColor: "green !important",
			color: "white !important",
			fontWeight: 600,
			"& svg": {
				color: "white !important",
			},
		},
		container: {
			maxWidth: "1280px",
			margin: "0 auto",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		title: {
			color: "#434343",
			fontSize: "40px",
			fontWeight: 700,
			alignSelf: "flex-start",
		},
		fillInSection: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
		},
		inputSection: {
			display: "flex",
			justifyContent: "flex-start",
			padding: "32px 0px",
		},
		input: {
			marginLeft: "16px !important",
		},
		dropzoneSection: {
			padding: "32px 0px",
		},
		descriptionLinks: {
			color: "#434343",
			fontSize: "28px",
			fontWeight: 500,
			marginBottom: "32px",
		},
		saveButton: {
			alignSelf: "flex-end",
		},
	})
);
