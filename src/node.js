
/*home*/
const twoSectionsMain = document.getElementById('mainCotainer');
const containCategoriesMain = document.getElementById('containerCategoriesMain');
const containerMoviesTreens = document.getElementById('containerTrendsMainMovies');
const setCategoriesMain = document.querySelector('#containerCategoriesMain .container-categories');
const sectionMain = document.getElementById('sectionMain');
const imageTop = document.querySelector('#sectionMain .img-post-main');
const createImage = document.createElement('img'); 
const namePage = document.createElement('h1');


/*search*/
const sectionSearch = document.getElementById('containerSearchMovies');
const textInput = document.querySelector('#searchForm input');
const btnSearch = document.getElementById('btnFormSearch');
const containerMoviesBySearch = document.getElementById('containerSearchMovies');
const headerId = document.getElementById('headerOptions');
const divBack = document.createElement('div');
divBack.setAttribute('id', 'btn-back');

/*categories*/
const sectionCategories = document.getElementById('sectionCategories');
const titleCategories = document.createElement('h1');

/*Detail */
const sectionDetail = document.getElementById('sectionDetail');
const divImagePost = document.getElementById('imagePostDetail');
const imgPost = document.createElement('img');
const containerTitle = document.getElementById('titleDetail');
const h1TitleMovie = document.createElement('h1');
const divCalification = document.createElement('div');
const pCalification = document.createElement('p');
const imgCalification = document.createElement('img')
imgCalification.src = './src/assets/star_77949.svg';
const titleCategory = document.createElement('h2');

const containerCategories = document.querySelector('#containerMovieDetail .categories-movie-content');
const containerSynopsis = document.querySelector('#containerMovieDetail .synopsis-movie');
const h2Synopsis = document.createElement('h2');
const pSynopsis = document.createElement('p');
const recommendationMovie = document.getElementById('containerRecommendationMovies');
