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
        const res = await axios.get(url);
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
