import { makeStyles } from "@material-ui/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface CommonSelectProps {
	label: string;
	value: string;
	onChange: (e: any) => void;
	options: {
		label: string;
		value: string;
	}[];
	disabled?: boolean;
}

export default function CommonSelect({
	label,
	onChange,
	options,
	value,
	disabled,
}: CommonSelectProps) {
	const { container } = useStyles();

	return (
		<FormControl className={container}>
			<InputLabel id="demo-simple-select-label">{label}</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={value}
				label="Age"
				onChange={onChange}
				disabled={disabled}
			>
				{options.map((o) => (
					<MenuItem value={o.value}>{o.label}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

const useStyles = makeStyles({
	container: {
		width: "250px",
		marginLeft: "16px !important",
	},
});
