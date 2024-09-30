import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
});

class APIClient<T> {
  getAll = async () => {
    const res = await axiosInstance.get<T>("/data.json");
    return res.data;
  };
}

export default APIClient;
