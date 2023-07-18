import { useRecoilState } from "recoil";
import { getGlobalStateForKey } from "./Store";
function useGlobalState(key, data) {
  return useRecoilState(getGlobalStateForKey(key, data));
}

export default useGlobalState;
