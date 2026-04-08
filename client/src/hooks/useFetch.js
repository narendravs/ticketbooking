import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErros] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //const BASE_URL = process.env.REACT_APP_API_URL;
        const BASE_URL = process.env.REACT_APP_API_URL_LOCAL;
        const fullUrl = `${BASE_URL}${url}`;
        const res = await axios.get(fullUrl);
        setData(res.data);
      } catch (error) {
        setErros(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const BASE_URL = process.env.REACT_APP_API_URL_LOCAL;
      const res = await axios.get(`${BASE_URL}${url}`);
      setData(res.setData);
    } catch (error) {
      setErros(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
