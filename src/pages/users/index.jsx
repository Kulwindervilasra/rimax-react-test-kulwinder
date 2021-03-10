import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  TableSortLabel,
  Input,
} from "@material-ui/core";
import { apiCallGet } from "../../common/api";
import _ from "lodash";

const headers = [
  { name: "Avatar", key: "avatar" },
  { name: "First Name", key: "first_name" },
  { name: "Last Name", key: "last_name" },
  { name: "Email", key: "email" },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [original, setOriginalData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState("");

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    handleSortList();
  }, [sortOrder]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  async function getUsers() {
    const result = await apiCallGet("/users?per_page=100");
    if (result?.data) {
      setUsers(result.data);
      setOriginalData(result.data);
    }
  }

  const handleSortBy = (selector) => {
    if (selector && selector !== sortBy) {
      setSortBy(selector);
      setSortOrder("asc");
    } else if (selector === sortBy && sortOrder === "asc") {
      setSortBy(selector);
      setSortOrder("desc");
    } else {
      setSortBy("");
      setSortOrder("");
    }
  };

  function handleSortList() {
    const sorted = users.sort(function compare(a, b) {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
    if (sortOrder === "desc") {
      setUsers(sorted.reverse());
    } else if (sortOrder === "asc") {
      setUsers(sorted);
    } else {
      setUsers(original);
    }
  }

  function handleSearch() {
    if (search) {
      const filtered = [...original].filter(
        (item) =>
          item?.first_name?.toLowerCase()?.includes(search) ||
          item?.last_name?.toLowerCase()?.includes(search) ||
          item?.email?.toLowerCase()?.includes(search)
      );
      setUsers(filtered);
    } else {
      setUsers(original);
    }
  }

  const debounceInput = useCallback(
    _.debounce((value) => setSearch(value), 1000),
    []
  );
  const onChange = (e) => {
    setInputValue(e.target.value);
    debounceInput(e.target.value);
  };
  return (
    <Paper>
      <h3 className="text-center">Users list</h3>
      <TableContainer>
        <Table class="table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>
                <Input
                  className="form-control col-4"
                  onChange={onChange}
                  value={inputValue}
                  type="search"
                  placeholder="Enter search keyword here..."
                />
              </TableCell>
            </TableRow>
            <TableRow>
              {headers.map(({ key, name }) => {
                return (
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === key}
                      direction={sortOrder}
                      onClick={() => handleSortBy(key)}
                    >
                      {name}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell>
                    <img src={data.avatar} />
                  </TableCell>
                  <TableCell>{data.first_name}</TableCell>
                  <TableCell>{data.last_name}</TableCell>
                  <TableCell>{data.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Users;
