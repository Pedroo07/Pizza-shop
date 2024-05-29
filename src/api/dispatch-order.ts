import { api } from "@/lib/axios"

export interface DispatchOrdersParams {
    orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrdersParams) {
    await api.patch(`/orders/${orderId}/dispatch`)
}