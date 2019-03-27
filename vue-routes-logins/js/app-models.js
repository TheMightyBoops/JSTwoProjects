// Models
var User = function(firebaseUser){
    let m = {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
    }

    if(firebaseUser){
        m.displayName = firebaseUser.displayName ? firebaseUser.displayName : '';
        m.email = firebaseUser.email ? firebaseUser.email : '';
        m.photoURL = firebaseUser.photoURL ? firebaseUser.photoURL : '';
        m.uid = firebaseUser.uid ? firebaseUser.uid : '';
    }

    return m;
}

var Need = function(){
    return {
        name: '',
        datetime: new Date(),
        createdBy: null,
        assignedTo: null,
    }
};

var Potluck = function(){
    return {
        name: '',
        datetime: new Date(),
        description: '',
        location: '',
        createdBy: null,
        users: []
    }
};

var Guest = function(){
    return {
        user: null,
        datetime: new Date(),
    }
};

// -----------------------------------------------------

// Initialize Firebase
alert('MISSING FIREBASE CONFIG');
// var config = { ... };


firebase.initializeApp(config);

var db = firebase.firestore();
//var storage = firebase.storage().ref();


