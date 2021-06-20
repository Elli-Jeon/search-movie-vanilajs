/* Fetch data */
const fetchData = async (keyword) => {
    let url = new URL(`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/movie.json`);
    let params = {
        query : `${keyword}`,
        display : 20,
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
        return (data.items);
    }catch(error){
        throw new Error(error);
    } 
}


/* Add event */
const searchBar = document.querySelector(".searchBar");
const submitBtn = document.querySelector(".submitBtn")

/* fetch한 데이터를 화면에 표시 */
const showMovieDataOnScreen = (movieData) => {
    const movieDataSection = document.querySelector('.movieData');
    console.log(movieData);

    movieData.forEach((data)=>{
        const eachMovieSection = document.createElement('div'); // 각 movie가 들어갈 div
        // image section
        const imageSec = document.createElement('img');
        imageSec.src = data.image;
        imageSec.alt = "image";
        eachMovieSection.appendChild(imageSec);
        // info section
        const infoSec = document.createElement('div');
        const title = document.createElement('h3');
        const director = document.createElement('h4');
        const actor = document.createElement('h4');
        const pubDate = document.createElement('h4');
        
        title.innerHTML = data.title; // innerHTML 쓰기는 싫은뎅..
        infoSec.appendChild(title);
        director.innerHTML = data.director;
        infoSec.appendChild(director);
        actor.innerHTML = data.actor;
        infoSec.appendChild(actor);
        pubDate.innerHTML = data.pubDate;
        infoSec.appendChild(pubDate);
        eachMovieSection.appendChild(infoSec);
        // rating section
        const rating = document.createElement('div');
        rating.innerText = Number(data.userRating);
        eachMovieSection.appendChild(rating);
        // more section
        const more = document.createElement('p');
        const moreContainer = document.createElement('a');
        more.textContent = "더보기"
        moreContainer.href = data.link;
        moreContainer.appendChild(more);
        eachMovieSection.appendChild(moreContainer);

        movieDataSection.appendChild(eachMovieSection);
    })
    
    console.log(movieData[1].image);
}

// input에서 엔터키 누르면 바로 되도록.
searchBar.addEventListener('keyup',async (e)=>{
    if(window.event.keyCode === 13){ // enter키의 keycode가 13이라고 함.
        let movieData = await fetchData(e.target.value);
        showMovieDataOnScreen(movieData);
    }
})

// submit버튼 누르면 작동
submitBtn.addEventListener('click',async (e)=>{
    e.preventDefault();
    const searchTitle = searchBar.value;
    let movieData = await fetchData(searchTitle);
    showMovieDataOnScreen(movieData);
})

