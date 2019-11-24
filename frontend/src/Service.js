// @flow

import axios from "axios";

export function getAllArticles(offset) {
  return axios.get("http://localhost:8080/saker/" + offset);
}

export function getFrontPageNews() {
  return axios.get("http://localhost:8080/viktighet/1");
}

export function getCategoryArticles(kategori_id) {
  return axios.get("http://localhost:8080/kategori/" + kategori_id);
}

export function getArticle(id) {
  return axios.get("http://localhost:8080/sak/" + id);
}

export function registerArticle(state) {
  return axios.post("http://localhost:8080/sak", state);
}

export function updateArticle(id, props) {
  return axios.put("http://localhost:8080/sak/" + id, props);
}

export function deleteArticleDB(id) {
  return axios.delete("http://localhost:8080/sak/" + id);
}

export function getCategories() {
  return axios.get("http://localhost:8080/kategori");
}

export function getSearch(searchString) {
  return axios.get("http://localhost:8080/sok/" + searchString);
}

export function updateArticleViews(id) {
  return axios.put("http://localhost:8080/visninger/" + id);
}

export function getComments(sak_id) {
  return axios.get("http://localhost:8080/kommentar/" + sak_id);
}

export function postComment(id, state) {
  return axios.post("http://localhost:8080/kommentar/" + id, state);
}
