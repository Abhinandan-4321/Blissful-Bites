const randomImage = document.getElementById("random-image")
const randomText = document.getElementById("random-text")

// Random Meal
function getRandomMeal(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data)
        randomMealsData(data);
        instructions(data)
        let req = ingrData(data)
        console.log(req)
        ingredientsList(req)
    })
    .catch((error)=>{
        return console.log("The API is unable to fetch the data",error)
    })
}

// Random meal Image and Name
function randomMealsData(data){
    if(data.meals.length>0){
        
        const generatedMeal = data.meals[0];
        const mealImage = document.createElement('img')
        mealImage.src = generatedMeal.strMealThumb;
        mealImage.setAttribute("id", "random-generated-image")

        const mealName = document.createElement('p')
        // console.log(generatedMeal.strMeal)
        mealName.innerText = generatedMeal.strMeal;
        mealName.setAttribute("id", "random-generated-text")
        
        randomImage.innerHTML=""
        randomText.innerHTML=""

        randomImage.append(mealImage);
        // console.log(mealName)
        randomText.append(mealName)
    } 
}

getRandomMeal();

// Page refreshing on click of the generate new image button
let refreshBtn = document.getElementById("random-generator-button")
refreshBtn.addEventListener("click",()=>{
    location.reload();
})


// Search bar Functionality

let searchInput = document.getElementById("search-input-box")
let searchBtn = document.getElementById("searchBtn")

let foodGrid = document.getAnimations("foodGrid") 


// Fetching data for the grid
function fetchingGrid(value){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data);  
        displayMealGrid(data.meals)
    })
    
    .catch((error)=>{
        return console.log("The API is unable to fetch the data",error)
    })
}


// Meals displaying function
function displayMealGrid(meals){
    const foodGrid = document.getElementById("foodGrid")
    foodGrid.innerHTML="";
    if(meals){
        meals.forEach((element)=>{
            const mealDiv = document.createElement('div')
            mealDiv.setAttribute('id','mealDiv');
            mealDiv.setAttribute('onclick',`popbyID(${element.idMeal})`)
            
            const ImageInMealDiv = document.createElement('img')
            ImageInMealDiv.setAttribute('id','mealImage')
            ImageInMealDiv.src = element.strMealThumb
            console.log(element.strMealThumb)
            
            const textInsideMealDiv = document.createElement('p')
            textInsideMealDiv.setAttribute('id', 'mealText')
            textInsideMealDiv.textContent = element.strMeal
            
            mealDiv.appendChild(ImageInMealDiv);
            mealDiv.appendChild(textInsideMealDiv)
            
            foodGrid.append(mealDiv)
        })
    }
    else{
        foodGrid.innerHTML = `<p id=noRecipe>No recipe is found with the entered item.</p>`
    }
}


// On Click
searchBtn.addEventListener("click", ()=>{
    const value = searchInput.value
    searchBtn.style.transform = "scale(0.8)" ;
    fetchingGrid(value)
    
})

// On Keydown
searchInput.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        const value = searchInput.value;
        fetchingGrid(value);
    }
});

//Started button
let btn = document.getElementById("started-btn");
let newBtn = document.getElementById("new-started-btn");

btn.addEventListener("click", () => {
    setTimeout(() => {
        scroll();
    }, 100);
});
newBtn.addEventListener("click", () => {
    setTimeout(() => {
        scroll();
    }, 100);
});
// Scroll Function
function scroll() {
    const targetElement = document.documentElement || document.body;
    searchBtn.scrollIntoView({ behavior: "smooth" });
}

// onclick for random popup
let randomClickImage  = document.getElementById("random-image")
let popup = document.getElementById("popup-for-random");
let crossBtn = document.getElementById("cross")

randomClickImage.addEventListener("click", ()=>{
    popup.style.display = 'block';
})

// Cross Button
crossBtn.addEventListener("click", ()=>{
    popup.style.display = 'none';
})


// Functions for random food details popup
let instStr = document.getElementById("instructions")

function instructions(data){
    let instData = data.meals[0].strInstructions

    console.log(instData)
    instStr.textContent = instData;
}


function ingrData(data){
    console.log(data.meals[0])
    const array = [];
    for(let i=1; i<=20; i++){
        if(`${data.meals[0][`strIngredient${i}`]}`){
            array.push(`${data.meals[0][`strIngredient${i}`]} - ${data.meals[0][`strMeasure${i}`]}`)
        }
        else{
            break;
        }
        console.log("hello")
    }
    return array;
}


let list = document.getElementById('listItem')
function ingredientsList(array){
    list.innerHTML=""
    for(let i=0; i<array.length; i++){
        const liTag = document.createElement('li')
        liTag.setAttribute('id', 'itemInList')
        const span = document.createElement('span')
        span.innerHTML = array[i];
        liTag.appendChild(span);
        list.appendChild(liTag)
        console.log("hello")
    }
}

function popbyID(idMeal){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data);
        instructions(data)
        let req = ingrData(data)
        console.log(req)
        ingredientsList(req)
        popup.style.display = 'block';
    })
}
