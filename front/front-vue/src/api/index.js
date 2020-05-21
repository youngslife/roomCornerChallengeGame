import axios from "axios";

const apiUrl = "http://localhost:8080";

export default {
  getBoardList(params) {
    return axios.get(`${apiUrl}/Board/searchAll`, {
      params,
    });
  },
  getBoard(params) {
    return axios.get(`${apiUrl}/Board/search/${params.id}`, {
      params,
    });
  },
  createBoard(params) {
    return axios.post(`${apiUrl}/Board/insert`, {
      params,
    });
  },
  updateBoard(params) {
    return axios.put(`${apiUrl}/Board/update`, {
      params,
    });
  },
  deleteBoard(params) {
    return axios.get(`${apiUrl}/Board/delete`, {
      params,
    });
  },
  getCommentList(params) {
    return axios.get(`${apiUrl}/Comment/searchAll`, {
      params,
    });
  },
  getComment(params) {
    return axios.get(`${apiUrl}/Comment/search/${params.id}`, {
      params,
    });
  },
  createComment(params) {
    return axios.post(`${apiUrl}/Comment/insert`, {
      params,
    });
  },
  updateComment(params) {
    return axios.put(`${apiUrl}/Comment/update`, {
      params,
    });
  },
  deleteComment(params) {
    return axios.get(`${apiUrl}/Comment/delete`, {
      params,
    });
  },
  getUserList(params) {
    return axios.get(`${apiUrl}/User/searchAll`, {
      params,
    });
  },
  getUser(params) {
    return axios.get(`${apiUrl}/User/search${params.id}`, {
      params,
    });
  },
  createUser(params) {
    return axios.post(`${apiUrl}/User/insert`, {
      params,
    });
  },
  updateUser(params) {
    return axios.put(`${apiUrl}/User/update`, {
      params,
    });
  },
  deleteUser(params) {
    return axios.get(`${apiUrl}/User/delete`, {
      params,
    });
  },
  Login(params) {
    return axios.get(`${apiUrl}/User/login`, {
      params,
    });
  },
};
