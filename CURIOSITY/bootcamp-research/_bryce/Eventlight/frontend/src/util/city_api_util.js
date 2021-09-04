import axios from "axios";

export const fetchCitiesAuto = filter => {
  return axios.get("/api/cities/auto", { params: { ...filter } });
};