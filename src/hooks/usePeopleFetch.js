import { useState, useEffect } from "react";
import axios from "axios";
import { useUpdateEffect } from "ahooks";
import { useCallback } from "react";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const increasePage = () => setPage((prev) => prev + 1);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);

    const response = await axios.get(
      `https://randomuser.me/api/?results=25&page=${page}`
    );
    if (response && response.data && response.data.results) {
      setUsers((prevUsers) => prevUsers.concat(response.data.results));
    } else {
      // handle error situation
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useUpdateEffect(() => {
    setIsLoading(false);
  }, [users]);

  return { users, isLoading, fetchUsers, increasePage };
};
