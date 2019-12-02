// axios를 통해서 영화 데이터를 가져오는 function을 만들어야함
// baseURL : https://api.themoviedb.org/3/
// get : movie/popular
// params : api_key=?api_key=<<api_key>>
// params : language=en-US&page=1

import axios from "axios";

// axios에게 설정을 준다
// 1) 기본 URL
// 2) params

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: { api_key: "fcb220cf279332bb7ccd7801cb5a440a", language: "en-US" }
});

export const movies = {
  getPopular: () => api.get("movie/popular"),
  getNowPlaying: () => api.get("movie/now_playing")
};
