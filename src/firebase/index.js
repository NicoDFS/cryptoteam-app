import * as fire from 'firebase';

let config = {
    apiKey: "AIzaSyCJUBwlpbI3OBJkKKWhNM1i4C4zAAyhhPc",
    authDomain: "cryptoteam-eth.firebaseapp.com",
    databaseURL: "https://cryptoteam-eth.firebaseio.com",
    projectId: "cryptoteam-eth",
    storageBucket: "",
    messagingSenderId: "72849496792"
};

let firebase = fire.initializeApp(config);
export default firebase;