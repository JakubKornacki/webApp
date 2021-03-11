const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin:true});
admin.initializeApp();

exports.postcomments = functions.https.onRequest((request, response) => {
    cors(request,response, () =>{
    const currTime = admin.firestore.Timestamp.now();
    request.body.timestamp = currTime;
    return admin.firestore().collection('comments').add(request.body).then(()=>{
           response.send("Saved in the Database");
        });
    });
});

exports.getcomments = functions.https.onRequest((request, response) => {
    cors(request,response, () =>{
    
    let myData = [];

    return admin.firestore().collection('comments').orderBy("timestamp","desc").get().then(snapshot => {
       
        if(snapshot.empty){
          console.log("Nothing in the database");
          response.send("Database empty!");
          return;
        }
        
        snapshot.forEach(doc =>{
            let docObj = {};
            docObj.id = doc.id;
            myData.push(Object.assign(docObj,doc.data()));
        });

        response.send(myData);
    });
  });
}); 

exports.deletecomment = functions.https.onRequest((request, response) => {
  cors(request, response, () =>{
    return admin.firestore().collection('comments').doc(request.query.id).delete().then(function(){
        response.send("Comment deleted from database!");
    });
  });
});