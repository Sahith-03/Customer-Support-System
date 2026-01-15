import { MessageList } from "./MessageList.js"
import { MessageInput } from "./MessageInput.js"
import { useChatStream } from "../hooks/useChatStream.js"

export function Chat() {
  const { messages, isTyping, sendMessage } = useChatStream()

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Customer Support Chat</h2>
      </div>
      
      <div className="chat-content">
        <MessageList messages={messages} />
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>Agent is typing...</span>
          </div>
        )}
      </div>
      
      <div className="chat-input">
        <MessageInput onSend={sendMessage} disabled={isTyping} />
      </div>
    </div>
  )
}
