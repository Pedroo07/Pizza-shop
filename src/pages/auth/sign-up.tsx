import { signUp } from "@/api/resgister"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'sonner'
import z from "zod"

const signUpForm = z.object({
  restaurantName: z.string(),
  ManagerName: z.string(),
  phone: z.string(),
  email: z.string().email()
})

type SignUpForm = z.infer<typeof signUpForm>

export const SignUp = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

  const { mutateAsync: restaurants } = useMutation({
    mutationFn: signUp
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await restaurants({
        restaurantName: data.restaurantName,
        email: data.email,
        phone: data.phone,
        managerName: data.ManagerName
      })
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        }
      })
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
    catch {
      toast.error('erros de credencciais invalidas')

    }

  }
  return (
    <div className="p-8 ">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to={"/sign-in"}>
          Fazer Login
        </Link>
      </Button>
      <Helmet title="Cadastro" />
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tighter">Crie  uma conta grátis</h1>
          <p className="text-sm  text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
        </div>
        <form action="" className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2 ">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
            <Input id="restaurantName" type="text" {...register('restaurantName')} />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="ManagerName">Seu nome</Label>
            <Input id="ManagerName" type="text" {...register('ManagerName')} />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="phone">Seu celular</Label>
            <Input id="phone" type="tel" {...register('phone')} />
          </div>
          <Button disabled={isSubmitting} className="w-full" type="submit">Finalizar cadastro</Button>
          <p className="px-6 text-center text-ssm leading-relaxed text-muted-foreground">Ao continuar você concorda com os <a href="" className="underline underline-offset-4 ">termos de política e privacidade</a></p>
        </form>
      </div>
    </div>
  )
}
