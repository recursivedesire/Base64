import {$app} from "./api/$app";
import {$callback} from "./api/$callback";
import {$fanclub} from "./api/$fanclub";
import {$kv} from "./api/$kv";
import {$limitcam} from "./api/$limitcam";
import {$media} from "./api/$media";
import {$message} from "./api/$message";
import {$room} from "./api/$room";
import {$tip} from "./api/$tip";
import {$user} from "./api/$user";
import {$settings} from "./api/$settings";
import {Base64} from "./Base64";

function saveKV(prefix?: string): string {
    if (prefix === "") prefix = undefined;

    const data: Record<string, any> = {};
    const iter = $kv.iter(prefix);
    while (iter.next()) {
        data[iter.key()] = iter.value();
    }

    const json = JSON.stringify({prefix, data});
    return Base64.encode(json);
}

function loadKV(base64: string): number {
    const json = Base64.decode(base64);

    const {prefix, data} = JSON.parse(json);
    const iter = $kv.iter(prefix);
    while (iter.next()) {
        iter.delete();
    }

    for (const [key, value] of Object.entries(data)) {
        $kv.set(key, value);
    }

    return Object.keys(data).length;
}

export {Base64, loadKV, saveKV};
