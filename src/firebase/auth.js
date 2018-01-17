import firebase from './index';
let request = require('request');

export default function getAuthToken(address) {

    const userAuth = 'https://us-central1-cryptoteam-eth.cloudfunctions.net/userAuth';
    let req = { uid: address };

    //send POST request with req object as body
    //get custom token and use for future auth


    // to sign in after token is returned

    // firebase.auth().signInWithCustomToken(token).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    // });

}