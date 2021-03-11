function deletecomment(commentID){
    xreq = new XMLHttpRequest();
    var url = "https://us-central1-webapp-2f506.cloudfunctions.net/deletecomment" + "?id=" + commentID;
    xreq.open("DELETE",url);

    xreq.onreadystatechange = function(){
        var ok = 200;
        var done = 4;
        if(xreq.readyState === done){
            if(xreq.status === ok){
                getcomments();            
            }
            else{
                console.log("Could not delete comment. Error: " + xreq.status); 
            }
        }
    }
    xreq.send(null);
}