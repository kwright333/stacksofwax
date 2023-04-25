async function likeVinyl(id) {
    const data = {
        memberId: 1
    };

    await fetch(`/api/vinyls/${id}/like`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

async function likeVinylCollection(id) {
    await fetch(`/api/vinyl-collections/${id}/like`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function filterVinylsByGenre(genre) {
    const response = await fetch(`api/vinyls/by-genre/${genre}`);
    const html = await response.text();

    document.getElementById("vinyls-list").innerHTML = html;
}

async function filterVinylsByArtist(artist) {
    const response = await fetch(`api/vinyls/by-artist/${artist}`);
    const html = await response.text();

    document.getElementById("vinyls-list").innerHTML = html;
}

async function orderVinylsByMostLiked() {
    const response = await fetch(`api/vinyls/mostLiked`);
    const html = await response.text();

    document.getElementById("vinyls-list").innerHTML = html;
}

async function orderVinylsByLeastLiked() {
    const response = await fetch(`api/vinyls/leastLiked`);
    const html = await response.text();

    document.getElementById("vinyls-list").innerHTML = html;
}

let selectedVinylsHtml = {};
let selectedVinyls = [];

function addToVinylList(vinylId, album) {
    console.log(vinylId);
    const vinylList = document.getElementById("vinyl-list");
    vinylList.innerHTML += `<li id="vinyl-selected-${vinylId}">${album} <i onclick="removeFromVinylList(${vinylId})" class="fa fa-thin fa-delete-left" style="color: #40454f;"></i></li>`

    const vinylOption = document.getElementById(`vinyl-option-${vinylId}`);
    selectedVinylsHtml[`vinyl-option-${vinylId}`] = vinylOption.outerHTML;
    selectedVinyls.push(vinylId);
    vinylOption.remove();
}

function removeFromVinylList(vinylId) {
    document.getElementById(`vinyl-selected-${vinylId}`).remove();
    const vinylSelection = document.getElementById("vinyl-selection");
    vinylSelection.innerHTML += selectedVinylsHtml[`vinyl-option-${vinylId}`];
    delete selectedVinylsHtml[`vinyl-option-${vinylId}`];
    const index = selectedVinyls.indexOf(vinylId);
    selectedVinyls.splice(index, 1);
}

function clearSelection() {
    selectedVinylsHtml = {};
    selectedVinyls = [];
    window.location.reload();
}

async function createVinylCollection() {
    const collectionNameElement = document.getElementById("collection-name");
    const descriptionElement = document.getElementById("collection-description");

    const data = {
        collectionName: collectionNameElement.value,
        description: descriptionElement.value,
        vinylIds: selectedVinyls
    };
    const response = await fetch(`/api/vinyl-collections`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.status == 200) {
        selectedVinylsHtml = {};
        selectedVinyls = [];
        window.location.reload();
    }
}