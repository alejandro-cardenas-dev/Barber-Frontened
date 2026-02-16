export default function extractErrorMessage(data) {
  if (!data || typeof data !== 'object') {
    return 'Unknown error'
  }

  const firstField = Object.values(data)[0]

  if (Array.isArray(firstField)) {
    return firstField[0]
  }

  if (typeof firstField === 'object') {
    return Object.values(firstField)[0]
  }

  return 'Error creating account'
}
