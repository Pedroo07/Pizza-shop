import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-amount"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { MetricCardSkeleton } from "./metric-card-skeleton"

export const MonthOrdersCanceledCard = () => {
    const { data: monthCanceledOrdersAmount } = useQuery({
        queryFn: getMonthCanceledOrdersAmount,
        queryKey: ['metrics', 'month-canceled-orders-amount']
    })
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">Cancelamentos (mês)</CardTitle>
                <X className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                {monthCanceledOrdersAmount ? (
                    <>
                        <span className="text-2xl font-bold tracking-tight">{monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}</span>
                        <p className="text-xs text-muted-foreground">
                            {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400">{monthCanceledOrdersAmount.diffFromLastMonth}%</span>{''} Em relação ao mês passado
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">+{monthCanceledOrdersAmount.diffFromLastMonth}%</span>{''} Em relação ao mês passado
                                </>
                            )}
                        </p>
                    </>
                ) : <MetricCardSkeleton />}
            </CardContent>
        </Card>
    )
}