// addEventListener("load", (event) => {
//     const myRequest = new Request("http://localhost:3000/data");
    
//     fetch(myRequest).then(response => {
//         console.log(response);
//         return response.json()
//     }).then(json => {
//         document.getElementById("test").innerText = JSON.stringify(json);
//     });
// });

function showAlbumModal() {
    const options = {

    }
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), options)
}