import { OrderModel } from "../../services/order.service";

export type Order = "asc" | "desc";

export interface OrderTableData extends OrderModel {
	action?: string;
}

export interface HeadCell {
	disablePadding: boolean;
	id: keyof OrderTableData;
	label: string;
	numeric: boolean;
}

export type StatusOrder = "in-progress" | "success" | "failed" | "canceled";

export enum StatusOrderEnum {
	inProgress = "in-progress",
	success = "success",
	failed = "failed",
	canceled = "canceled",
}
