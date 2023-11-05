
/**
 * Gère la recherche de films via l'API OMDB et l'affichage des résultats.
 * @file
 */

document.addEventListener('DOMContentLoaded', function () {
    /**
     * Formulaire de recherche de films.
     * @type {HTMLFormElement}
     */
    const searchForm = document.getElementById('searchMovieForm');

    /**
     * Div pour afficher les résultats de la recherche.
     * @type {HTMLElement}
     */
    const resultsDiv = document.getElementById('results');

    /**
     * Div pour afficher les boutons de pagination.
     * @type {HTMLElement}
     */
    const paginationDiv = document.getElementById('pagination');

    /**
     * Clé API pour l'API OMDB.
     * @type {string}
     */
    const apiKey = 'a17237f5';

    /**
     * Stocke la dernière recherche effectuée pour la pagination.
     * @type {Object}
     */
    let lastSearch = null;

    /**
     * Effectue une recherche de films via l'API OMDB.
     * @param {string} title 
     * @param {string} year 
     * @param {string} type 
     * @param {number} page 
     */
    function searchMovies(title, year, type, page = 1) {
        lastSearch = { title, year, type, page };
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}&y=${year}&type=${type}&page=${page}`;
        console.log('Requête envoyée à l\'API OMDB:', url);  // Affichage de l'URL de la requête pour débogage
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Réponse de l\'API OMDB:', data);  
                if (data.Response === 'True') {
                    displayResults(data.Search, data.totalResults);
                    displayPagination(data.totalResults, page);
                } else {
                    resultsDiv.innerHTML = '<p>Aucun résultat trouvé</p>';
                    paginationDiv.innerHTML = '';
                }
            })
            .catch(error => {
                console.error('Erreur lors de la recherche:', error);
                resultsDiv.innerHTML = '<p>Erreur lors de la recherche</p>';
                paginationDiv.innerHTML = '';
            });
    }
    
    /**
     
     * @param {Object[]} movies - Tableau d'objets représentant les films.
     * @param {number} totalResults - Nombre total de résultats.
     */
    function displayResults(movies, totalResults) {
        resultsDiv.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movie';
            const title = document.createElement('h3');
            title.textContent = movie.Title;
            const poster = document.createElement('img');
            poster.src = movie.Poster !== 'N/A' ? movie.Poster : 'path/to/default/image.jpg'; 
            movieDiv.appendChild(poster);
            movieDiv.appendChild(title);
            resultsDiv.appendChild(movieDiv);
        });
    }

    /**
     
     * @param {number} totalResults - Nombre total de résultats.
     * @param {number} currentPage - Numéro de la page actuelle.
     */
    function displayPagination(totalResults, currentPage) {
        paginationDiv.innerHTML = '';
        const totalPages = Math.min(10, Math.ceil(totalResults / 10));
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', function () {
                searchMovies(lastSearch.title, lastSearch.year, lastSearch.type, i);
            });
            if (i === currentPage) {
                button.disabled = true;
            }
            paginationDiv.appendChild(button);
        }
    }

    /**
     
     * @param {Event} event 
     */
    searchForm.onsubmit = function (event) {
        event.preventDefault();
        const title = searchForm.title.value.trim();
        const year = searchForm.year.value.trim();
        const type = searchForm.type.value;
        searchMovies(title, year, type);
    };
});
