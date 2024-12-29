import { useState } from 'react'
import styled from '@emotion/styled'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { chatCompletion } from '../services/openai'

const ChatContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px);
`

const Sidebar = styled.div`
  width: 72px;
  border-right: 1px solid #e5e7eb;
  padding: 1rem;
`

const MainChat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
`

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
`

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'You',
      content: 'Hey @Lochlan, whats your PnL today?',
      timestamp: '1:05 pm'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content) => {
    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const aiMessages = messages.map(msg => ({
        role: msg.user === 'You' ? 'user' : 'assistant',
        content: msg.content
      }));

      aiMessages.push({ role: 'user', content });

      const response = await chatCompletion(aiMessages);

      const aiMessage = {
        id: messages.length + 2,
        user: 'Lochlan',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContainer>
      <Sidebar>
        <div className="w-10 h-10 bg-purple-600 rounded-lg"></div>
      </Sidebar>
      <MainChat>
        <MessagesContainer>
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <div className="text-center text-gray-500">Lochlan is typing...</div>}
        </MessagesContainer>
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </MainChat>
    </ChatContainer>
  )
}

export default ChatInterface 