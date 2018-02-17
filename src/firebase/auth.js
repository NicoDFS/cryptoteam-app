import firebase from './index';
import { signIn } from './db'
let request = require('xhr-request');

export default function authenticate(address, callback) {

    let currentUser = firebase.auth().currentUser;

    //if no user is signed in
    if (!currentUser) {

        console.log('no user signed in');
        const userAuth = 'https://us-central1-cryptoteam-eth.cloudfunctions.net/userAuth';
        let req = { uid: address };

        //send POST request with req object as body
        //get custom token and use for sign in
        request(userAuth, {
            json: true,
            method: 'POST',
            responseType: 'text',
            body: req
        }, (err, data) => {

            if (!err) {
                // sign in after token is returned
                firebase.auth().signInWithCustomToken(data).then(() => {
                    signIn(address);
                    callback();
                });

            }

            else {
                return err;
            }

        })
    }
    else {
        console.log('firebase user already signed in.');
        callback();
    }
}