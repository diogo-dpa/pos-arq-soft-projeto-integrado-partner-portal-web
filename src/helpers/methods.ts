import { StatusOrderEnum } from "../components/EnhancedTable/EnhancedTableModels";
import { STATUS_OPTIONS } from "./consts";

export const returnStatusFormatted = (status: string) => {
	switch (status) {
		case StatusOrderEnum.inProgress:
			return {
				...STATUS_OPTIONS[0],
			};

		default:
			return {
				...STATUS_OPTIONS[1],
			};
	}
};
