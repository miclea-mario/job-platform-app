import { createStore } from 'redux';

const STORAGE_KEY = 'auth_token';

// Initialize state from localStorage
const initialState = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;

function inMemoryJwt(state = initialState, action) {
  switch (action.type) {
    case 'SET':
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, action.jwt);
      }
      return action.jwt;
    case 'REMOVE':
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      return null;
    default:
      return state;
  }
}

export const store = createStore(inMemoryJwt);

export default store;
