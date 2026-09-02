import API from "@/API/api"
import extractErrorMessage from "@/shared/utils/messageError"

export async function createBarber(token, formData) {
  const res = await fetch(API.CREATE_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...formData,
      is_barber: true,
      is_customer: false,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(extractErrorMessage(data))
  return data
}