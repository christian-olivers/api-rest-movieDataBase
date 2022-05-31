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
    insertMovies(movies, containerMoviesTreens);
}

const getMoviesBySearch = async(query) => {
    const {data} = await API('search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;
    console.log(movies)
    containerMoviesBySearch.innerHTML = "";
    insertMovies(movies, containerMoviesBySearch);
}

const getMoviesByCategorie = async(id) => {
        const {data} = await API('discover/movie', {
            params: {
                with_genres: id,
            },
        });
        const movies = data.results;
        console.log('categorias')
        sectionCategories.innerHTML=""
        insertMovies(movies, sectionCategories);
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

//     console.log("Movie id " + id);
//     const divPost =  document.querySelector('#detailMovie .section-movie-header'),
//             imgPost = document.createElement('img');
//     divPost.innerHTML = "";
//     const divPostTitle = document.getElementById('moviePost');
//     divPostTitle.innerHTML = "";
//     const categories = document.getElementById('categoriesMovie');
//     categories.innerHTML = "";
//     const detail = document.querySelector('.resumen-detail');
//     detail.innerHTML = "";
//     const containerSimilar = document.querySelector('.suggestion');
//     containerSimilar.innerHTML = "";
    
//     const headerMode =  document.getElementById('header-bar');
//     headerMode.innerHTML ="";
//     const divBtn = document.createElement('div');
//     divBtn.classList.add('arrow-back-active');
//     divBtn.addEventListener('click', () => {
//         location.hash = window.history.back();
//     });
//     headerMode.appendChild(divBtn);

//     if(type === "movie") {
//         console.log("es pelicula " +id);
//         const {data} = await API('movie/'+id);
//         const movie = data.genres;
//         console.log("movie genres",movie);
//         console.log(data)
        
//         const h1 = document.createElement('h1'), calification = document.createElement('div'),
//             spanCal = document.createElement('span'), start = document.createElement('img');
//         const  p = document.createElement('p');
        
//         imgPost.src = URL_IMG+data.poster_path;
//         calification.classList.add('valoration');
//         start.src = './src/assets/star_77949.svg';
//         spanCal.textContent = data.vote_average;
//         calification.appendChild(spanCal);
//         calification.appendChild(start);
//         const h1Text =  document.createTextNode(data.original_title);
//         p.textContent = data.overview;

//         movie.forEach(movieCateorie =>{
//             const categoryDiv = document.createElement('div'), h3 = document.createElement('h3');
//             categoryDiv.classList.add('category');
//             h3.classList.add('category-title');
//             h3.textContent = movieCateorie.name;
//             categoryDiv.appendChild(h3);
//             categories.appendChild(categoryDiv);
//         });
//         divPost.appendChild(imgPost);
//         detail.appendChild(p);
//         h1.appendChild(h1Text);
//         divPostTitle.appendChild(h1);
//         divPostTitle.appendChild(calification);
//         const resSimilar = await API('movie/'+id+'/recommendations');
//         const movies = resSimilar.data.results;
        
//         movies.forEach(peli => {
            
//             const divSimilar = document.createElement('div'), 
//             imgSimilar = document.createElement('img');
//             divSimilar.classList.add('movie-container');
//             imgSimilar.src = URL_IMG+peli.poster_path;
//             divSimilar.appendChild(imgSimilar);
//             containerSimilar.appendChild(divSimilar);
//             divSimilar.addEventListener("click", () =>{
//                 location.hash = "#detail="+peli.media_type+"&"+peli.id;
//                 // movieDetail(peli.id, 'movie');
//             });
            
//         });
        
//     }else {
//         console.log("es serie "+ id)
//         const {data} = await API('tv/'+id);
//         const tv = data.genres;
//         console.log(data)
        
//         const div = document.getElementById('moviePost');
//         const divPost =  document.querySelector('#detailMovie .section-movie-header');
//         const imgPost = document.createElement('img');
//         const h1 = document.createElement('h1'), calification = document.createElement('div'),
//             spanCal = document.createElement('span'), start = document.createElement('img');
       
//         const  p = document.createElement('p');
//         imgPost.src = URL_IMG+data.poster_path;
        
//         calification.classList.add('valoration');
//         start.src = './src/assets/star_77949.svg';
//         spanCal.textContent = data.vote_average;
//         calification.appendChild(spanCal);
//         calification.appendChild(start);
//         const h1Text =  document.createTextNode(data.original_name);
        
//         p.textContent = data.overview;
//         divPost.appendChild(imgPost);
//         h1.appendChild(h1Text);
//         div.appendChild(h1);
//         detail.appendChild(p);
//         div.appendChild(calification);
//         tv.forEach(tvCateorie =>{
//             const categoryDiv = document.createElement('div'), h3 = document.createElement('h3');
//             categoryDiv.classList.add('category');
//             h3.classList.add('category-title');
//             h3.textContent = tvCateorie.name;
//             categoryDiv.appendChild(h3);
//             categories.appendChild(categoryDiv);
//         });

//         const resSimilar = await API('tv/'+id+'/recommendations');
//         const tvSimilar = resSimilar.data.results;
        
//         tvSimilar.forEach(tv => {
//             const containerSimilar = document.querySelector('.suggestion');
//             const divSimilar = document.createElement('div'), imgSimilar = document.createElement('img');
//             divSimilar.classList.add('movie-container');
//             imgSimilar.src = URL_IMG+tv.poster_path;
//             divSimilar.appendChild(imgSimilar);
//             containerSimilar.appendChild(divSimilar);
//             divSimilar.addEventListener("click", () =>{
//                 location.hash = "#detail="+"tv"+"&"+tv.id;
//                 // movieDetail(tv.id, 'tv');
//             });
//         });
//     }
    
//     // 
//     // const movie = Array.from(data);
    
//     // if(data.hasOwnProperty('original_title')) {
//     //     console.log(data.original_title);
//     // }
//     // movie.forEach(movi => { 
//     //     console.log(movi.original_title);
//     // });
}

const recommdationsMovie = async(id) => {
    recommendationMovie.innerHTML = "";
    const {data} = await API('movie/'+id+'/recommendations');
    const recommedation = data.results;
    console.log(recommedation);
    insertMovies(recommedation, recommendationMovie)
}

const getTopMovie = async() => {
    imageTop.innerHTML = "";
    const {data} = await API('trending/movie/day');
    const movies = data.results;
    let n= 0;
    let imgaTop = "";
    for(let x=0; x < 20; x++){
        if(movies[x].vote_average > n){
            n = movies[x].vote_average;
            imgaTop = movies[x].poster_path;
        }
    }
    createImage.src = URL_IMG + imgaTop;
    imageTop.appendChild(createImage);
}


// -------------- utils
function insertMovies(setObjecto, contenedorMovie) {
    setObjecto.forEach(movie => {
        const containerDiv = document.createElement('div'), img = document.createElement('img');
        containerDiv.classList.add('movie-container');
        img.classList.add('img-movie');
        containerDiv.addEventListener("click", () =>{
            location.hash = "#detail="+movie.id;
        });
    
        img.src = URL_IMG + movie.poster_path;
        containerDiv.appendChild(img);
        contenedorMovie.appendChild(containerDiv);
    }); 
}