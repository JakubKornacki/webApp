function postcomment(){
    var xreq = new XMLHttpRequest();
    xreq.open("POST","https://us-central1-webapp-2f506.cloudfunctions.net/postcomments");
    xreq.setRequestHeader("Content-type", "application/json");
    xreq.onreadystatechange = function() {
        var ok = 200;
        var done = 4;
        if(xreq.readyState === done){
            if(xreq.status === ok){
                getcomments();
            }
            else{
                console.log("Error! Status Code: " + xreq.status);
            }
        }
    };
    xreq.send( JSON.stringify( { "handle": document.getElementById("handleIn").value, "comment": document.getElementById("commentIn").value }));
}