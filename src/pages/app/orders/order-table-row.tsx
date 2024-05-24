import { TableRow, TableCell } from "@/components/ui/table"
import { Search, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export const OrderTableRow = () => {
    return (
        <TableRow>
            <TableCell>
                <Button variant="outline" size="xs">
                    <Search className="h-3 w-3" />
                    <span className="sr-only">Detalhes do pedido</span>
                </Button>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                73tdsa32be92
            </TableCell>
            <TableCell className="text-muted-foreground">
                há 15 minutos
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
