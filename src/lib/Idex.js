const request = require('request');
const log = console.log

const WebSocket = require('uws');

const socket = new WebSocket('wss://api-cluster.idex.market');
class Idex {
  constructor () {
    this._apiUrl = 'https://api.idex.market/'
  }
  api (cmd, json) {
    return new Promise((resolve, reject) => {
      return request({
        method: 'POST',
        url: this._apiUrl + cmd,
        json
      }, (err, resp, body) => {
        if (err) reject(err)
        resolve(body);
      })
    })
  }
  async returnTicker (ticker) {
    const json = {market: `${ticker}`}
    return await this.api(`returnTicker`, json)
  }
  async returnTickers (ticker) {
    
    return await this.returnTicker()
  }
  async return24Volume () {
    return await this.api(`return24Volume`)
  }
  async returnOpenOrders (market, address = null) {
    log({market})
    return await this.api(`returnOpenOrders`, {market, address})
  }
  async returnOrderBook (market) {
    return await this.api(`returnOrderBook`, {market})
  }
  async returnTradeHistory () {
    return await this.api(`returnTradeHistory`)
  }
  async returnCurrencies () {
    return await this.api(`returnCurrencies`)
  }
  async returnBalances () {
    return await this.api(`returnBalances`)
  }
  async returnCompleteBalances () {
    return await this.api(`returnCompleteBalances`)
  }
  async returnDepositsWithdrawals () {
    return await this.api(`returnDepositsWithdrawals`)
  }
  async returnOrderTrades () {
    return await this.api(`returnOrderTrades`)
  }
  async returnNextNonce () {
    return await this.api(`returnNextNonce`)
  }
  async returnContractAddress () {
    return await this.api(`returnContractAddress`)
  }
  async order () {
    return await this.api(`order`)
  }
  async trade () {
    return await this.api(`trade`)
  }
  async cancel () {
    return await this.api(`cancel`)
  }
  async withdraw () {
    return await this.api(`withdraw`)
  }
  async websockets (ticker) {
    socket.on('message', message => console.log(message));

    socket.on('error', error => {
      console.error('Socket error', error);
      socket.close();
    });
    
    socket.on('open', () => {
      setInterval(() => socket.ping(), 10000);
    
      socket.send(JSON.stringify({ subscribe: ticker }), error => {
        if (error) {
          console.error('Failed to send message', error);
          socket.close();
        }
      });
    });
  }
  
}

module.exports = Idex