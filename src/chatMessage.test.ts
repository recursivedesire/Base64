import test, {ExecutionContext} from 'ava';
import proxyquire from 'proxyquire';
import {Message} from "./api/$message";
import {Room} from "./api/$room";

const $kv = {
    set: (key: string, value: any) => {},
    iter: (prefix?: string) => {
        const data = {"hello": "world"};
        let index = -1;
        return {
            next: () => ++index < Object.keys(data).length,
            key: () => Object.keys(data)[index],
            value: () => Object.values(data)[index],
            delete: () => delete data[Object.keys(data)[index]]
        }
    }
}

function message(t: ExecutionContext, body: string, setSpam?: (isSpam: boolean) => void): any {
    setSpam = setSpam ?? (() => t.pass());
    return {
        body, setSpam
    } as Message;
}

function room(t, sendNotice?: (message: string, options?: any) => void): any {
    sendNotice = sendNotice ?? (() => t.fail('sendNotice should not be called'));
    return {
        sendNotice
    } as Room;
}

const {loadKV, saveKV} = proxyquire('./sharedCode', {
    './api/$kv': {$kv}
});

const {chatMessage} = proxyquire('./chatMessage', {
    './sharedCode': {loadKV, saveKV},
    './api/$message': {
        $message: {body: '', setSpam: () => {}},
        $room: {sendNotice: () => {}}
    },
    './api/$user': {
        $user: {username: 'test'}
    }
});

test('No command', t => {
    const $message = message(t, 'Hello', () => t.fail('setSpam should not be called'));
    const $room = room(t);

    chatMessage($message, $room);
    t.pass();
});

test('Base64 encode', t => {
    const $message = message(t, '/base64 encode Hello');
    const $room = room(t, (message: string) => t.is(message, 'SGVsbG8='));

    chatMessage($message, $room);
});

test('Base64 decode', t => {
    const $message = message(t, '/base64 decode SGVsbG8=');
    const $room = room(t, (message: string) => t.is(message, 'Hello'));

    chatMessage($message, $room);
});

test('Base64 save', t => {
    const $message = message(t, '/base64 save');
    const $room = room(t, (message: string) => t.is(message, 'eyJkYXRhIjp7ImhlbGxvIjoid29ybGQifX0='));

    chatMessage($message, $room);
});

test('Base64 load', t => {
    const $message = message(t, '/base64 load eyJkYXRhIjp7ImZvbyI6ImJhciJ9fQ==');
    const $room = room(t, (message: string) => t.is(message, 'Loaded 1 entries'));

    chatMessage($message, $room);
});
