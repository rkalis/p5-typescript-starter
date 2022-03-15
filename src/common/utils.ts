export const genTokenData = (projectNum: number) => {
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }

  const tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();

  return { hash, tokenId };
}
