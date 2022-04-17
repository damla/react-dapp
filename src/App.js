import './App.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

// Contract address
const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function App() {
  const [greeting, setGreetingValue] = useState()

  // connect to ethereum wallet
  async function requestAccount() {
    // anyone using wallet should have ethereum on global state
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    // add try/catch to handle error
  }

  // fetch greet function of the contract
  async function fetchGreeting() {
    // check if the wallet exist
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // ref of the contract
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      )
      try {
        const data = await contract.greet()
        console.log('Data: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return // make sure user write greeting value in UI
    if (typeof window.ethereum !== "undefined") {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder='Set Greeting'
        />
      </header>
    </div>
  )
}

export default App
