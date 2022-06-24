const {walletList} = require('./wallet-address-list.json')
const randomWallet = walletList[Math.floor(Math.random()*walletList.length)]
console.log(randomWallet)