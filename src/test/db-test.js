import {
    addPlayer, addUser, givePlayer,
    offerPlayer, buyPlayer
} from '../firebase/db';

export default function dbTest() {

    let player1 = { name: 'ronaldo', speed: 123 };
    let player2 = { name: 'messi', speed: 20 };

    let user1 = { name: 'youssef' }
    let user2 = { name: 'omar' };

    let pid1 = addPlayer(player1)
    let pid2 = addPlayer(player2)
    let uid1 = addUser(user1);
    let uid2 = addUser(user2);

    givePlayer(pid1, uid1, (instanceId) => {
        offerPlayer(instanceId, uid1, 20, (offer) => {
            buyPlayer(offer, uid2)
        });
    });


}