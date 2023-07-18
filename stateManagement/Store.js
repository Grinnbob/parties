import {atom} from 'recoil';
const STORE = {};
export const getGlobalStateForKey = (key, defaultValue = '') => {
  return STORE[key] ?? generateAtom(key, defaultValue);
};
export default STORE;
const generateAtom = (key, defaultValue) =>
  (STORE[key] = atom({
    key: key,
    default: defaultValue,
  }));
