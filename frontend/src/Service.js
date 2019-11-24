// @flow

import axios from "axios";

export function getAllArticles(offset: number) {
  return axios.get("http://localhost:8080/saker/" + offset);
}

export function getFrontPageNews() {
  return axios.get("http://localhost:8080/viktighet/1");
}

export function getCategoryArticles(kategori_id: number) {
  return axios.get("http://localhost:8080/kategori/" + kategori_id);
}

export function getArticle(id: number) {
  return axios.get("http://localhost:8080/sak/" + id);
}

export function registerArticle(state: Object) {
  return axios.post("http://localhost:8080/sak", state);
}

export function updateArticle(id: number, props: Object) {
  return axios.put("http://localhost:8080/sak/" + id, props);
}

export function deleteArticleDB(id: number) {
  return axios.delete("http://localhost:8080/sak/" + id);
}

export function getCategories() {
  return axios.get("http://localhost:8080/kategori");
}

export function getSearch(searchString: string) {
  return axios.get("http://localhost:8080/sok/" + searchString);
}

export function updateArticleViews(id: number) {
  return axios.put("http://localhost:8080/visninger/" + id);
}

export function getComments(sak_id: number) {
  return axios.get("http://localhost:8080/kommentar/" + sak_id);
}

export function postComment(id: number, state: Object) {
  return axios.post("http://localhost:8080/kommentar/" + id, state);
}
