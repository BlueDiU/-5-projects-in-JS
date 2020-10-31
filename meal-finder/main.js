//  Globals
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEL = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEL = document.getElementById('single-meal');

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  //condicion ? true:false es sugar sintax del if/else
  single_mealEL.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
           <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${
                  meal.strCategory
                    ? `<p class="center">${meal.strCategory}</p>`
                    : ''
                } 
                ${meal.strArea ? `<p class="center">${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map((ing) => `<li>${ing}</li>`).join()}
                </ul>
            </div>
        </div> 
    `;
}

// Search meal and fetch from API
class Meal {
  async searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    single_mealEL.innerHTML = '';

    // Get search term
    const term = search.value;

    // Check for empty
    if (term.trim()) {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
      );

      const data = await res.json();

      resultHeading.innerHTML = `<h2>Search results for ${term}:</h2>`;

      if (data.meals === null) {
        resultHeading.innerHTML = `<p>There are no results. Try again!</p>`;
      } else {
        mealsEL.innerHTML = data.meals
          .map(
            (
              meal //return
            ) =>
              `<div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>    
                        </div>
                        `
          )
          .join('');

        //Clear search text
        search.value = '';
      }
    } else {
      alert('Please enter a search term');
    }
  }

  // Fetch meal by ID
  async getMealById(mealID) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );

    const data = await res.json();

    const meal = data.meals[0];

    addMealToDOM(meal);
  }

  // Fetch random meal from API
  async getRandomMeal() {
    // Clear meals and heading
    mealsEL.innerHTML = '';
    resultHeading.innerHTML = '';

    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );

    const data = await resolve.json();
    const meal = data.meals[0];

    addMealToDOM(meal);
  }
}

// Intance my class Meal
const m = new Meal();

// Event Listeners

submit.addEventListener('submit', m.searchMeal);
random.addEventListener('click', m.getRandomMeal);

mealsEL.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    m.getMealById(mealID);
  }
});
