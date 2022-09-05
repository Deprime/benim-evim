import { writable } from 'svelte-local-storage-store';

const $$user = {
  data: <any>{},
  token: <string|null> null,
  loading: false,
}

const { subscribe, set, update } = writable('user', $$user);
const clear = () => set($$user);

const setLoading = (state: boolean): void => {
  update(value => ({ ...value, loading: state }))
}

const setData = (data: {[name: string]: string}): void => {
  update(value => ({
    ...value,
    data
  }))
};

const setToken = (token: string): void => {
  update(value => ({
    ...value,
    token
  }))
};

const isLoggedIn = () => {
  let isLogged = false;
  subscribe(value => {
    isLogged = (value.token) ? true : false;
  });
  return isLogged;
}

const userStore = {
  subscribe,
  set,
  update,
  clear,
  setData,
  setToken,
  setLoading,
  isLoggedIn,
};

export default userStore;
