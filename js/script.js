const elMenu = selectElem('.films__card-menu');
const elForm = selectElem('.form');
const elSelect = selectElem('.films__select', elForm);
const elSearch = selectElem('.films__search', elForm);
const elFilter = selectElem('.films__filter', elForm);
const elTemplate = selectElem('#template').content;
const elModal = selectElem('.modal');
const elCloseBtn = selectElem('.modal__close-btn');

// const elModalList = getElem('.modal__list')
// const elModalBtn = getElem('#modal__btn')
// const elModalimg = getElem('.modal__img')
// const elModaltext = getElem('.modal__text')

function renderMovies(filmsArr, element){
    element.innerHTML = null;
    filmsArr.forEach((film) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.films__img', cloneTemplate).src = film.poster;
        selectElem('.films__card-title', cloneTemplate).textContent = film.title;
        selectElem('.films__release-date', cloneTemplate).textContent = normalizeDate(film.release_date);
        selectElem('.films__release-date', cloneTemplate).datetime = normalizeDate(film.release_date);
        
        let elBtn = selectElem('.films__btn', cloneTemplate);
        elBtn.addEventListener('click', () =>{
            elModal.classList.add('modal--active');
            // selectElem('.modal__show-card-img', cloneTemplate).src = film.poster;
            // selectElem('.modal__show-card-title', cloneTemplate).textContent = film.title;
            // selectElem('.modal__show-card-genres', cloneTemplate).textContent = film.genres;
            // selectElem('.modal__show-card-text', cloneTemplate).textContent = film.overview;
        })
        elCloseBtn.addEventListener('click', ()=>{
            elModal.classList.remove('modal--active');
        })
        // let CardBtn = getElem('.film__card--btn', cloneTemplate)
        // CardBtn.dataset.film_id = film.id
        
        // let newGanres = getElem('.modal__ganres')
        // CardBtn.addEventListener('click', (item) =>{
        //     // item.preventDefault()
        //    // elModal.classList.add('modal__active')
        //     elModal.style.opacity = "1"
        //     elModal.style.visibility = "visible"
        //     elModalList.style.transform = "scale(1)"
        //     let findFilm = films.find(film => film.id === CardBtn.dataset.film_id) 
        //     let ModalImg = getElem('.modal__img').src = findFilm.poster
        //     let ModalContent = getElem('.modal__text').textContent = findFilm.overview
        //     let FilmLink = getElem('.modal__link')
        //     FilmLink.href = findFilm.link
            
        //     function findfunction(arr, element){
        //         element.innerHTML = null
        //         arr.genres.forEach(ganre =>{
        //             let newLi = creatElem('li')
        //             newLi.setAttribute('class', 'modal__ganre')
        //             newLi.textContent = ganre
                    
        //             element.appendChild(newLi)
        //         })
        //     }
        //     findfunction(findFilm, newGanres)
        // })
        
        // elModalBtn.addEventListener('click', (item)=>{
        //   //  elModal.classList.remove('modal__active')
        //     elModalList.style.transform = "scale(0)"
        //     setTimeout(() => {
        //         elModal.style.opacity = "0"
        //         elModal.style.visibility = "hidden"                
        //     }, 600);
        // })

        element.appendChild(cloneTemplate);
    })
}
renderMovies(films, elMenu);

function renderGenres(filmArr, element){
    let result = []
    filmArr.forEach((film) =>{
        film.genres.forEach(genre =>{
            if(!result.includes(genre)){
                result.push(genre);
            }; 
        });
    });
    result.forEach(genre =>{
        let newOption = createElem('option');
        newOption.textContent = genre;
        newOption.value = genre;
        
        element.appendChild(newOption);
    });
};
renderGenres(films, elSelect);

elForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const inputValue = elSearch.value.trim();
    const selectValue = elSelect.value.trim();
    const filterValue = elFilter.value.trim();
    
    const regex = new RegExp(inputValue, 'gi');
    const filteredFilms = films.filter((film)=> film.title.match(regex));
    
    let foundFilms = [];
    
    if(selectValue === 'All'){ 
        foundFilms = filteredFilms;
    }else{
        foundFilms = filteredFilms.filter(film => film.genres.includes(selectValue));
    }
    
    if(filterValue === 'A_Z'){
        foundFilms.sort((a, b) => {
            if(a.title > b.title){
                return 1
            }else if( a.title < b.title){
                return -1
            }else{
                return 0
            } 
        })
    }else if(filterValue === 'Z_A'){
        foundFilms.sort((a, b) => {
            if(a.title > b.title){
                return -1
            }else if( a.title < b.title){
                return 1
            }else{
                return 0
            }
        })
    }
    if(filterValue === 'new_old'){
        foundFilms.sort((a, b) => {
            if(a.release_date > b.release_date){
                return 1
            }else if( a.release_date < b.release_date){
                return -1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'old_new'){
        foundFilms.sort((a, b) => {
            if(a.release_date > b.release_date){
                return -1
            }else if( a.release_date < b.release_date){
                return 1
            }else{
                return 0
            }
        })
    }
    elSearch.value = null;
    renderMovies(foundFilms, elMenu);
})
