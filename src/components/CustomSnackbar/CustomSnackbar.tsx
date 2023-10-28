import { Alert, Snackbar } from "@mui/material";

interface CustomSnackbarProps {
	open: boolean;
	handleClose: () => void;
	message: string;
}

export default function CustomSnackbar({
	handleClose,
	open,
	message,
}: CustomSnackbarProps) {
	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
		>
			<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
}
