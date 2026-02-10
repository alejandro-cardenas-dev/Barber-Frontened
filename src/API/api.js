const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API = {
  GET_ACCESS_TOKEN: `${API_BASE_URL}/token/`,

  CREATE_USER: `${API_BASE_URL}/users/`,

  CREATE_APPOINTMENT: `${API_BASE_URL}/appointments/`,
  DELETE_APPOINTMENT: `${API_BASE_URL}/appointments/`,
  GET_APPOINTMENTS: `${API_BASE_URL}/appointments/`,

  GET_BARBERS: `${API_BASE_URL}/barbers/`,
  GET_BARBERS_AVAILABLE_TIMES_SPECIFIC_DATE: `${API_BASE_URL}/barbers/`,
  EDIT_BARBER_SCHEDULE: `${API_BASE_URL}/barbers/me/schedule/`,

  GET_USER: `${API_BASE_URL}/users/me`,

  GET_SERVICES: `${API_BASE_URL}/services/`,

};

export default API;
