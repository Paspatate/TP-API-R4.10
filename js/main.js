const API_ENDPOINT = "https://mars-photos.herokuapp.com/api/v1";

let showRovers = function(rovers) {
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

fetch(API_ENDPOINT + "/rovers")
    .then(res => res.json())
    .then(res => {
        console.log(res);
        showRovers(res.rovers);
    }).catch((err) => {console.error("Error when loading rover"); console.error(err)});

view.btn_s
