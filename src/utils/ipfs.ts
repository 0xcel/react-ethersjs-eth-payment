import { create } from 'ipfs-core';


interface paymentObjectInterface  {
    to: string,
    value: string,
    callData?: string,
}

const baseURLIPFS = 'https://ipfs.io/ipfs/';

export const makeIPFS = async (handle: string, ether: string) => {
  console.log('start')
  const ipfs = await create();

  // format JSON -> String

  const paymentObject: paymentObjectInterface = {to: handle, value: ether, callData: ''}

  // add file
  const { cid } = await ipfs.add(JSON.stringify(paymentObject));
  console.log(cid.toString());

  // retrieve file
  const content = [];
  for await (const chunk of ipfs.cat(cid)) {
    content.push(chunk);
  }
  const decodedContent = String.fromCharCode(...Array.from(content.reduce((a, b) => {
    const result = new Uint8Array(a.length + b.length);
    result.set(a);
    result.set(b, a.length);
    return result;
  }, new Uint8Array())));
  console.log(decodedContent);
  console.log('end');
  return `${baseURLIPFS}${cid}`
}
