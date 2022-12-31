//*****************************************************************************
//*****************************************************************************
//*****************************************************************************
// function declarations and imports at the top

// function calls at the bottom

// This file sets a general document listener that fetches a set of stories based on a country id and saves those
// stories to local storage under the key "search-results"
//*****************************************************************************
//*****************************************************************************
//*****************************************************************************

import ids from "../countries.js";

function doThing(event) {
    let id;
    if (event.srcElement.id == "" && event.srcElement.parentElement !== null) {
        //if no id, go to parent element and get that id
        id = event.srcElement.parentElement.id;
    }
    else {
        id = event.srcElement.id
    }
    ids.find((currentId) => {
        if (currentId.countryId == id && id !== null) {
            let searchURL = `${location.protocol}//${location.host}/search?country=${id}`;
            fetch(searchURL)
                .then((res) => res.json())
                .then((body) => {
                    localStorage.setItem("search-results", JSON.stringify(body));
                }).then(() => { window.location.href = '../views/results.html'; });
        }
    });
}

function search() {
    let country = document.getElementById("country").value;
    let searchURL = `${location.protocol}//${location.host}/search?country=${country}`;
    fetch(searchURL)
        .then((res) => res.json())
        .then((body) => {
            localStorage.setItem("search-results", JSON.stringify(body));
        }).then(() => { window.location.href = '../views/results.html'; });
}

//*****************************************************************************
//*****************************************************************************
//*****************************************************************************

document.addEventListener('click', doThing);

if (document.getElementById('searchButton')) {
    document.getElementById('searchButton').addEventListener('click', search);
}