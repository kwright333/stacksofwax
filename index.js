addEventListener("load", (event) => {
    const myRequest = new Request("http://localhost:3000");
    
    fetch(myRequest).then(response => {
        document.getElementById("test").innerText = response;
    })
})