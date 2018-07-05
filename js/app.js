// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "c470735f5d6143a9a09869bf563b8eae";


// Init elements
const select = document.getElementById("country");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const category = document.getElementById("category");
const newsSources = document.getElementById("newsSource");

// All events
select.addEventListener("change", onChangeCountry);
category.addEventListener("change", onChangeCategory);
newsSources.addEventListener("change", onChangeNewsSource);
searchBtn.addEventListener("click", onSearch);

// Event handlers
function onChangeCountry(e) {
  // Показываю прелодер
  ui.showLoader();
  // Делаем запрос на получение новостей по выбранной стране

  http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&apiKey=${apiKey}`, parser);

}

function onChangeCategory(e) {
    // Показываю прелодер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранной стране
    if(select.value.length){
      let url = `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`;
      http.get(url, parser);
    }
}

function onChangeNewsSource(e) {
    // Показываю прелодер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранной стране
    http.get(`https://newsapi.org/v2/top-headlines?sources=${newsSources.value}&apiKey=${apiKey}`, parser);

}

function onSearch(e) {
  // Делаем запрос на получение новостей по тому что введено в инпут
  //   document.forms['searching'].addEventListener('submit', function(e) {
  //       e.preventDefault();
        http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, parser);

    // });
}

function parser(err, res) {
    if (err) return ui.showError(err);

    const response = JSON.parse(res);

    if (response.totalResults) {
        // Удаляем разметку из контейнера
        ui.clearContainer();
        // перебираем новости из поля articles в объекте response
        response.articles.forEach(news => ui.addNews(news));
    } else {
        ui.showInfo(`Новин по Вашому запиту: " ${select.value} ${category.value} ${newsSources.value} ${searchInput.value} " - не знайдено`);
    }
    document.forms['searching'].reset();
}


// Отдельный запрос на получение ресурсов
// генерируем селект с ресурсами
// <option value="abc-news">Abc News</option>
// при выборе ресурса подгружаете новости с этим ресурсом
// возможность выбора новостей по категории и стране
// Если новостей нет по выбранной категоррии нужно вывести что "Новости по категории такой то по стране такойто не найдены"
