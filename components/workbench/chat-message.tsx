"use client"

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { User, Bot, Image as ImageIcon, Paperclip } from 'lucide-react'

interface ChatMessageProps {
  message: {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: Date
    model?: string
    agentId?: string
    attachments?: Array<{
      id: string
      name: string
      type: string
      size: number
      url: string
    }>
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[85%] gap-3`}>
        {/* Avatar */}
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback className={isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>

        {/* Message Content */}
        <div className="flex flex-col space-y-2 flex-1">
          {/* Message Header */}
          <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-sm font-medium">
              {isUser ? 'You' : message.agentId ? message.agentId : 'Evolution AI'}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </span>
            {message.model && (
              <Badge variant="secondary" className="text-xs">
                {message.model}
              </Badge>
            )}
          </div>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {message.attachments.map((attachment) => (
                <Card key={attachment.id} className="p-2">
                  <div className="flex items-center space-x-2">
                    {attachment.type.startsWith('image/') ? (
                      <div className="flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        <img 
                          src={attachment.url} 
                          alt={attachment.name}
                          className="max-w-32 max-h-32 rounded object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{attachment.name}</span>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Message Bubble */}
          <Card className={`p-3 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-md"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}