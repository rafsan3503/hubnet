import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import './App.css'
import PumpPortalTest from './components/PumpPortalTest'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 border-b border-gray-200">
        <h1 className="text-gray-800">Hivenat Chat</h1>
      </header>
      <ChatInterface />
      <PumpPortalTest />
    </div>
  )
}

export default App
