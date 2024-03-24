const API_BASEURL = "https://mars-photos.herokuapp.com/api/v1";
let favorite_list = [];

let showRovers = function (rovers) {
    for (const rover of rovers) {
        let list_elem = document.createElement("li");

        let input_elem = document.createElement("input");
        input_elem.type = "radio";
        input_elem.value = rover.name;
        input_elem.id = rover.id;
        input_elem.name = "rover";

        let checkbox_label_elem = document.createElement("label");
        checkbox_label_elem.setAttribute("for", rover.id);
        checkbox_label_elem.innerText = rover.name;

        list_elem.appendChild(input_elem);
        list_elem.appendChild(checkbox_label_elem);

        view.ul_rovers.appendChild(list_elem);

        input_elem.addEventListener("click", function(){
            view.btn_search.classList.add("btn_clicable");
            view.btn_favoris.classList.add("btn_clicable");
            
        })
    }
};

let showError = function (err) {
    console.error("Une erreur est survenue");
    console.error(err);
    alert("une erreur est survenue");
};

let showPhoto = function (photos) {
    console.log(photos);
    view.div_result.replaceChildren();
    for (const photo of photos) {
        const base_div_elem = document.createElement("div");
        const img_elem = document.createElement("img");
        const text_elem = document.createElement("p");

        img_elem.src = photo.img_src;
        text_elem.setAttribute("for", photo.id);
        text_elem.innerText = photo.earth_date + ", " + photo.rover.name + ", " + photo.sol + " jour(s) martien(s) après l'arrivée du rover";


        base_div_elem.appendChild(img_elem);
        base_div_elem.appendChild(text_elem);
        view.div_result.appendChild(base_div_elem);
    }
};

let showFavorits = function () {
    view.ul_favorite.replaceChildren();
    for (const fav of favorite_list) {
        let list_elem = document.createElement("li");
        let span_elem = document.createElement("span");
        
        span_elem.innerText = "Rover : " + fav.getRover() + ", Date : " + fav.getDate();
        span_elem.addEventListener("click", () => {
            loadFavorite(fav);
        })
        
        if (fav.getCamera() !== null) {
            span_elem.innerText += fav.getCamera();
        }

        list_elem.appendChild(span_elem);
        view.ul_favorite.appendChild(list_elem);
    }
};

let loadFavorite = function(favorite) {
    let rg_rover = document.querySelectorAll('input[name="rover"]');
    for(rover_elem of rg_rover) {
        if (rover_elem.value.toLowerCase() == favorite.getRover()) {
            rover_elem.checked = true;
        }
    }
    view.date_earthDate.value = favorite.getDate();
    fetchPhotoFromConfig(favorite);
}

/**
 * @param {Config} config configuration pour la recherche
 */
let fetchPhotoFromConfig = function (config) {
    fetch(API_BASEURL + config.getQueryUrl())
        .then((result) => result.json())
        .then((result) => {
            showPhoto(result.photos);
        });
};

/**
 * Test si une configuration est dans les favoris ou non
 * @param {Config} config config a tester
 * @returns true si config dans les favoris, false sinon
 */
let configInFav = function(config) {
    for (const conf of favorite_list) {
        if (conf.compareTo(config) == 0) {
            return true;
        }
    }
    return false;
}

fetch(API_BASEURL + "/rovers")
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        showRovers(res.rovers);
    })
    .catch((err) => {
        console.error("Error when loading rover");
        console.error(err);
    });


fetch(API_BASEURL + "/rovers/perseverance/photos?earth_date=2023-03-10&camera=mcz_right&page=1")
    .then((res) => res.json())
    .then((res) => {
        showPhoto(res.photos);
    })
    .catch((err) => {
        showError(err);
    });

view.btn_search.addEventListener("click", function () {
    // créé une configuration a partire des options coché puis appeller une fonction pour faire l'affichage du résultat
    let choosed_rover = document.querySelector('input[name="rover"]:checked').value;
    let choosed_date = view.date_earthDate.value;
    const config = new Config(choosed_rover, choosed_date);

    fetchPhotoFromConfig(config);
});

view.btn_addFavorite.addEventListener("click", function() {
    let date = view.date_earthDate.value;
    let rover = document.querySelector('input[name="rover"]:checked').value;
    let fav_config = new Config(rover, date);
    
    if (!configInFav(fav_config)) {
        favorite_list.push(fav_config);
    }

    showFavorits();
});
