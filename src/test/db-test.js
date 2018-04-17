import { buyPlayer } from '../firebase/db';

export default function dbTest() {

    let offerID = "-L6fqYCHFx9HJ-TT3Hb0";
    let buyer = "0x7283dce65c72e1b4fa6120f123af7a12bb4f0f74"
    let txHash = "32";

    // first buy
    buyPlayer(offerID, buyer, txHash, () => {

        // second buy
        buyer = "10x7283dce65c72e1b4fa6120f123af7a12bb4f0f74"
        buyPlayer(offerID, buyer, txHash, () => {

        })

    })




}