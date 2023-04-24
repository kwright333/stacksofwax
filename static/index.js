async function likeVinyl(id) {
    const data = {
        memberId: 1
    };

    await fetch(`api/vinyls/${id}/like`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

async function likeVinylCollection(id) {
    await fetch(`api/vinyl-collections/${id}/like`);
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

async function addVinylCollection() {
    const response = await fetch(`api/vinyls/leastLiked`);
    const html = await response.text();

    document.getElementById("vinyls-list").innerHTML = html;
}