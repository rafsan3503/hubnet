import styled from '@emotion/styled'

const MessageContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const MessageContent = styled.div`
  background: ${props => props.isUser ? 'transparent' : '#f3f4f6'};
  padding: 1rem;
  border-radius: 12px;
  white-space: pre-wrap;
  color: #1f2937;
  line-height: 1.5;
  text-align: left;
  max-width: 80%;
  ${props => props.isUser ? 'margin-left: auto;' : 'margin-right: auto;'}
`

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  padding: 0 1rem;
  ${props => props.isUser ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
`

function ChatMessage({ message }) {
  const isUser = message.user === 'You'

  return (
    <MessageContainer>
      <MessageHeader isUser={isUser}>
        <span className="text-gray-600 font-medium">{message.user}</span>
        <span className="text-xs text-gray-400">{message.timestamp}</span>
      </MessageHeader>
      <MessageContent isUser={isUser}>
        {message.content}
      </MessageContent>
    </MessageContainer>
  )
}

export default ChatMessage 