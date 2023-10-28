import {
	OrderTableData,
	StatusOrder,
	StatusOrderEnum,
} from "../components/EnhancedTable/EnhancedTableModels";

function createData(
	batchId: string,
	responsible: string,
	lastUpdate: string,
	size: number,
	status: StatusOrder,
	action: string
): Partial<OrderTableData> {
	return {
		batchId,
		responsible,
		lastUpdate,
		size,
		status,
		action,
	};
}

export const ordersData = [
	createData(
		"12233",
		"José",
		new Date(2023, 1, 1).toString(),
		67,
		StatusOrderEnum.success,
		""
	),
	createData(
		"12234",
		"João",
		new Date(2023, 2, 1).toString(),
		233,
		StatusOrderEnum.canceled,
		""
	),
	createData(
		"12235",
		"Diogo",
		new Date(2023, 3, 1).toString(),
		44545,
		StatusOrderEnum.inProgress,
		""
	),
	createData(
		"12236",
		"Miguel",
		new Date(2022, 1, 11).toString(),
		3233,
		StatusOrderEnum.failed,
		""
	),
	createData(
		"12237",
		"Monica",
		new Date(2023, 10, 19).toString(),
		889,
		StatusOrderEnum.success,
		""
	),
	createData(
		"1223",
		"Laura",
		new Date(2023, 8, 2).toString(),
		7980,
		StatusOrderEnum.success,
		""
	),
];
