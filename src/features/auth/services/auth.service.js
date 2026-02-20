import API from "@/API/api"

export async function getAccessToken(email, password) {
  const res = await fetch(API.GET_ACCESS_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) return null
  return res.json()
}

export async function getUser(access) {
  const res = await fetch(API.GET_USER, {
    headers: { Authorization: `Bearer ${access}` },
  })

  if (!res.ok) return null
  return res.json()
}

export async function getBarber(access) {
  const res = await fetch(API.EDIT_BARBER_SCHEDULE, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
  })

  if (!res.ok) return null
  return res.json()
}