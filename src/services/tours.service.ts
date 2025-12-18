import { api } from "@/src/lib/api"

export const getTours = async () => {
  const { data } = await api.get("/tours")
  return data.tours
}

export const getTourById = async (id: number) => {
  const { data } = await api.get(`/tours/${id}`)
  return data
}
