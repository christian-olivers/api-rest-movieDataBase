let maxPages; 
let page = 1;
let infiniteScroll;

btnSearch.addEventListener('click', () => {
    location.hash = 'search=' + textInput.value;
});
divBack.addEventListener('click', () => {
    window.history.back();
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);


function navigator() {
    // console.log({ location });
    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#detail=')) {
        detailPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0; //chrome
    document.documentElement.scrollTop = 0; // otrosnav

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }
}

function trendsPage() {
    console.log('trends=>');
    sectionMain.classList.remove('section-container-main-active');
    sectionMain.classList.add('section-container-main');

    sectionTrens.classList.remove('section-container-trends');
    sectionTrens.classList.add('section-container-trends-active');

    sectionDetail.classList.remove('section-contianer-detail-active');
    sectionDetail.classList.add('section-contianer-detail');
    
    headerId.innerHTML = "Tendencias";
    headerId.appendChild(divBack);
    getMoreTrendingMovies();
    infiniteScroll = getMoreMoviesByTrends();
}

function searchPage() {
    twoSectionsMain.classList.remove('main-container-active');
    twoSectionsMain.classList.add('main-container');
    sectionSearch.classList.remove('container-search-movies');
    sectionSearch.classList.add('container-search-movies-active');
    headerId.innerHTML = "";
    
    headerId.appendChild(divBack)
    const [_, query] = location.hash.split('=');
    console.log(query)
    getMoviesBySearch(query);
    infiniteScroll =  getMoreMoviesBySearch(query);
}

function detailPage() {
    sectionMain.classList.remove('section-container-main-active');
    sectionMain.classList.add('section-container-main');

    sectionDetail.classList.remove('section-contianer-detail');
    sectionDetail.classList.add('section-contianer-detail-active');

    sectionCategories.classList.remove('section-container-categories-active');
    sectionCategories.classList.add('section-container-categories');

    sectionTrens.classList.remove('section-container-trends-active');
    sectionTrens.classList.add('section-container-trends');
    
    
    headerId.innerHTML = "";
    headerId.appendChild(divBack);
    const [_, id] = location.hash.split('=');
    console.log(id)
    movieDetail(id);
    recommdationsMovie(id);
}

function categoriesPage() {
    twoSectionsMain.classList.remove('main-container-active');
    twoSectionsMain.classList.add('main-container');

    sectionMain.classList.remove('section-container-main-active');
    sectionMain.classList.add('section-container-main');
    
    sectionCategories.classList.remove('section-container-categories');
    sectionCategories.classList.add('section-container-categories-active');

    sectionDetail.classList.remove('section-contianer-detail-active');
    sectionDetail.classList.add('section-contianer-detail');    

    headerId.innerHTML = "";
    headerId.appendChild(divBack);
    const [_, dataCategory] = location.hash.split('=');
    const [id,category] = dataCategory.split('-');
    console.log(id, category)
    titleCategory.textContent = category;
    headerId.appendChild(titleCategory);
    getMoviesByCategorie(id);
    infiniteScroll = getMoreMoviesByCategory(id);
}

function homePage() {
    headerId.innerHTML = "";
    namePage.textContent = 'Pelis Collage';
    headerId.appendChild(namePage);
    twoSectionsMain.classList.remove('main-container');
    twoSectionsMain.classList.add('main-container-active');
    sectionSearch.classList.remove('container-search-movies-active');
    sectionSearch.classList.add('container-search-movies');

    sectionCategories.classList.remove('section-container-categories-active');
    sectionCategories.classList.add('section-container-categories');

    sectionMain.classList.remove('section-container-main');
    sectionMain.classList.add('section-container-main-active');

    sectionDetail.classList.remove('section-contianer-detail-active');
    sectionDetail.classList.add('section-contianer-detail');

    sectionTrens.classList.remove('section-container-trends-active');
    sectionTrens.classList.add('section-container-trends');
    
    getCategoriesMovie();
    getTrendsMovie();
}