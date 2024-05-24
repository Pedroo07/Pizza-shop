import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, LineChart, YAxis, XAxis, Line, CartesianGrid } from 'recharts'
import colors from "tailwindcss/colors"
export const RevenueChart = () => {
    const data = [
        { date: '10/05', revenue: 250 },
        { date: '11/05', revenue: 600 },
        { date: '12/05', revenue: 180 },
        { date: '13/05', revenue: 730 },
        { date: '14/05', revenue: 890 },
        { date: '15/05', revenue: 1300 },
        { date: '16/05', revenue: 420 },
    ]
    return (
        <Card className='col-span-6'>
            <CardHeader className='flex-row items-center justify-between pb-8'>
                <div className='space-y-1'>
                    <CardTitle className='text-base font-medium'>
                        Receita Período
                    </CardTitle>
                    <CardDescription>Receita diária no período</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240} >
                    <LineChart data={data} style={{ fontSize: 12 }}>
                        <XAxis axisLine={false} tickLine={false} dataKey="date" dy={16} />
                        <YAxis
                            stroke='#888'
                            axisLine={false}
                            tickLine={false}
                            width={80}
                            tickFormatter={(value: number) =>
                                value.toLocaleString('pt-Br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })
                            }
                        />
                        <CartesianGrid vertical={false} className='stroke-muted' />
                        <Line type='linear' strokeWidth={2} dataKey="revenue" stroke={colors.violet[500]} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
