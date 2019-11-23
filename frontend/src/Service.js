// @flow

import axios from "axios";

export function getAllArticles() {
  return axios
    .get("http://localhost:8080/sak")
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getFrontPageNews() {
  return axios
    .get("http://localhost:8080/viktighet/1")
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getCategoryArticles(kategori_id) {
  return axios
    .get("http://localhost:8080/kategori/" + kategori_id)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getArticle(id) {
  return axios
    .get("http://localhost:8080/sak/" + id)
    .then(res => {
      console.log(res.data[0]);
      return res.data[0];
    })
    .catch(error => {
      console.log(error);
    });
}

export function registerArticle(state) {
  return axios
    .post("http://localhost:8080/sak", state)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(error => {
      console.log(error.response);
    });
}

export function updateArticle(id, props) {
  return axios
    .put("http://localhost:8080/sak/" + id, props)
    .then(res => {
      console.log(res.data);
      return;
    })
    .catch(error => {
      console.log(error.response);
    });
}

export function deleteArticleDB(id) {
  return axios
    .delete("http://localhost:8080/sak/" + id)
    .then(res => {
      console.log(res);
      return;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getCategories() {
  return axios
    .get("http://localhost:8080/kategori")
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getSearch(searchString) {
  return axios
    .get("http://localhost:8080/sok/" + searchString)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function updateArticleViews(id) {
  return axios
    .put("http://localhost:8080/visninger/" + id)
    .then(res => {
      return;
    })
    .catch(error => {
      console.log(error.response);
    });
}

export function getComments(sak_id) {
  return axios
    .get("http://localhost:8080/kommentar/" + sak_id)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function postComment(id, state) {
  return axios
    .post("http://localhost:8080/kommentar/" + id, state)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(error => {
      console.log(error.response);
    });
}
