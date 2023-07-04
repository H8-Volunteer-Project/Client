import { setCurrentEvents, setPastEvents, setProfile, setRegisteredEvents, setUser } from '../slices/user'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const login = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: BASE_URL + '/api/login',
        data: payload
      })
      localStorage.access_token = data.access_token
      localStorage.role = 'Volunteer'
      dispatch(setUser(data.email)) //res kurang
    } catch (error) {
      console.log(error.name);
    }
  };
};
export const register = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: BASE_URL + '/api/register',
        data: payload
      })
      console.log(data, 'data');
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerEvent = (id, payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: BASE_URL + '/api/eventregister/' + id,
        headers: { access_token: localStorage.access_token },
        data: payload
      })
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
export const getMyListEvent = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: BASE_URL + '/api/mylist',
        headers: { access_token: localStorage.access_token },
      })
      let current = data.filter(e => e.status !== 'Done' && e.status !== 'Pending')
      let past = data.filter(e => e.status === 'Done')
      let registered = data.filter(e => e.status === 'Pending')
      dispatch(setCurrentEvents(current))
      dispatch(setPastEvents(past))
      dispatch(setRegisteredEvents(registered))
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: BASE_URL + '/api/users',
        headers: { access_token: localStorage.access_token },
      })
      console.log(data);
      dispatch(setProfile(data))
    } catch (error) {
      console.log(error);
    }
  };
};
