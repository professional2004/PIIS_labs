// Создание объекта personalMovieDB с необходимыми свойствами
const personalMovieDB = {
    privat: false, 
    movies: {
        "Чужой: Вторжение": 7,
        "Интерстеллар": 10,
        "Шрек 4": 10
    }
};

// Функция для вывода таблицы фильмов на страницу
function showMovies() {
    if (!personalMovieDB.privat) {
        const movieTableDiv = document.getElementById('movie_table_div');
        let table = '<table style="border: 1px solid black;"><tr><th>Movie</th><th>Rating</th></tr>';

        for (let movie in personalMovieDB.movies) {
            table += `<tr><td>${movie}</td><td>${personalMovieDB.movies[movie]}</td></tr>`;
        }

        table += '</table>';
        movieTableDiv.innerHTML = table; 
    }
}

// Вызов функции
showMovies();
