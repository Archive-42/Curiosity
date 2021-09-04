import { useEffect } from "react";
const useAsyncEffect = (callback, dependencies) => {
  useEffect(() => {
    let result;
    (async () => {
      result = await callback();
    })();
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
export default useAsyncEffect;

