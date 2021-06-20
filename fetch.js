/* Fetch data */
const fetchData = async (keyword) => {
    let url = new URL(`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/movie.json`);
    let params = {
        query : `${keyword}`,
        // genre : [1,2],
    }
    let requestOptions = {
        method : "GET",
        headers : {
            "X-Naver-Client-Id" : "bBIbdz0P823GUIwYl0pt",
            "X-Naver-Client-Secret" : "xVoc8F1izU"
        }
    };
    url.search = new URLSearchParams(params).toString();
    try{
        let response = await fetch(url,requestOptions);
        let data = await response.json();
        console.log(data.items);
    }catch(error){
        throw new Error(error);
    } 
}


/* Add event */
const searchBar = document.querySelector(".searchBar");
const submitBtn = document.querySelector(".submitBtn")

// input에서 엔터키 누르면 바로 되도록.
searchBar.addEventListener('keyup',(e)=>{
    if(window.event.keyCode === 13){
        fetchData(e.target.value);
    }
})

// submit버튼 누르면 작동
submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchTitle = searchBar.value;
    fetchData(searchTitle);
})