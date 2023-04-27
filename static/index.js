async function likeVinyl(id) {
    const csrfToken = document.getElementById(`search-csrf`).value;

    const data = {
        _csrf: csrfToken
    };

    await fetch(`/api/vinyls/${id}/like`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const element = document.getElementById(`like-count-${id}`);

    const newLikeCount = parseInt(element.innerHTML.trim()) + 1;

    element.innerHTML = `${newLikeCount}`;
}

async function likeVinylCollection(id) {
    const csrfToken = document.getElementById(`search-csrf`).value;

    const data = {
        _csrf: csrfToken
    };

    await fetch(`/api/vinyl-collections/${id}/like`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    const element = document.getElementById(`like-count-${id}`);

    const newLikeCount = parseInt(element.innerHTML.split(':')[1].trim()) + 1

    element.innerHTML = `Likes: ${newLikeCount}`;
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

function addToVinylList(value) {
    const { vinylId, album, collectionId } = JSON.parse(value);

    console.log(vinylId);
    const vinylList = document.getElementById(`vinyl-list-${collectionId}`);
    vinylList.innerHTML += `<li data-vinyl-id="${vinylId}" data-album="${album}" id="vinyl-selected-${vinylId}">${album} <i onclick="removeFromVinylList('${vinylId}', '${collectionId}')" class="fa fa-thin fa-delete-left" style="color: #40454f;"></i></li>`

    const vinylOption = document.getElementById(`vinyl-option-${vinylId}`);
    selectedVinylsHtml[`vinyl-option-${vinylId}`] = vinylOption.outerHTML;
    selectedVinyls.push(vinylId);
    vinylOption.remove();
}

function removeFromVinylList(vinylId, collectionId) {
    document.getElementById(`vinyl-selected-${vinylId}`).remove();
    const vinylSelection = document.getElementById(`vinyl-selection-${collectionId}`);
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

function editVinylCollection(collectionId) {
    console.log('test')
    const selectedList = document.getElementById(`vinyl-list-${collectionId}`).children;

    for (const element of selectedList) {
        const vinylId = element.getAttribute('data-vinyl-id');
        const album = element.getAttribute('data-album');

        selectedVinylsHtml[`vinyl-option-${vinylId}`] = `<option id="vinyl-option-${vinylId}" onclick="addToVinylList('${vinylId}', '${album}')">${album}</option>`;
        selectedVinyls.push(vinylId);
    }
}

async function createVinylCollection() {
    const collectionNameElement = document.getElementById("collection-name");
    const descriptionElement = document.getElementById("collection-description");

    const data = {
        collectionName: collectionNameElement.value,
        description: descriptionElement.value,
        vinylIds: selectedVinyls,
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

async function updateVinylCollection(collectionId) {
    const collectionNameElement = document.getElementById(`collection-name-${collectionId}`);
    const descriptionElement = document.getElementById(`collection-description-${collectionId}`);

    const data = {
        collectionName: collectionNameElement.value,
        description: descriptionElement.value,
        vinylIds: selectedVinyls,
        collectionId
    };
    const response = await fetch(`/api/vinyl-collections`, {
        method: 'PUT',
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

async function addComment(collectionId) {
    const commentInput = document.getElementById(`collection-comment-input-${collectionId}`);
    const csrfToken = document.getElementById(`search-csrf`).value;

    const data = {
        vinylCollectionId: collectionId,
        comment: commentInput.value,
        _csrf: csrfToken
    };
    const response = await fetch(`/api/vinyl-collections/${collectionId}/comment`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.status == 200) {
        const comments = document.getElementById(`comments-list-${collectionId}`);
        const newComment = await response.text();

        comments.innerHTML += newComment

        commentInput.text = '';
    }
}

async function search() {
    const searchInput = document.getElementById(`search-input`);
    const csrfToken = document.getElementById(`search-csrf`).value;

    const data = {
        searchText: searchInput.value,
        _csrf: csrfToken
    };
    const response = await fetch(`/api/search`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const content = await response.text();

        document.getElementById('search-results').innerHTML = content;

        const dropdownToggleElement = document.getElementById('search-addon');
        const dropdown = new bootstrap.Dropdown(dropdownToggleElement);
        dropdown.show();
    }
}