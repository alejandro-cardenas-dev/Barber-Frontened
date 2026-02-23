import API from "@/API/api"
import extractErrorMessage from "@/shared/utils/messageError"

export async function createUser(formData) {
  const res = await fetch(API.CREATE_USER, {
    method: 'POST',
    body: formData
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(extractErrorMessage(data))
  }

  return data
}