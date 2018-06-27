const Idex = require('.')
const log = console.log

const idex = new Idex()

;(async() => {
  log(`Starting application...\n`)
  log(`----------------`)
  log(`--- returnTicker`)
  log(await idex.returnTicker('ETH_ZRX'))
  log(`----------------`)

  log(`----------------`)
  log(`--- returnTicker`)
  log(await idex.return24Volume())
  log(`----------------`)

  log(`----------------`)
  log(`--- returnOpenOrders`)
  log(await idex.returnOpenOrders('ETH_ZIL', '0xca63a1eae2face6eb858d30554da0363716489c9'))
  log(`----------------`)
  
  log(`----------------`)
  log(`--- returnOrderBook`)
  log(await idex.returnOrderBook('ETH_ZIL'))
  log(`----------------`)
  
  log(`----------------`)
  log(`--- returnOrderBook`)
  log(await idex.returnOrderBook())
  log(`----------------`)
  
})()