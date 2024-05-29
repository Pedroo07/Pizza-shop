import { api } from "@/lib/axios"

export interface ApproveOrdersParams {
    orderId: string
}

export async function approveOrder({ orderId }: ApproveOrdersParams) {
    await api.patch(`/orders/${orderId}/approve`)
}