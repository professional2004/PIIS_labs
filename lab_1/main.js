// Вопрос пользователю
let numberOfFilms = Number(prompt('Сколько фильмов вы уже посмотрели?', ''));

// Создание объекта
const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
};

// Вопросы пользователю и обработка ответов
for (let i = 0; i < 2; i++) {
    let movie = prompt('Один из последних просмотренных фильмов?', '').trim();
    let rating = prompt('На сколько оцените его?', '').trim();

    // Проверка условий: пустая строка, отмена, длина больше 50 символов
    if (movie && movie.length <= 50 && rating && rating !== null) {
        personalMovieDB.movies[movie] = rating;
    } else {
        i--; // Возвращение к вопросам, если проверка не пройдена
    }
}

// Вывод объекта в консоль
console.log(personalMovieDB);
