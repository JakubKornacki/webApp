function register(){
    let email = document.getElementById("exampleInputEmail1").value;
    let password = document.getElementById("exampleInputPassword1").value;

    firebase.auth().createUserWithEmailAndPassword(email,password).then((userCredential)=>{
        var user = userCredential.user;
        window.location.href = "/secure.html";
        console.log(user);
    })
    .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage,errorCode);
    })
}