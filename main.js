// fetch("http://localhost:8089/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         console.table(parsedFoods)
//     })

// let addClass = document.getElementById("food").classList.add("foodList")
// console.log(addClass)

function addFoodToDom(foodItem) {
    return `
    <h1>${foodItem.name}</h1>
    <h4>Category: ${foodItem.category}<h4>
    <h4>Ethnicity: ${foodItem.ethnicity}<h4>
    <h4>Ingredients: ${foodItem.ingredients}
    `

}

// function foodFactory(foo) {
//     targetClass = document.querySelector(".foodLIst")

// }

fetch("http://localhost:8089/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        let foodToDom = document.querySelector(".foodList")
        parsedFoods.forEach(food => {
            foodToDom.innerHTML += addFoodToDom(food)
        })
    })
/* Another way to do the above fetch*/
// fetch("http://localhost:8089/food")
// .then(function (food) {
//     return food.json()
// })
// .then(function (food) {
//     let foodContainer = document.querySelector(".foodList")
//     food.forEach(function (item) {
//         foodContainer.innerHTML += addFoodToDom(item)
//     })
// })

fetch("http://localhost:8089/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }
                    let foodToDom = document.querySelector(".ingredients")
                    foodToDom.innerHTML += addFoodToDom(food)
                })
        })
    })
