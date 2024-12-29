import styled from '@emotion/styled'

const MessageContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  max-width: 800px;
`

const MessageContent = styled.div`
  background: ${props => props.isUser ? 'transparent' : '#f3f4f6'};
  padding: 1rem;
  border-radius: 12px;
  white-space: pre-wrap;
  color: #1f2937;
  line-height: 1.5;
  text-align: center;
`

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`

function ChatMessage({ message }) {
  const isUser = message.user === 'You'
  
  // Format the content to maintain center alignment for specific elements
  const formatContent = (content) => {
    if (!content.includes('PnL Summary') && !content.includes('Key Trades')) {
      return content;
    }

    return content.split('\n').map((line, index) => {
      // Add text-center class for headers and bullet points
      if (line.includes('PnL Summary') || 
          line.includes('Key Trades') || 
          line.includes('Arbitrage win') ||
          line.includes('PumpFun Memecoin Flip') ||
          line.trim().startsWith('•') ||
          line.trim().startsWith('1.') ||
          line.trim().startsWith('2.')) {
        return `<div class="text-center">${line}</div>`;
      }
      return line;
    }).join('\n');
  }

  return (
    <MessageContainer>
      <MessageHeader>
        <span className="text-gray-600 font-medium">{message.user}</span>
        <span className="text-xs text-gray-400">{message.timestamp}</span>
      </MessageHeader>
      <MessageContent 
        isUser={isUser}
        dangerouslySetInnerHTML={{ 
          __html: formatContent(message.content)
            .replace(/\n/g, '<br>')
        }}
      />
    </MessageContainer>
  )
}

export default ChatMessage 