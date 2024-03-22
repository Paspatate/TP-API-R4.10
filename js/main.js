const API_BASEURL = "https://mars-photos.herokuapp.com/api/v1";

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
    }
};

let showError = function(err) {
    console.error("Une erreur est survenue");
    console.error(err)
    alert("une erreur est survenue");
}

let showPhoto = function(photos) {
    console.log(photos);
    for (const photo of photos) {
        const base_div_elem = document.createElement("div");
        const img_elem = document.createElement("img");

        img_elem.src = photo.img_src;

        base_div_elem.appendChild(img_elem);
        view.div_result.appendChild(base_div_elem);
    }
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

view.btn_search.addEventListener("click", function () {
    // créé une configuration a partire des options coché puis appeller une fonction pour faire l'affichage du résultat
});

fetch(API_BASEURL + "/rovers/perseverance/photos?sol=0&page=1")
    .then((res) => res.json())
    .then((res) => {
        showPhoto(res.photos);
    })
    .catch((err) => {
        showError(err);
    });
