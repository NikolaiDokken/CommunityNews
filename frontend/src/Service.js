import axios from "axios";

export function getAllArticles() {
  return axios.get("http://localhost:8080/sak").then(res => {
    console.log(res.data);
    return res.data;
  });
}

export function getFrontPageNews() {
  return axios.get("http://localhost:8080/viktighet/1").then(res => {
    console.log(res.data);
    return res.data;
  });
}

export function getCategoryArticles(kategori_id) {
  return axios
    .get("http://localhost:8080/kategori/" + kategori_id)
    .then(res => {
      console.log(res.data);
      return res.data;
    });
}

export function getArticle(id) {
  return axios.get("http://localhost:8080/sak/" + id).then(res => {
    const items = res.data[0];
    console.log(res.data[0]);
    return res.data[0];
  });
}

export function registerArticle(state) {
  return axios
    .post("http://localhost:8080/sak", state)
    .then(res => {
      console.log(res);
      console.log(res.data);
      alert("Din sak ble lagt til");
      window.location.hash = "";
    })
    .catch(error => {
      console.log(error.response);
    });
}

export function updateArticle(id, props) {
  return axios
    .put("http://localhost:8080/sak/" + id, props)
    .then(res => {
      console.log(res);
      console.log(res.data);
      // alert("Din sak ble oppdatert");
      // window.location.reload();
      return;
    })
    .catch(error => {
      console.log(error.response);
    });
}

export function deleteArticleDB(id) {
  return axios.delete("http://localhost:8080/sak/" + id).then(res => {
    console.log(res);
    return;
  });
}

export function getCategories() {
  return axios.get("http://localhost:8080/kategori").then(res => {
    console.log(res.data);
    return res.data;
  });
}
