/**
 * @file 


/**
 * @typedef {Object} Movie
 * @property {string} title - Le titre du film.
 * @property {string} year - L'année de sortie du film.
 * @property {string} author - Le réalisateur du film.
 */

/**
 
 */
document.addEventListener('DOMContentLoaded', function () {
    /** @type {Movie[]} */
    const movies = [
        { title: 'Inception', year: '2010', author: 'Christopher Nolan' },
        { title: 'Interstellar', year: '2014', author: 'Christopher Nolan' },
        { title: 'The Dark Knight', year: '2008', author: 'Christopher Nolan' },
        { title: 'Pulp Fiction', year: '1994', author: 'Quentin Tarantino' }
    ];

    /** @type {HTMLTableSectionElement} */
    const moviesTable = document.getElementById('moviesTable').getElementsByTagName('tbody')[0];
    
    /** @type {HTMLFormElement} */
    const addMovieForm = document.getElementById('addMovieForm');
    
    /** @type {HTMLButtonElement} */
    const addMovieBtn = document.getElementById('addMovieBtn');
    
    /** @type {HTMLSelectElement} */
    const filterSelect = document.getElementById('filterSelect');
    
    
     
     
    function displayMovies() {
        moviesTable.innerHTML = '';
        movies.forEach(movie => {
            const newRow = moviesTable.insertRow();
            Object.values(movie).forEach(value => {
                const newCell = newRow.insertCell();
                newCell.textContent = value;
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Supprimer';
            deleteBtn.onclick = function () {
                if (confirm('Êtes-vous sûr de vouloir supprimer ce film ?')) {
                    const index = movies.indexOf(movie);
                    if (index > -1) {
                        movies.splice(index, 1);
                        displayMovies();
                    }
                }
            };
            const actionCell = newRow.insertCell();
            actionCell.appendChild(deleteBtn);
        });
    }

    /**
     * Ajoute un nouveau film à la liste.
     * @param {string} title - Le titre du film.
     * @param {string} year - L'année de sortie du film.
     * @param {string} author - Le réalisateur du film.
     */
    function addMovie(title, year, author) {
        const newMovie = {
            title: title.charAt(0).toUpperCase() + title.slice(1).toLowerCase(),
            year: year,
            author: author.charAt(0).toUpperCase() + author.slice(1).toLowerCase()
        };
        movies.push(newMovie);
        displayMovies();
    }

    /**
     
     * @param {Event} event 
     */
    addMovieForm.onsubmit = function (event) {
        event.preventDefault();
        const title = addMovieForm.title.value.trim();
        const year = addMovieForm.year.value.trim();
        const author = addMovieForm.author.value.trim();
        
        let errorMessages = '';
        if (!/^[a-zA-Z0-9 ]+$/.test(title) || title.length < 2) {
            errorMessages += 'Le titre doit contenir au moins 2 caractères et ne doit pas contenir de caractères spéciaux.\n';
        }
        if (year.length !== 4 || isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            errorMessages += `L'année doit être un nombre de 4 chiffres compris entre 1900 et ${new Date().getFullYear()}.\n`;
        }
        if (!/^[a-zA-Z0-9 ]+$/.test(author) || author.length < 5) {
            errorMessages += 'L\'auteur doit contenir au moins 5 caractères et ne doit pas contenir de caractères spéciaux.\n';
        }
        
        if (errorMessages) {
            alert('Erreur dans le formulaire:\n' + errorMessages);
        } else {
            addMovie(title, year, author);
            alert('Film ajouté avec succès');
            addMovieForm.reset();
        }
    };

    /**
     
     */
    addMovieBtn.onclick = function () {
        addMovieForm.style.display = addMovieForm.style.display === 'none' ? 'block' : 'none';
    };

    /**
     
     */
    filterSelect.onchange = function () {
        if (filterSelect.value === 'title') {
            movies.sort((a, b) => a.title.localeCompare(b.title));
        } else if (filterSelect.value === 'year') {
            movies.sort((a, b) => b.year - a.year);
        }
        displayMovies();
    };

    
    displayMovies();
});
