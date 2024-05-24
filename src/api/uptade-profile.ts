import { api } from "@/lib/axios"

interface UptadeProfileBody {
    name: string
    description: string | null
}

export async function uptadeProfile({name, description}: UptadeProfileBody) {
  await api.put('/profile', {name, description})
}
