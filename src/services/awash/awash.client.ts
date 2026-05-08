import { AxiosError } from "axios"
import {httpClient} from "../../core/http/axios.client"

export const fetchAwashReciept = async (id:string) => {
  try {
    const res = await httpClient.get(
      `https://awashpay.awashbank.com:8225/${id}`
    )
    return res.data
  } catch (error) {
    throw new Error((error as AxiosError).cause?.message)
  }
}
