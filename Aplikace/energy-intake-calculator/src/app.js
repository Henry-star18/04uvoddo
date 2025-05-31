const foodNutritionalValues = {
    "apple": 52, // calories per 100g
    "banana": 89,
    "orange": 47,
    "chicken": 239,
    "rice": 130,
    "broccoli": 55,
    "potato": 77,
    "bread": 265
};

let items = [];

function addItem() {
    const foodInput = document.getElementById('food-input').value.toLowerCase();
    const weightInput = document.getElementById('weight-input').value;

    if (!validateInput(foodInput, weightInput)) {
        return;
    }

    const weight = parseFloat(weightInput);
    const calories = calculateCalories(foodInput, weight);

    if (calories !== null) {
        items.push({ food: foodInput, weight: weight, calories: calories });
        updateDOM();
        clearInputs();
    } else {
        displayError("Food item not found in the nutritional dictionary.");
    }
}

function validateInput(food, weight) {
    if (!food || !weight || isNaN(weight) || weight <= 0) {
        displayError("Please enter a valid food item and weight.");
        return false;
    }
    return true;
}

function calculateCalories(food, weight) {
    if (foodNutritionalValues[food]) {
        return (foodNutritionalValues[food] * weight) / 100;
    }
    return null;
}

function updateDOM() {
    const totalCalories = items.reduce((total, item) => total + item.calories, 0);
    document.getElementById('total-calories').innerText = `Total Energy Intake: ${totalCalories.toFixed(2)} calories`;
    document.getElementById('item-list').innerHTML = items.map(item => `<li>${item.food} (${item.weight}g): ${item.calories.toFixed(2)} calories</li>`).join('');
}

function clearInputs() {
    document.getElementById('food-input').value = '';
    document.getElementById('weight-input').value = '';
    clearError();
}

function displayError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.innerText = message;
    errorElement.style.display = 'block';
}

function clearError() {
    const errorElement = document.getElementById('error-message');
    errorElement.innerText = '';
    errorElement.style.display = 'none';
}

document.getElementById('add-button').addEventListener('click', addItem);