import { useEffect, useState, useContext } from "react";
import { apiCallGet } from "./api";
import { CommonContext } from "./context";

export const useUserProfile = () => {
  const [data, setData] = useState([]);
  const { dispatch } = useContext(CommonContext);
  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await apiCallGet("/users/2");
      const apiData = userInfo?.data;
      dispatch({ type: "setProfile", payload: apiData });
      setData(apiData);
    };
    fetchData();
  }, [dispatch]);
  return data;
};
