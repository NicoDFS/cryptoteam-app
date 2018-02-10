import firebase from './index';
let request = require('xhr-request');

export default function authenticate(address) {

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
            let token = data;
            firebase.auth().signInWithCustomToken(token);
            // addUser(address);        // users are already automatically saved in auth db
        }

    })
}