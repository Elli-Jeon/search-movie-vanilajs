import axios from "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

const getData = async (keyword) => {
    const url = new URL(`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/movie.json`);
    const params = {
        query : `${keyword}`,
        // genre : [1,2],
    }
    url.search = new URLSearchParams(params).toString();
    const requestOptions = {
        method : "GET",
        headers : {
            "X-Naver-Client-Id" : "bBIbdz0P823GUIwYl0pt",
            "X-Naver-Client-Secret" : "xVoc8F1izU"
        }
    }
    try {
        const response = await axios.get(url,requestOptions);
    }
    catch(error){
        throw new Error(error);
    }
}

getData("해리포터");
