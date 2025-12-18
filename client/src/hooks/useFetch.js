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
        const BASE_URL = "https://ticketbooking-5eoj.onrender.com/api";
        const fullUrl = `${BASE_URL}${url}`;
        console.log(fullUrl);
        const res = await axios.get(fullUrl);
        console.log(res.data);
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
      const res = axios.get(url);
      setData(res.setData);
    } catch (error) {
      setErros(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
