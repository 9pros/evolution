"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Loader2, Sparkles, X } from 'lucide-react'

interface PromptEnhancerProps {
  originalPrompt: string
  onEnhanced: (enhancedPrompt: string) => void
  onClose: () => void
}

export function PromptEnhancer({ originalPrompt, onEnhanced, onClose }: PromptEnhancerProps) {
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhancedPrompt, setEnhancedPrompt] = useState('')

  const enhancePrompt = async () => {
    setIsEnhancing(true)
    try {
      // TODO: Implement actual prompt enhancement
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const enhanced = `Enhanced: ${originalPrompt}

Please create a modern, responsive application with the following requirements:

1. **Technology Stack**: Use Next.js 14+ with TypeScript, Tailwind CSS, and shadcn/ui components
2. **Architecture**: Implement clean code architecture with proper separation of concerns
3. **Features**: Include user authentication, data persistence, and real-time updates
4. **Design**: Follow modern UI/UX principles with dark/light theme support
5. **Performance**: Optimize for Core Web Vitals and mobile responsiveness
6. **Deployment**: Configure for Cloudflare Pages deployment

Additional context: Make sure the application is production-ready with proper error handling, loading states, and accessibility features.`

      setEnhancedPrompt(enhanced)
    } catch (error) {
      console.error('Error enhancing prompt:', error)
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleUseEnhanced = () => {
    onEnhanced(enhancedPrompt)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>Prompt Enhancement</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Original Prompt */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline">Original</Badge>
              <span className="text-sm text-muted-foreground">Your prompt</span>
            </div>
            <Card className="p-3 bg-muted/50">
              <p className="text-sm">{originalPrompt}</p>
            </Card>
          </div>

          {/* Enhanced Prompt */}
          {enhancedPrompt ? (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="default">Enhanced</Badge>
                <span className="text-sm text-muted-foreground">AI-optimized prompt</span>
              </div>
              <div className="max-h-60 overflow-auto">
                <Textarea 
                  value={enhancedPrompt}
                  onChange={(e) => setEnhancedPrompt(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              {!isEnhancing && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Enhance Your Prompt</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our AI will optimize your prompt with technical details, best practices, and clear requirements.
                    </p>
                    <Button onClick={enhancePrompt} className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enhance Prompt
                    </Button>
                  </div>
                </div>
              )}
              
              {isEnhancing && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Enhancing Your Prompt</h3>
                    <p className="text-sm text-muted-foreground">
                      Adding technical specifications and best practices...
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {enhancedPrompt && (
            <div className="flex space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleUseEnhanced} className="flex-1">
                Use Enhanced Prompt
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}