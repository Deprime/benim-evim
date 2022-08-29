import { writable } from 'svelte-local-storage-store';

const $$user = {
  data: {},
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

const userStore = {
  subscribe,
  set,
  update,
  clear,
  setData,
  setLoading,
};

export default userStore;
