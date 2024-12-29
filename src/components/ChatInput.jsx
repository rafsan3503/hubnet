import { useState } from 'react';
import styled from '@emotion/styled'

const InputContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem;
  margin: 1rem 0;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const Input = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  resize: none;
  color: #1f2937;
  outline: none;
  min-height: 40px;
  
  &::placeholder {
    color: #9ca3af;
  }
`

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Talk to the swarm..."
          rows={1}
          disabled={disabled}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-400 text-sm">+ Add image or file...</span>
          <button 
            type="submit" 
            disabled={disabled || !message.trim()}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-md text-sm text-gray-700 transition-colors disabled:opacity-50"
          >
            Enter
          </button>
        </div>
      </form>
    </InputContainer>
  )
}

export default ChatInput 