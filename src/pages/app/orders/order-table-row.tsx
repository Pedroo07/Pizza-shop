import { TableRow, TableCell } from "@/components/ui/table"
import { Search, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogTrigger, Dialog } from "@/components/ui/dialog"
import { OrderDetails } from "./order-details"
import { OrderStatus } from "@/components/order-status"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { cancelOrder } from "@/api/cancel-orders"
import { queryClient } from "@/lib/react-query"
import { GetOrdersResponse } from "@/api/get-orders"

export interface OrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered"
        customerName: string;
        total: number;
    }
}
export const OrderTableRow = ({ order }: OrderTableRowProps) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const { mutateAsync: cancelOrderFn } = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_, { orderId }) {
            const orderListCache = queryClient.getQueriesData<GetOrdersResponse>({
                queryKey: ['orders']
            })
            orderListCache.forEach(([cacheKey, cacheData]) => {
                if (!cacheData){
                    return
                }
                queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                    ...cacheData,
                    orders: cacheData.orders.map((order) => {
                        if (order.orderId === orderId) {
                            return {...order, status: 'canceled'}
                        }
                        return order
                    })
                })
            })
        }
    })
    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen} >
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                {order.orderId}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {formatDistanceToNow(order.createdAt, { locale: ptBR, addSuffix: true })}
            </TableCell>
            <TableCell>
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">
                {order.customerName}
            </TableCell>
            <TableCell className="font-medium">
                {(order.total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </TableCell>
            <TableCell>
                <Button variant="outline" size="xs">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button disabled={!['processing', 'pending'].includes(order.status)} variant="ghost" size="xs" onClick={() => cancelOrderFn({ orderId: order.orderId })}>
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
            <TableCell></TableCell>
        </TableRow>
    )
}
