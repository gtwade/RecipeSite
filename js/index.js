document.onLoad = init();

function init() {
    //alert("Hello there");
    var theTable = document.getElementById("tblRecipes");
    
    theTable.style.backgroundolor = "yellow";
    loadListPageData();
}

function loadListPageData() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3001/recipes", false);
    xhttp.send();
    var data = JSON.parse(xhttp.responseText);
    var tbl = document.getElementById("tblRecipes");

    for (r in data) {
        var recip = data[r];
        var row = tbl.insertRow();

        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);

        var buttonScript = "openRecipe('" + recip.uuid + "')";

        cell0.innerHTML = "<button id='btnOpen' onClick=" + buttonScript + ">Open</button>";
        cell1.innerHTML = recip.title;
        cell2.innerHTML = recip.description;
        cell3.innerHTML = "<img src='" + recip.images["small"] + "' />";
    }
}

function openRecipe(id) {
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("id", id);
    window.location.assign("recipe.html");
}