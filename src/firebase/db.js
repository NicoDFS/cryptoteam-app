import firebase from './index';
let db = firebase.database();

//player info is an object containing all relevant player data
export default function addPlayer(playerInfo) {
    let pushRef = db.ref('/players').push();
    pushRef.set(playerInfo);
    let id = pushRef.key;
    return id;
}
