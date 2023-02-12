const mealList = document.getElementById('mealList');
const searchBar = document.getElementById('searchBar');
let menu = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredMeals = menu.filter((meal) => {
        return (
            meal.strMeal.toLowerCase().includes(searchString) ||
            meal.strCategory.toLowerCase().includes(searchString)
            
        );
    });
    displayMenu(filteredMeals);
});

const loadMeal= async () => {
    try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        menu = await res.json();
        displayMenu(menu);
    } catch (err) {
        console.error(err);
    }
};

const displayMenu = (meals) => {
    const htmlString = meals
        .map((meal) => {
            return `
            <li class="meal">
                <h2>${meal.strMeal}</h2>
                <p>House: ${meal.strCategory}</p>
                <img src="${meal.strMealThumb}"></img>
            </li>
        `;
        })
        .join('');
    mealList.innerHTML = htmlString;
};

loadMeal();
