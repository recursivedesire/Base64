import {$message, Message} from "./api/$message";
import {$room, Room} from "./api/$room";
import {$user} from "./api/$user";
import {Base64, loadKV, saveKV} from "./sharedCode";


function chatMessage($message: Message, $room: Room): void {
    if ($message.body.startsWith("/base64")) {
        $message.setSpam(true);

        switch (true) {
            case $message.body.startsWith("/base64 encode "):
                $room.sendNotice(Base64.encode($message.body.substring(15)), {toUsername: $user.username});
                break;
            case $message.body.startsWith("/base64 decode "):
                $room.sendNotice(Base64.decode($message.body.substring(15)), {toUsername: $user.username});
                break;
            case $message.body.startsWith("/base64 save"):
                const prefix = $message.body.substring(13).trim();
                $room.sendNotice(saveKV(prefix), {toUsername: $user.username});
                break;
            case $message.body.startsWith("/base64 load "):
                const base64 = $message.body.substring(13).trim();
                $room.sendNotice(`Loaded ${loadKV(base64)} entries`, {toUsername: $user.username});
                break;
            default:
                $room.sendNotice("Usage: /base64 encode|decode|save|load", {toUsername: $user.username});
        }
    }
}

chatMessage($message, $room);


export {chatMessage};
