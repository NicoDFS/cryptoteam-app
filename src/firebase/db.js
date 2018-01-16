import firebase from './index';
let db = firebase.database();

/* 
General multi-purpose read/write functions. 
For realtime-use, use .on() in the relevant components.

Arguments to addPlayer and addUser should be objects 
containing the data.
*/

function addPlayer(playerInfo) {
    let playersRef = db.ref('/players');
    let pushRef = playersRef.push();
    pushRef.set(playerInfo);
    let id = pushRef.key;
    return id;
}

function addUser(userInfo) {
    let usersRef = db.ref('/users');
    let pushRef = usersRef.push();
    pushRef.set(userInfo);
    let id = pushRef.key;
    return id;
}

function offerPlayer(playerInstanceId, seller, price, callback) {

    let marketRef = db.ref('/market');

    db.ref('/users/' + seller + '/owned/' + playerInstanceId)
        .once('value').then((snapshot) => {

            let playerData = snapshot.val();

            if (playerData === null) {
                return undefined;
            }

            else {
                let pushRef = marketRef.push();

                pushRef.set({
                    player: playerData,
                    instance: playerInstanceId,
                    seller: seller, price: price
                });
                let offerId = pushRef.key;
                callback(offerId);
            }

        });

}

function givePlayer(playerId, userId, callback) {

    //get player data
    db.ref('/players/' + playerId).once('value').then((snapshot) => {

        let player = snapshot.val();
        player.id = playerId;       //original playerId in player table

        if (player === null) {
            return undefined;
        }

        else {
            let usersRef = db.ref('/users/' + userId + '/owned/');
            let pushRef = usersRef.push();
            pushRef.set(player);
            let instanceId = pushRef.key;
            callback(instanceId);
        }

    });
}

//removes a player from a users owned players 
function disownPlayer(playerInstanceId, userId, callback) {
    db.ref('/users/' + userId + '/owned/' + playerInstanceId).remove();
}

function buyPlayer(offerID, buyer) {

    let ref = db.ref('/market/' + offerID);

    // get offer data
    ref.once('value').then((snapshot) => {

        let data = snapshot.val();
        let player = data.player;
        let price = data.price;
        let sellerId = data.seller;
        let instanceId = data.instance;     //id of the sellers player instance

        //remove offer from market
        ref.remove(() => {

            disownPlayer(instanceId, sellerId, givePlayer(player.id, buyer));

            //save purchase data
            db.ref('/purchases/').push().set({
                player: player,
                price: price,
                buyer: buyer,
                seller: sellerId,
            });

        });

    });

}

//chain .then(marketData) when you call this function somewhere else
async function getMarket() {
    let marketRef = db.ref('/market');
    let snapshot = await marketRef.once('value');
    return snapshot.val();
}

export {
    addPlayer, addUser, disownPlayer, givePlayer,
    offerPlayer, buyPlayer, getMarket
}