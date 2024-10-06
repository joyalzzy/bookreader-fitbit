import * as messaging from "messaging";
import { MESSSAGES } from "../common/messaging";

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});

function fetchBook() {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send("some data");
    } else {
        console.log("queue closed");
    }
}

messaging.peerSocket.onmessage = (evt) => {
    console.log(evt.data);
    switch (evt.data) {
        case MESSSAGES.SEND_BOOK:
            fetchBook();
    }
};
