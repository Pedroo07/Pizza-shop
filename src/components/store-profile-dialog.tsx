import { z } from "zod"
import { Button } from "./ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getManagedRestaurant } from "@/api/get-managed-restaurant"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { uptadeProfile } from "@/api/uptade-profile"
import { toast } from "sonner"

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export const StoreProfileDialog = () => {

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { register, handleSubmit, formState: {isSubmitting} } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? ''
    }
  })

  const { mutateAsync: uptadeProfileFn } = useMutation({
    mutationFn: uptadeProfile,
  })

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await uptadeProfileFn({
        name: data.name,
        description: data.description
      })
      toast.success('Perfil atualizado com sucesso')
    }catch{
      toast.error('Falha ao atualizar perfil')
    }
    
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>
        <DialogDescription>Atualize as informações do seu estabelecimneto visíveis ao seu cliente</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">Nome</Label>
            <Input className="col-span-3" id="name" {...register('name')}></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">Descrição</Label>
            <Textarea className="col-span-3" id="description" {...register('description')}></Textarea>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
          <Button type="button" variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant={"sucess"} disabled={isSubmitting}>Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>

  )
}
