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

function removeOffer(offerId, userAddress, playerId) {
    let marketRef = db.ref('/market/' + offerId);
    marketRef.remove();
    let playerRef = db.ref('/users/' + userAddress + "/owned/" + playerId + "/offer");
    playerRef.remove();
}

function offerPlayer(playerData, seller, price, callback) {
    let marketRef = db.ref('/market');
    let pushRef = marketRef.push();

    pushRef.set({
        player: playerData,
        instance: playerData.info.id,
        seller: seller,
        price: price
    });

    let offerId = pushRef.key;

    // Add offer id to owned player object
    let userRef = db.ref('/users/' + seller + "/owned/" + playerData.info.id);
    pushRef = userRef.child("offer");

    pushRef.set({
        id: offerId,
        price: price,
    });

    callback(offerId);
}

function updateOffer(offerId, playerId, seller, newPrice, callback) {
    let marketRef = db.ref('/market/' + offerId);
    marketRef.update({ price: newPrice });

    let userRef = db.ref('/users/' + seller + "/owned/" + playerId + "/offer");
    userRef.update({ price: newPrice });
}

function givePlayer(player, userId, callback) {

    if (player === null) {
        return undefined;
    }
    else {
        let usersRef = db.ref('/users/' + userId + '/owned/');
        let pushRef = usersRef.child(player.info.id);
        pushRef.set(player);
        let instanceId = pushRef.key;
        callback(instanceId);
    }
}

//removes a player from a users owned players 
function disownPlayer(playerInstanceId, userId, callback) {
    db.ref('/users/' + userId + '/owned/' + playerInstanceId).remove();
}

function buyPlayer(offerID, buyer, txHash, callback) {

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
            disownPlayer(instanceId, sellerId, givePlayer(player, buyer, (instanceId) => {

                //save buy to user history
                let pushRefBuyer = db.ref('/users/' + buyer + '/trades/bought').push();
                pushRefBuyer.set({
                    player: player,
                    txHash: txHash,
                    price: price,
                    seller: sellerId,
                });

                //save sell to user history
                let pushRefSeller = db.ref('/users/' + sellerId + '/trades/sold').push();
                pushRefSeller.set({
                    player: player,
                    price: price,
                    txHash: txHash,
                    buyer: buyer
                });

                // //save purchase data
                db.ref('/purchases/').push().set({
                    player: player,
                    price: price,
                    txHash: txHash,
                    buyer: buyer,
                    seller: sellerId,
                });

            }));

        });

    });
    callback();
}

//check if a player is in the market
async function checkOfferAvailability(offerId) {
    let marketRef = db.ref('/market/' + offerId);
    let snapshot = await marketRef.once('value');
    return snapshot.val();

}

// updates a users most recent sign in time if the user already exists,
// otherwise adds as new user
function signIn(userAddress) {
    db.ref('/users/' + userAddress).update({
        lastSignIn: new Date().getTime() + ""
    });
}

//chain .then(marketData) when you call this function somewhere else
async function getMarket() {
    let marketRef = db.ref('/market');
    let snapshot = await marketRef.once('value');
    return snapshot.val();
}

async function getPlayer(id) {
    let playerRef = db.ref('/players/' + id);
    let snapshot = await playerRef.once('value');
    return snapshot.val();
}

async function getUser(userAddress) {
    let ref = db.ref('/users/' + userAddress);
    let snapshot = await ref.once('value');
    return snapshot.val();
}

export {
    addPlayer, addUser, disownPlayer, givePlayer,
    offerPlayer, buyPlayer, getMarket, getPlayer,
    getUser, signIn, removeOffer, updateOffer, checkOfferAvailability
}