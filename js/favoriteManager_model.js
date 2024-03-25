let favorite_list = [];

/**
 * Affiche dans le DOM les favoris de favorite_list
 */
let showFavorits = function () {
    view.ul_favorite.replaceChildren();
    for (const fav of favorite_list) {
        let list_elem = document.createElement("li");
        let span_elem = document.createElement("span");
        let cross_img_elem = document.createElement("img");

        cross_img_elem.src = "images/croix.svg";
        cross_img_elem.width = 15;

        cross_img_elem.addEventListener("click", () => {
            removeFavoris(fav);
            saveFavorisToClient();
        });

        span_elem.innerText = "Rover : " + fav.getRover() + ", Date : " + fav.getDate();
        span_elem.addEventListener("click", () => {
            loadFavorite(fav);
        });

        if (fav.getCamera() !== null) {
            span_elem.innerText += fav.getCamera();
        }

        list_elem.appendChild(span_elem);
        list_elem.appendChild(cross_img_elem);
        view.ul_favorite.appendChild(list_elem);
    }
};

/**
 * supprime une configuration favorite
 * @param {Config} un favoris a supprimé
 */
let removeFavoris = function (favoris) {
    for (i in favorite_list) {
        if (favorite_list[i].compareTo(favoris) == 0) {
            favorite_list.splice(i, 1);
        }
    }
    showFavorits();
};

/**
 * Charge une config favorite dans le DOM et lance l'affichage des photos
 * @param {Config} favorite la config a charger
 */
let loadFavorite = function (favorite) {
    let rg_rover = document.querySelectorAll('input[name="rover"]');
    for (rover_elem of rg_rover) {
        if (rover_elem.value.toLowerCase() == favorite.getRover()) {
            rover_elem.checked = true;
        }
    }
    view.date_earthDate.value = favorite.getDate();
    fetchPhotoFromConfig(favorite);
};

/**
 * Test si une configuration est dans les favoris ou non
 * @param {Config} config config a tester
 * @returns true si config dans les favoris, false sinon
 */
let configInFav = function (config) {
    for (const conf of favorite_list) {
        if (conf.compareTo(config) == 0) {
            return true;
        }
    }
    return false;
};

let saveFavorisToClient = function () {
    let toSave = JSON.stringify(favorite_list);
    localStorage.setItem("favoris", toSave);
};

let loadFavorisFromClient = function () {
    if (localStorage.getItem("favoris")) {
        let storage_list = JSON.parse(localStorage.getItem("favoris"));
        for (obj of storage_list) {
            favorite_list.push(new Config(obj.mRover, obj.mDate, obj.mCamera));
        }
        showFavorits();
    }
};
