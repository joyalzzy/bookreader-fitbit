import * as messaging from "messaging";
import document from "document";
import { MESSSAGES } from "../common/messaging";
import { readFileSync, existsSync, listDirSync, DirectoryIterator, DirectoryIteratorResult } from "fs";
import {BookHandler} from './book';

const book = new BookHandler('test.txt');
messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});
const button = document.getElementById("button");
const text = (document.getElementById("text") as TextAreaElement)

button.onclick = (evt: MouseEvent) => {
    console.log("click");
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(MESSSAGES.SEND_BOOK);
        let thing : string = book.readBook(0);
        console.log(thing);
        text.text = thing
        console.log("《大乘期才有逆袭系统》章节目录 第一章 ")
        console.log("send msg");
        
    }
    else {
        console.log("closed");
    }
};

messaging.peerSocket.onmessage = (evt) => {
    console.log(evt.data);
    // text.text = evt.data;
}