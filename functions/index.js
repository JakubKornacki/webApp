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

exports.authorizedendpoint = functions.https.onRequest((request, response) =>{

   cors(request,response, () =>{
       console.log("Check if request is authorized with Firebase ID token");
       if((!request.headers.authorization || !request.headers.authorization.startsWith("Bearer "))) {
           console.error("No Firebase ID token was passed as a Bearer token in the Authorization header.",
               "Make sure you authorize your requrest by providing the following HTTP header Authorization: Bearer Firebase ID token");
           response.status(403).send("Unauthorized");
           return
       }
       let idToken;
       if(request.headers.authorization && request.headers.authorization.startsWith("Bearer ")){
           console.log('Found "Authorization" header');
           // Read the ID token from the Authorization header.
           idToken = request.headers.authorization.split("Bearer ")[1];
       } else {
           response.status(403).send("Unauthorized");
           return;
       }
       try {
           const decodedIdToken = admin.auth().verifyIdToken(idToken).then((token) => {
               console.log("ID token correctly decoded ", token);
               response.send("Welcome to the secure section ");
               let myComments = [];
               admin.firestore().collection('comments').where("uid","==",token.uid).get().then((snapshot)=>{

                    if(snapshot.empty){
                        console.log("No matching documents.");
                        response.send("No data");
                        return;
                    }

                    snapshot.forEach(doc =>{
                        let docObj = {};
                        docObj.id = doc.id;
                        myComments.push(Object.assign(docObj, doc.data()))
                    });

                    response.send(myComments);
               });
           });
       } catch(error){
           console.error("Error while verifying Firebase ID token", error);
           response.status(403).send("Unauthorized");
           return;
       }
   });
});