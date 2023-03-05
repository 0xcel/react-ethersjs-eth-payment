import {createHash} from "crypto";

// create sha-256 hash of twitter username
export const addressFromUsername = (username : string) => {
    let full_hash = createHash('sha256').update(username).digest('hex');
    return "0x" + full_hash.substring(full_hash.length - 40, full_hash.length)
}