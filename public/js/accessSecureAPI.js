function getSecureAPI(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://us-central1-webapp-2f506.cloudfunctions.net/authorizedendpoint");

    xhr.onreadystatechange =  function () {
    var DONE = 4;
    var OK = 200;
    if(xhr.readyState === DONE) {
        if (xhr.status === OK) {
            console.log = xhr.responseText;
            response.innerHTML = xhr.responseText;
        }
    } else {
        response.innerHTML = "Unauthorized to view this content";
        console.log("Error: " + xhr.status);
        }
    };
    xhr.setRequestHeader("Authorization","Bearer " + getCookie('accessToken'));
    xhr.send(null);
}

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for(var i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function logout(){
    firebase.auth().signOut().then(() =>{
        console.log("Sing out successful");
        document.cookie = "accessToken= ";
        window.location.href = "/index.html";
    })
    .catch((error)=>{ });
}