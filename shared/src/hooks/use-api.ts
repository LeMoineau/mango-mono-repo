import axios from "axios";
import { useEffect, useState } from "react";

const useApi = <DATA>(baseURL: string) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const axiosInstance = axios.create({
    baseURL,
  });

  useEffect(() => {
    if (data) {
      setLoaded(true);
      setLoading(false);
    }
  }, [data]);

  const refresh = () => {
    setLoaded(false);
    setLoading(false);
    setData(undefined);
  };

  const fetch = async <T extends DATA>(
    endpoint: string,
    options?: {
      forceRefresh?: boolean;
      config?: axios.AxiosRequestConfig;
    }
  ): Promise<T | undefined> => {
    if (loaded && !options?.forceRefresh) {
      return data;
    }
    setLoading(true);
    return await axiosInstance
      .get(endpoint, options?.config)
      .then((res) => {
        setData(res.data);
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        return;
      });
  };

  const get = (): DATA | undefined => {
    return data;
  };

  return {
    loaded,
    loading,
    data,
    refresh,
    fetch,
    get,
  };
};

export default useApi;
