import { Helmet } from "react-helmet-async"
import { MonthRevenueCard } from "./month-revenue-card"
import { MonthOrdersAmounthCard } from "./month-orders-amounth-card"
import { DayOrdersAmouthCard } from "./day-orders-amouth-card"
import { MonthOrdersCanceledCard } from "./month-canceled-orders-amounth"

export const Dashboard = () => {
  return (
    <div>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
         <MonthRevenueCard/>
         <MonthOrdersAmounthCard/>
         <DayOrdersAmouthCard/>
         <MonthOrdersCanceledCard/>
        </div>
      </div>
    </div>
  )
}