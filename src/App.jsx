import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 border-b border-gray-200">
        <h1 className="text-gray-800">Hivenat Chat</h1>
      </header>
      <ChatInterface />
    </div>
  )
}

export default App
