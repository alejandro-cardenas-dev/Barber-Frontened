const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API = {
  GET_ACCESS_TOKEN: `${API_BASE_URL}/token/`,

  CREATE_USER: `${API_BASE_URL}/create-user/`,

  CREATE_APPOINTMENT: `${API_BASE_URL}/create-appointment/`,
  DELETE_APPOINTMENT: `${API_BASE_URL}/delete-appointment/`,
  GET_APPOINTMENTS: `${API_BASE_URL}/get-appointments/`,

  GET_BARBERS: `${API_BASE_URL}/get-barbers/`,
  GET_BARBERS_AVAILABLE_TIMES_SPECIFIC_DATE: `${API_BASE_URL}/get-barber/`,
  EDIT_BARBER_SCHEDULE: `${API_BASE_URL}/edit-barber-schedule/`,
};

export default API;
