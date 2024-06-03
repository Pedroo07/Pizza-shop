import { getPopularProducts } from '@/api/get-popular-products'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import colors from "tailwindcss/colors"

const data = [
    { product: 'Mussarela', amount: 34 },
    { product: 'A moda', amount: 65 },
    { product: 'Frango', amount: 18 },
    { product: 'Pepperoni', amount: 9 },
]
const COLORS = [
    colors.violet[500],
    colors.rose[500],
    colors.amber[500],
    colors.sky[500],
    colors.emerald[500]
]
export const PopularChart = () => {
    const { data: popularProducts } = useQuery({
        queryKey: ['metrics', 'popular-products'],
        queryFn: getPopularProducts
    })

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
                {popularProducts && (
                    <ResponsiveContainer width="100%" height={240} >
                        <PieChart style={{ fontSize: 12 }}>
                            <Pie data={popularProducts}
                                dataKey="amount"
                                nameKey='product'
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
                                            {popularProducts[index].product.length > 12
                                                ? popularProducts[index].product.substring(0, 12).concat('...')
                                                : popularProducts[index].product}{' '}
                                            ({value})
                                        </text>
                                    )
                                }}
                            >
                                {popularProducts.map((_, index) => {
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
                )}
            </CardContent>
        </Card>
    )
}
