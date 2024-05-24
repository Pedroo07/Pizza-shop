import { TableRow, TableCell } from "@/components/ui/table"
import { Search, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogTrigger, Dialog } from "@/components/ui/dialog"
import { OrderDetails } from "./order-details"

export const OrderTableRow = () => {
    return (
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <OrderDetails />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                73tdsa32be92
            </TableCell>
            <TableCell className="text-muted-foreground">
                há 15 minutos
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400"/>
                    <span className="font-medium text-muted-foreground">Pendente</span>
                </div>
            </TableCell>
            <TableCell className="font-medium">
                Pedroo Henrique de Sousa
            </TableCell>
            <TableCell className="font-medium">
                R$ 149,90
            </TableCell>
            <TableCell>
                <Button variant="outline" size="xs">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="ghost" size="xs">
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
            <TableCell></TableCell>
        </TableRow>
    )
}
