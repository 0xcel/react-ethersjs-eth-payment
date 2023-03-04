import { create } from 'ipfs-core';

export const makeIPFS = async () => {
  console.log('start')
  const ipfs = await create();

  // add file
  const { cid } = await ipfs.add('Hello IPFS from React!');
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
}
