"use client"

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Paperclip, Image, Send, Sparkles, Loader2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { ChatMessage } from './chat-message'
import { PromptEnhancer } from './prompt-enhancer'
import { WelcomeScreen } from './welcome-screen'

interface ChatInterfaceProps {
  onProjectChange: (projectId: string | null) => void
  activeProject: string | null
}

export function ChatInterface({ onProjectChange, activeProject }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [showEnhancer, setShowEnhancer] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setAttachments(prev => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
      'text/*': ['.txt', '.md', '.json'],
      'application/json': ['.json'],
    },
  })

  const handleSendMessage = async () => {
    if (!input.trim() && attachments.length === 0) return

    const newMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date(),
      attachments: attachments.map(file => ({
        id: Math.random().toString(36),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      })),
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')
    setAttachments([])
    setIsLoading(true)

    try {
      // TODO: Implement AI response generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I understand you want to build an application. Let me help you get started! Can you tell me more about what kind of application you'd like to create?",
        timestamp: new Date(),
        model: 'glm-4.6',
      }

      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEnhancePrompt = (enhancedPrompt: string) => {
    setInput(enhancedPrompt)
    setShowEnhancer(false)
  }

  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <WelcomeScreen onStartProject={onProjectChange} />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col border-r border-border" {...getRootProps()}>
      <input {...getInputProps()} />
      
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Evolution AI</h2>
        <p className="text-sm text-muted-foreground">
          Next generation AI app builder
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI is thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="p-2 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <Card key={index} className="p-2 text-xs">
                <div className="flex items-center space-x-2">
                  {file.type.startsWith('image/') ? (
                    <Image className="w-4 h-4" />
                  ) : (
                    <Paperclip className="w-4 h-4" />
                  )}
                  <span className="truncate max-w-20">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                    className="h-4 w-4 p-0"
                  >
                    ×
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isDragActive
                  ? "Drop files here..."
                  : "Describe what you want to build..."
              }
              className="min-h-[60px] max-h-[120px] resize-none"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowEnhancer(true)}
              disabled={!input.trim()}
            >
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || (!input.trim() && attachments.length === 0)}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Prompt Enhancer Modal */}
      {showEnhancer && (
        <PromptEnhancer
          originalPrompt={input}
          onEnhanced={handleEnhancePrompt}
          onClose={() => setShowEnhancer(false)}
        />
      )}
    </div>
  )
}