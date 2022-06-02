const  key = config.API_KEY;
const URL_IMG = 'https://image.tmdb.org/t/p/w500';

const API =  axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': key,
    }
});

const getCategoriesMovie = async() => {
    const {data} = await API('genre/movie/list', {
        params: {
            language: 'es-MX',
        },
    });
    const genres = data.genres;
    setCategoriesMain.innerHTML = "";
    genres.forEach(category => {  
        const h3 = document.createElement('h3');
        h3.addEventListener("click", () =>{
            location.hash =  `#category=${category.id}-${category.name}`;
        });
        const categoryText = document.createTextNode(category.name);        
        h3.appendChild(categoryText);   
        setCategoriesMain.appendChild(h3);
    });
}

const getTrendsMovie = async() => {
    const {data} = await API('trending/movie/day');
    const movies = data.results;
    containerMoviesTreens.innerHTML = "";
    insertMovies(movies, containerMoviesTreens, true);
    getTopMovie(movies);
}

const getMoviesBySearch = async(query) => {
    const {data} = await API('search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;
    maxPages = 1;
    maxPages = data.total_pages 
    containerMoviesBySearch.innerHTML = "";
    insertMovies(movies, containerMoviesBySearch,true);
}

const getMoviesByCategorie = async(id) => {
        const {data} = await API('discover/movie', {
            params: {
                with_genres: id,
            },
        });
        const movies = data.results;
        console.log('categorias')
        maxPages = data.total_pages;
        // console.log('este es el div'+sectionCategories)
        sectionCategories.innerHTML=""
        insertMovies(movies, sectionCategories, true);
        
}

async function getMoreTrendingMovies() {
    containerTrends.innerHTML = "";
    const {data} = await API('trending/movie/day');
    const movies = data.results;
    maxPages = 1;
    maxPages = data.total_pages   //------------------------
    insertMovies(movies, containerTrends, true);
    // const btnMore = document.createElement('button');
    // btnMore.textContent = 'Cargar más';
    // btnMore.addEventListener('click', getCharginMore)
    // contsinerBtn.appendChild(btnMore);
}

const movieDetail = async(id) => {
    divImagePost.innerHTML="";
    containerTitle.innerHTML = "";
    containerCategories.innerHTML = "";
    containerSynopsis.innerHTML = "";
    divCalification.classList.add('calification')
    const {data} = await API('movie/' + id, {
        params: {
            language: 'es-MX',
        },
    });
    const categoriesMov = data.genres;
    imgPost.src = URL_IMG + data.poster_path;
    h1TitleMovie.textContent = data.title;
    pCalification.textContent = data.vote_average;
    divImagePost.appendChild(imgPost);
    divCalification.appendChild(pCalification);
    divCalification.appendChild(imgCalification);
    containerTitle.appendChild(h1TitleMovie);
    containerTitle.appendChild(divCalification);
    categoriesMov.forEach(category => {
        const h3Category = document.createElement('h3');
        h3Category.textContent = category.name;
        containerCategories.appendChild(h3Category);
    });
    h2Synopsis.textContent = 'Sinopsis';
    pSynopsis.textContent = data.overview;
    containerSynopsis.appendChild(h2Synopsis);
    containerSynopsis.appendChild(pSynopsis);
}

const recommdationsMovie = async(id) => {
    recommendationMovie.innerHTML = "";
    const {data} = await API('movie/'+id+'/recommendations');
    const movies = data.results;
    console.log(movies);
    insertMovies(movies, recommendationMovie)
}

function getMoreMoviesByCategory(categoryId){
    return function () { getChargingnMore('discover/movie', {categoryId}, sectionCategories) }; //implementando closure
}

function getMoreMoviesByTrends() {
    return function () { getChargingnMore('trending/movie/day',undefined ,containerTrends) }; 
}
function getMoreMoviesBySearch(query) {
    return function () { getChargingnMore('search/movie',{query} ,containerMoviesBySearch) };
}

// -------------- utils
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
        const url = entry.target.getAttribute('pre-src');
        entry.target.setAttribute('src', url);
        }
    });
}); 

function insertMovies(setObjecto, contenedorMovie, lazyLoad = false) {
    // console.log(contenedorMovie)
    setObjecto.forEach(movie => {
        const containerDiv = document.createElement('div'), img = document.createElement('img');
        containerDiv.classList.add('movie-container');
        img.classList.add('img-movie');
        containerDiv.addEventListener("click", () =>{
            location.hash = "#detail="+movie.id;
        });
        img.setAttribute('alt', movie.title)
        img.setAttribute(observer ? 'pre-src': 'src', URL_IMG + movie.poster_path);
        img.addEventListener('error', () => {
            img.setAttribute('src', 'https://nuft.edu.ua/assets/images/people/no-image.jpg');
        });    
        if(lazyLoad) {
        observer.observe(img)
        }
        containerDiv.appendChild(img);
        contenedorMovie.appendChild(containerDiv);
    }); 
       
}

function getTopMovie(objeto) {
    imageTop.innerHTML = "";
    let n= 0;
    let imgaTop = "";
    for(let x=0; x < 20; x++){
        if(objeto[x].vote_average > n){
            n = objeto[x].vote_average;
            imgaTop = objeto[x].poster_path;
        }
    }
    createImage.src = URL_IMG + imgaTop;
    imageTop.appendChild(createImage);
}

// let page = 1;
// window.addEventListener('scroll', getChargingnMore);
// async function getChargingnMore() {
//     const {
//         scrollTop,
//         scrollHeight,
//         clientHeight
//     } = document.documentElement;

//     const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 10);
//     const pageIsNotMax = page < maxPages;

//     if(scrollIsBottom && pageIsNotMax) {
//         page++;
//         const {data} = await API('trending/movie/day', {
//             params: {
//                 page,
//             }
//         });
//         const movies = data.results;
//         insertMovies(movies, containerTrends, true);
//     }
// }

async function getChargingnMore( 
    endPoint,
    {
        categoryId,
        query,
    } = {},
    contenedorMovie,
    ) {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 10);
    const pageIsNotMax = page < maxPages;
    console.log((scrollTop + clientHeight), (scrollHeight - 1) )
    console.log(scrollIsBottom, pageIsNotMax , maxPages ,page)
    if(scrollIsBottom && pageIsNotMax) {
        page++;
        console.log("estamos adentro")
        const {data} = await API(endPoint, {
            params: {
                page,
                with_genres: categoryId,
                query,
            },
        });
        const movies = data.results;
        insertMovies(movies, contenedorMovie, true);
    }
}


