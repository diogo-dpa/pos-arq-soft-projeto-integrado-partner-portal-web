import { StatusOrderEnum } from "../components/EnhancedTable/EnhancedTableModels";

export const STATUS_OPTIONS = [
	{
		label: "Em Progresso",
		value: StatusOrderEnum.inProgress,
	},
	{
		label: "Cancelado",
		value: StatusOrderEnum.canceled,
	},
];
