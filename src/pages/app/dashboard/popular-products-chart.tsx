import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import colors from "tailwindcss/colors"
export const PopularChart = () => {
    const data = [
        { name: 'Mussarela', amount: 34 },
        { name: 'A moda', amount: 65 },
        { name: 'Frango', amount: 18 },
        { name: 'Pepperoni', amount: 9 },
    ]
    const COLORS = [
        colors.violet[500],
        colors.rose[500],
        colors.amber[500],
        colors.sky[500],
        colors.emerald[500]
    ]
    return (
        <Card className='col-span-3'>
            <CardHeader className='flex-row items-center justify-between pb-8'>
                <div className='space-y-1'>
                    <CardTitle className='text-base font-medium'>
                        Produtos Populares
                    </CardTitle>
                    <CardDescription>Produtos mais vendidos</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240} >
                    <PieChart style={{ fontSize: 12 }}>
                        <Pie data={data}
                            dataKey="amount"
                            nameKey='name'
                            cx='50%'
                            cy='50%'
                            outerRadius={86}
                            innerRadius={64}
                            strokeWidth={8}
                            labelLine={false}
                            label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                index,
                            }) => {
                                const RADIAN = Math.PI / 180
                                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        className="fill-muted-foreground text-xs"
                                        textAnchor={x > cx ? 'start' : 'end'}
                                        dominantBaseline="central"
                                    >
                                        {data[index].name.length > 12
                                            ? data[index].name.substring(0, 12).concat('...')
                                            : data[index].name}{' '}
                                        ({value})
                                    </text>
                                )
                            }}
                        >
                            {data.map((_, index) => {
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index]}
                                        className='stroke-background hover:opacity-80'
                                    />
                                )
                            })}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
