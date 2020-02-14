import axios from "axios";

export function getAllArticles(offset) {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/saker/" + offset);
}

export function getFrontPageNews() {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/viktighet/1");
}

export function getCategoryArticles(kategori_id) {
  return axios.get(
    process.env.REACT_APP_BACKEND_URL + "/kategori/" + kategori_id
  );
}

export function getArticle(id) {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/sak/" + id);
}

export function registerArticle(state) {
  return axios.post(process.env.REACT_APP_BACKEND_URL + "/sak", state);
}

export function updateArticle(id, props) {
  return axios.put(process.env.REACT_APP_BACKEND_URL + "/sak/" + id, props);
}

export function deleteArticleDB(id) {
  return axios.delete(process.env.REACT_APP_BACKEND_URL + "/sak/" + id);
}

export function getCategories() {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/kategori");
}

export function getSearch(searchString) {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/sok/" + searchString);
}

export function updateArticleViews(id) {
  return axios.put(process.env.REACT_APP_BACKEND_URL + "/visninger/" + id);
}

export function getComments(sak_id) {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/kommentar/" + sak_id);
}

export function postComment(id, state) {
  return axios.post(
    process.env.REACT_APP_BACKEND_URL + "/kommentar/" + id,
    state
  );
}
