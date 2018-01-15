import firebase from './index';
let db = firebase.database();

//player info is an object containing all relevant player data
function addPlayer(playerInfo) {
    let pushRef = db.ref('/players').push();
    pushRef.set(playerInfo);
    let id = pushRef.key;
    return id;
}

function placeForSale(playerID, seller, price) {

    //make sure the player exists in /players 
    db.ref('/players/' + playerID).once('value').then((snapshot) => {

        if (snapshot.val() === null) {
            return undefined;
        }

        else {
            let pushRef = db.ref('/market').push();
            pushRef.set({ player: snapshot.val(), seller: seller, price: price });
            let id = pushRef.key;
            return id;
        }

    });

}

function getMarket() {

}

export { addPlayer, placeForSale, getMarket }