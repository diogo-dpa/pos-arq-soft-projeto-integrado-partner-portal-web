import { Button, TextField } from "@mui/material";
import { DropzoneArea } from "mui-file-dropzone";
import { createStyles, makeStyles } from "@material-ui/styles";
import { useState, useMemo } from "react";
import CustomSnackbar from "../components/CustomSnackbar/CustomSnackbar";
import { useNavigate } from "react-router-dom";
import { uploadMultipleFiles } from "../services/storage/azure/azure.utils";
import { createOrder } from "../services/order.service";

export default function NewOrderPage() {
	const {
		container,
		title,
		previewChip,
		fillInSection,
		inputSection,
		input,
		dropzoneSection,
		descriptionDropzone,
		saveButton,
	} = useStyles();

	const navigate = useNavigate();

	const initialState = {
		responsible: "",
		files: [] as File[],
		size: 0,
	};

	const [form, setForm] = useState({
		...initialState,
	});
	const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

	const disableSave = !form.responsible.length || !form.files.length;

	const handleSaveNewOrder = async () => {
		try {
			const links = await uploadMultipleFiles(form.files);

			await createOrder({
				responsible: form.responsible,
				size: form.files.reduce((acm, cur) => acm + cur.size, 0),
				files: links,
			});

			setShowSuccessSnackbar(true);
			setForm({ ...initialState });
			setTimeout(() => {
				navigate("/");
			}, 1000);
		} catch (err: any) {
			console.warn(err.message);
		}
	};

	const totalSize = useMemo(() => {
		return Math.ceil(
			form.files.reduce((acm, cur) => {
				return acm + cur.size;
			}, 0) / 1024
		);
	}, [form.files]);

	return (
		<main>
			<section className={container}>
				<h1 className={title}>Novo pedido</h1>
				<div className={fillInSection}>
					<div className={inputSection}>
						<TextField
							value={form.responsible}
							onChange={(e) =>
								setForm((old) => ({
									...old,
									responsible: e.target.value,
								}))
							}
							label="Responsável"
							className={input}
						/>
					</div>
					<div className={dropzoneSection}>
						<DropzoneArea
							onChange={(e: File[]) => {
								setForm((old) => ({
									...old,
									files: e,
								}));
							}}
							fileObjects={form.files}
							useChipsForPreview
							acceptedFiles={[".csv", ".xlsx"]}
							maxFileSize={3000000}
							filesLimit={5}
							dropzoneText="Arraste os arquivos ou clique aqui. Permitido, no máximo, 5 arquivos"
							alertSnackbarProps={{
								message: "Ok",
							}}
							previewGridProps={{ container: { spacing: 1, direction: "row" } }}
							previewChipProps={{ classes: { root: previewChip } }}
						/>
						<span
							className={descriptionDropzone}
						>{`Formato dos arquivos permitidos: .csv e .xlsx. Tamanho total: ${totalSize} KB`}</span>
					</div>
				</div>
				<Button
					className={saveButton}
					variant="contained"
					disabled={disableSave}
					onClick={handleSaveNewOrder}
				>
					Salvar
				</Button>
			</section>
			<CustomSnackbar
				handleClose={() => setShowSuccessSnackbar(false)}
				message="Enviado com sucesso"
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
		descriptionDropzone: {
			fontWeight: 500,
			paddingTop: "16px",
		},
		saveButton: {
			alignSelf: "flex-end",
		},
	})
);
