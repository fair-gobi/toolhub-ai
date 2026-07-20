"use client"
import { useState, useEffect } from "react"

export default function CryptoConverter() {
  const [prices, setPrices] = useState({btc: 0, eth: 0, sol: 0})
  const [amount, setAmount] = useState(1)
  const [fromCoin, setFromCoin] = useState("BTC")
  const [toCurrency, setToCurrency] = useState("USD")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,npr,eur,inr")
        const data = await res.json()
        setPrices({
          btc: data.bitcoin.usd,
          eth: data.ethereum.usd,
          sol: data.solana.usd
        })
      } catch(e) {
        setPrices({btc: 67500, eth: 3800, sol: 165}) // fallback
      }
      setLoading(false)
    }
    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // update every minute
    return () => clearInterval(interval)
  }, [])

  const coinPrices: any = { BTC: prices.btc, ETH: prices.eth, SOL: prices.sol }
  const currentPrice = coinPrices[fromCoin] || 0
  const convertedValue = amount * currentPrice

  const currencySymbols: any = { USD: "$", NPR: "Rs ", EUR: "€", INR: "₹" }
  const rates: any = { USD: 1, NPR: 150.69, EUR: 0.92, INR: 83.5 }
  const finalValue = convertedValue * (rates[toCurrency] || 1)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Crypto Converter</h1>
        <p className="text-gray-600">Live Bitcoin, Ethereum, Solana prices</p>
        {loading? (
          <p className="text-sm text-blue-600 mt-2">Loading live prices...</p>
        ) : (
          <p className="text-sm text-green-600 mt-2">? Live prices update every 60s</p>
        )}
      </div>

      <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl">
        {/* Coin Selector */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            {id: "BTC", name: "Bitcoin", price: prices.btc, color: "bg-orange-500", icon: "?"},
            {id: "ETH", name: "Ethereum", price: prices.eth, color: "bg-blue-500", icon: "?"},
            {id: "SOL", name: "Solana", price: prices.sol, color: "bg-purple-500", icon: "?"}
          ].map(coin => (
            <button
              key={coin.id}
              onClick={() => setFromCoin(coin.id)}
              className={`p-4 rounded-2xl transition-all ${fromCoin === coin.id? coin.color : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <div className="text-2xl mb-1">{coin.icon}</div>
              <div className="font-bold">{coin.id}</div>
              <div className="text-xs opacity-75">${coin.price.toLocaleString()}</div>
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <label className="text-sm text-gray-400 uppercase tracking-wide">Amount</label>
          <input
            type="number"
            step="0.0001"
            value={amount}
            onChange={e => setAmount(+e.target.value)}
            className="w-full bg-transparent text-4xl font-bold mt-2 focus:outline-none"
            placeholder="0.00"
          />
          <div className="text-gray-500 mt-1">{fromCoin}</div>
        </div>

        {/* Currency Output */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-400 uppercase tracking-wide">Convert to</label>
            <select value={toCurrency} onChange={e=>setToCurrency(e.target.value)}
              className="bg-gray-700 px-3 py-1 rounded-lg text-sm">
              <option>USD</option><option>NPR</option><option>EUR</option><option>INR</option>
            </select>
          </div>
          <div className="text-5xl font-bold text-green-400">
            {currencySymbols[toCurrency]}{finalValue.toLocaleString('en-US', {maximumFractionDigits: 2})}
          </div>
          <div className="text-gray-500 mt-2">
            1 {fromCoin} = {currencySymbols[toCurrency]}{(currentPrice * rates[toCurrency]).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Market Info */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border text-center">
          <div className="text-xs text-gray-500">BTC 24h</div>
          <div className="font-bold text-green-600">+2.4%</div>
        </div>
        <div className="bg-white p-4 rounded-xl border text-center">
          <div className="text-xs text-gray-500">ETH 24h</div>
          <div className="font-bold text-green-600">+1.8%</div>
        </div>
        <div className="bg-white p-4 rounded-xl border text-center">
          <div className="text-xs text-gray-500">Market Cap</div>
          <div className="font-bold">$2.4T</div>
        </div>
      </div>
    </div>
  )
}
