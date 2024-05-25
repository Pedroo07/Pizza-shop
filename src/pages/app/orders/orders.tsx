import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table"
import { Helmet } from "react-helmet-async"
import { OrderTableRow } from "./order-table-row"
import { OrderTableFilter } from "./order-table-filters"
import { Pagination } from "@/components/pagination"
import { useQuery } from "@tanstack/react-query"
import { getOrders } from "@/api/get-orders"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

export const Orders = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const pageIndex = z.coerce.number().transform(page => page - 1).parse(searchParams.get('page') ?? 0)

    const { data: results } = useQuery({
        queryKey: ['orders', pageIndex],
        queryFn: () => getOrders({ pageIndex })
    })
    const handlePage = (pageIndex: number) => {
        setSearchParams((state) => {
            state.set('page',( pageIndex + 1).toString())
            return state
        })
        
    }
    return (
        <div>
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
                <div className="space-y-2.5">
                    <OrderTableFilter />
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
                                {results && results.orders.map(order => {
                                    return <OrderTableRow key={order.orderId} order={order} />
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    {results && (
                        <Pagination onPageChange={handlePage} pageIndex={results.meta.pageIndex} totalCount={results.meta.totalCount} perPage={results.meta.perPage} />
                    )}

                </div>
            </div>
        </div>
    )
}
