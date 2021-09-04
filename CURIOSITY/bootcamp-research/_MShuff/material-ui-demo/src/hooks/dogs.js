import { useState } from "react";
import useAsyncEffect from "./useAsyncEffect";
import { getDogs } from "../api/dogs";

export const useDogs = () => {
  const [dogs, setDogs] = useState([]);
  useAsyncEffect(async () => {
    setDogs(await getDogs());
  }, []);
  return dogs;
};
