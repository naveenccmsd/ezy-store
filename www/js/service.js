var globalurl = "https://ezy-store.firebaseio.com/";
var posturl=".json";//for Firebase DB
var config = {
     headers: {
         "Accept": "application/json, text/plain, */*",
         "Content-Type": "application/json;charset=utf-8"
     }
 }
 function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

app.service('LoginService', function($q) {
    return {
        loginUser: function(email, password) {
             return firebase.auth().signInWithEmailAndPassword(email, password);       
        },
        validateUser : function(email,password)
        {
            if (email==null || !validateEmail(email)) {
              alert('Please enter an email address.');
              return -1;
            }
            if (password==null || password.length < 4) {
              alert('Please enter a password.');
              return -1;
            }
            else
            {
                return 0;
            }
        }
    };

});

app.service('billListsService', function($http,$localStorage) {
    return {
        getProductById: function(productID) {
       return firebase.database().ref('/products/' + productID).once('value');
            // var url = globalurl + "products/" + productID +posturl;
            // return $http.get(url)
            //          .error(function(data) {
            //              console.log("Error", data);
            //          });
        },
        checkoutProducts:function(products,totalcost,totalcount)
        {
            var user = firebase.auth().currentUser;
            var uid = user.uid;
            var myJsonproducts = JSON.stringify(products);
            var postData = {
                "uid": uid,
                "totalcost" : totalcost,
                "totalcount" : totalcount,
                "product" : myJsonproducts
              };
              console.log(postData);
              var newPostKey = firebase.database().ref().child('Billing').push().key;
              var updates = {};
              updates['/Billing/bill/' + newPostKey] = postData;
              updates['/Billing/user-bill/' + uid + '/' + newPostKey] = postData;
              firebase.database().ref().update(updates);
              return newPostKey;
        },
        getListProductsByBillID:function(billingID)
        {
          // var commentsRef = firebase.database().ref('Billing/bill/' + billingID);
          // commentsRef.on('value', function(data) {
          //   console.log(data.val());
          //   return product=data.val().;
          // });
          return firebase.database().ref('/Billing/bill/' + billingID).once('value');
        },
        updatePayment:function(billingID)
        {
            var user = firebase.auth().currentUser;
            var uid = user.uid;
            
              var newPostKey = firebase.database().ref().child('Billing').push().key;
              var postData = {
                "payBy": uid,
                "paymentstaus" : "true",
                "transactionID" : newPostKey,
                "product" : new Date()
              };
              var updates = {};
              updates['/Billing/bill/' + billingID+'/transaction'] = postData;
              updates['/Billing/user-bill/' + uid + '/' + billingID+'/transaction'] = postData;

              updates['/Billing/bill/' + billingID+'/transaction-History/'+newPostKey] = postData;
              updates['/Billing/user-bill/' + uid + '/' + billingID+'/transaction-History/'+newPostKey] = postData;

              firebase.database().ref().update(updates);
              return newPostKey;
        },
        getListBillByUser:function(userID)
        {
          var user = firebase.auth().currentUser;
          // var tmpID =$localStorage.uid;
          if(userID==0)
          {
            //take Login User ID
            userID=$localStorage.uid;
          }
          
          // var commentsRef = firebase.database().ref('Billing/bill/' + billingID);
          // commentsRef.on('value', function(data) {
          //   console.log(data.val());
          //   return product=data.val().;
          // });
          return firebase.database().ref('/Billing//user-bill/' + userID).once('value');
        }
    }
});
app.service('ProductService', function($q) {
    return {
        getListproduct : function()
        {
            return firebase.database().ref('/products').once('value');
        },
        uploadImage : function(imageData)
        {
            // var storageRef = firebase.storage();
            var storageRef = firebase.storage().ref();
            var metadata = {
              contentType: 'image/jpeg'
            };
             var getFileBlob = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
    };

    var blobToFile = function(blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
    };

    var getFileObject = function(filePathOrUrl, cb) {
        getFileBlob(filePathOrUrl, function(blob) {
            cb(blobToFile(blob, 'test1.jpg'));
        });
    };
    getFileObject(imageData, function(fileObject) {
        var uploadTask = storageRef.child('images/test1.jpg').put(fileObject,metadata);

        uploadTask.on('state_changed', function(snapshot) {
            console.log(snapshot);
        }, function(error) {
            console.log(error);
        }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log(downloadURL);
            // handle image here
        });
    });
            // var uploadTask = storageRef.child('images/ok.jpeg'  ).put(file, metadata);
            // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            //     function(snapshot) {
            //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //       console.log('Upload is ' + progress + '% done');
            //       switch (snapshot.state) {
            //         case firebase.storage.TaskState.PAUSED: // or 'paused'
            //           console.log('Upload is paused');
            //           break;
            //         case firebase.storage.TaskState.RUNNING: // or 'running'
            //           console.log('Upload is running');
            //           break;
            //       }
            //     }, function(error) {
            //     switch (error.code) {
            //       case 'storage/unauthorized':
            //         // User doesn't have permission to access the object
            //         break;

            //       case 'storage/canceled':
            //         // User canceled the upload
            //         break;

            //       case 'storage/unknown':
            //         // Unknown error occurred, inspect error.serverResponse
            //         break;
            //     }
            //   }, function() {
            //     // Upload completed successfully, now we can get the download URL
            //     var downloadURL = uploadTask.snapshot.downloadURL;
            //     console.log(downloadURL);
            //   });
        }
    };

});