import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table"
import { Helmet } from "react-helmet-async"
import { OrderTableRow } from "./order-table-row"
import { OrderTableFilter } from "./order-table-filters"

export const Orders = () => {
    return (
        <div>
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
            </div>
            <div className="space-y-2.5">
                <OrderTableFilter/>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow >
                                <TableHead className="w-[64px]"></TableHead>
                                <TableHead className="w-[140px]">Identificador</TableHead>
                                <TableHead className="w-[180px]">Realizado há</TableHead>
                                <TableHead className="w-[140px]">Status</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="w-[140px]">Total do pedido</TableHead>
                                <TableHead className="w-[164px]"></TableHead>
                                <TableHead className="w-[132px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map(() => {
                                return (
                                    <OrderTableRow/>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
