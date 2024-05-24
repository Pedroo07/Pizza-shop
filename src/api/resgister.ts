import { api } from "@/lib/axios";

export interface SignUpBody {
    restaurantName: string
    managerName: string
    phone: string
    email: string
}
export async function signUp({ restaurantName, email, managerName, phone }: SignUpBody) {

    await api.post('/restaurants', { restaurantName, email, managerName, phone })
}