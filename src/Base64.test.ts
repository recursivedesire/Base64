import test from 'ava';
import { Base64 } from './Base64';

test('Base64.encode', t => {
    t.is(Base64.encode('Hello World'), 'SGVsbG8gV29ybGQ=');
});

test('Base64.decode', t => {
    t.is(Base64.decode('SGVsbG8gV29ybGQ='), 'Hello World');
});
