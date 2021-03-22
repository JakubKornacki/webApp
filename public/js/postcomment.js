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
    xreq.send( JSON.stringify( { "handle": document.getElementById("handleIn").value, "comment": document.getElementById("commentIn").value,"uid":getCookie('uid') }));

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
