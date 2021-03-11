function getcomments(){
    var xreq = new XMLHttpRequest();
    xreq.open("GET","https://us-central1-webapp-2f506.cloudfunctions.net/getcomments");
//test test
    xreq.onreadystatechange = function() {
        var done = 4;
        var ok = 200;
        if(xreq.readyState === done){
            if(xreq.status === ok){
                var html = "";
                var data = JSON.parse(xreq.responseText);
                for(var i = 0; i<data.length; i++){
                    html += "<div class='jumbotron'>Handle: " + data[i].handle + "<br>";
                    html += "Comment: " + data[i].comment + "<br>";
                    html += "<button onclick=deletecomment(" + "'" + data[i].id + "'" + ");>Delete Comment</button><br></div>";
                }
                commDiv.innerHTML = html;
            }
            else {
                console.log("Error! Status Code: " + xreq.status);
            }
        }
    }
    xreq.send(null);
}