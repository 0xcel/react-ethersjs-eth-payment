import { encode } from "punycode"

const baseURL = "https://twitter.com/intent/tweet?text="

const hashtag = encodeURIComponent("#0xcel");

const newLineCharacter = "%0a%0a"

export const formatTweet = (formattedIPFSURL: string) => {
    const encodedIPFSUrl = encodeURIComponent(formattedIPFSURL);
    const final = `${baseURL}${encodedIPFSUrl}${newLineCharacter}${hashtag}`
    return final
}

