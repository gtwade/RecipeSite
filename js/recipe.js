document.onload = init();

function init() {
    var recipeId = sessionStorage.getItem("id");
    if (recipeId != null && recipeId != "") {
        loadRecipe(recipeId);
    }
}

function loadRecipe(id) {

    var data = getRecipe(id);

    var title = data.title;
    var desc = data.description;
    var imageUrl = data.images["medium"];

    document.getElementById("recipeName").innerHTML = title;
    document.getElementById("breadcrumb").innerHTML = title;
    document.getElementById("description").innerHTML = desc;

    // get ingredients
    var ingreds = data.ingredients;
    var ingredientSection = document.getElementById("ingredientListWrapper");
    
    for (i in ingreds) {
        var ingredient = ingreds[i];
        var ingredientBlock = getIngredientBlock(ingredient);
        
        ingredientSection.appendChild(ingredientBlock);
    }

    // get instructions
    var list = data.directions;
    var directions = document.getElementById("instList");

    for (i in list) {
        var instruction = "";

        if(list[i].optional) {
            instruction = instruction + "(optional) ";
        }

        instruction = instruction + list[i].instructions;
        var step = document.createElement('li');
        step.innerHTML = instruction;

        directions.appendChild(step);
    }

    document.getElementById('pic').src = imageUrl;
}

function getIngredientBlock(i) {
    var specialsIncluded = includedSpecials(i.uuid);

    var block = document.createElement('div');
    block.classList.add("ingredientWrapper");

    var ingredient = document.createElement('div');
    ingredient.classList.add("ingredient");

    var ingredientText = "";
    ingredientText = ingredientText + i.amount + " ";

        if(i.measurement != "") {
            ingredientText = ingredientText + i.measurement + " ";
        }

        ingredientText = ingredientText + i.name;

    ingredient.innerHTML = ingredientText;
    block.appendChild(ingredient);

    if(specialsIncluded.length > 0) {
        for (s in specialsIncluded) {
            var specialBlock = document.createElement('div');
            specialBlock.classList.add("specials");

            var special = getSpecial(specialsIncluded[s]);
            var specialText = "<b>" + special.title + "</b> - " + special.text;
            specialText = specialText + "<br><em>Tags:</em> " + special.type;
            specialBlock.innerHTML = specialText;
            block.appendChild(specialBlock);
        }
    }

    return block;
}

function includedSpecials(ingredientId) {
    var specials = getSpecialsList();
    var matchedSpecials = [];

    for (s in specials) {
        if (ingredientId == specials[s].ingredientId) {
            matchedSpecials.push(specials[s].uuid);
        }
    }

    return matchedSpecials;
}

function getRecipe(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3001/recipes/" + id, false );
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}

function getSpecialsList() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3001/specials", false);
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}

function getSpecial(id) {
    var url = "http://localhost:3001/specials/" + id;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}