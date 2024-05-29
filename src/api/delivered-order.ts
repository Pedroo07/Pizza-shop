import { api } from "@/lib/axios"

export interface DeliveredOrdersParams {
    orderId: string
}

export async function deliveredOrder({ orderId }: DeliveredOrdersParams) {
    await api.patch(`/orders/${orderId}/deliver`)
}