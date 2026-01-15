import { useEffect, useRef } from 'react'
import { ChatMessage } from "../types/chat.js"

interface MessageListProps {
  messages: ChatMessage[]
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getAgentLabel = (agentType?: string) => {
    switch (agentType) {
      case 'order':
        return 'Order Support'
      case 'billing':
        return 'Billing Support'
      case 'support':
        return 'Customer Support'
      default:
        return 'Assistant'
    }
  }

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-state">
          <h3>Welcome to Customer Support</h3>
          <p>How can I help you today? I can assist with orders, billing, and general support.</p>
        </div>
      ) : (
        messages.map((message, i) => (
          <div
            key={i}
            className={`message ${message.role === 'user' ? 'user-message' : 'agent-message'}`}
          >
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
