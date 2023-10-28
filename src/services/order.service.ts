import { StatusOrder } from "../components/EnhancedTable/EnhancedTableModels";
import { api } from "./base.service";

const orderBasePath = "orders";

export interface OrderModel {
	batchId: string;
	responsible: string;
	status: StatusOrder;
	size: number;
	lastUpdate: string;
	files?: string[];
	ticketURL?: string;
}

export const getAllOrders = async (): Promise<OrderModel[]> => {
	const orders = await api.get(orderBasePath);

	if (!orders) return [];

	return orders.data;
};

export const getOrderByBatchID = async (
	batchId: string
): Promise<OrderModel> => {
	const order = await api.get(`${orderBasePath}/${batchId}`);

	if (!order) return {} as OrderModel;

	return order.data[0];
};

interface CreateOrder {
	responsible: string;
	size: number;
	files: string[];
}

export const createOrder = (newOrder: CreateOrder) => {
	return api.post(orderBasePath, {
		...newOrder,
	});
};

interface UpdateOrder {
	responsible?: string;
	status?: StatusOrder;
}
export const updateOrder = (batchId: string, updatedOrder: UpdateOrder) => {
	return api.put(`${orderBasePath}/${batchId}`, {
		...updatedOrder,
	});
};
