"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Code,
  Eye,
  ExternalLink,
  Play,
  Square,
  Monitor,
  Smartphone,
  Tablet,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface LivePreviewProps {
  projectId: string | null
  selectedFile: string | null
  mode: 'code' | 'preview'
  onModeChange: (mode: 'code' | 'preview') => void
}

const mockFileContent = {
  'header.tsx': {
    language: 'typescript',
    content: `import React from 'react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-lg text-muted-foreground mt-2">{subtitle}</p>
        )}
        <div className="mt-4">
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  )
}`
  },
  'footer.tsx': {
    language: 'typescript',
    content: `import React from 'react'

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">
            Built with Evolution AI
          </p>
        </div>
      </div>
    </footer>
  )
}`
  }
}

export function LivePreview({ projectId, selectedFile, mode, onModeChange }: LivePreviewProps) {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildStatus, setBuildStatus] = useState<'idle' | 'building' | 'success' | 'error'>('idle')

  const handleBuild = async () => {
    setIsBuilding(true)
    setBuildStatus('building')
    
    // Simulate build process
    setTimeout(() => {
      setIsBuilding(false)
      setBuildStatus('success')
    }, 3000)
  }

  const getDeviceClass = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'max-w-sm'
      case 'tablet':
        return 'max-w-2xl'
      default:
        return 'w-full'
    }
  }

  const getSelectedFileContent = () => {
    if (!selectedFile || !mockFileContent[selectedFile as keyof typeof mockFileContent]) {
      return {
        language: 'typescript',
        content: '// Select a file to view its content'
      }
    }
    return mockFileContent[selectedFile as keyof typeof mockFileContent]
  }

  const getBuildStatusIcon = () => {
    switch (buildStatus) {
      case 'building':
        return <Loader2 className="w-4 h-4 animate-spin" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />
    }
  }

  if (!projectId) {
    return (
      <div className="h-full">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">Live Preview</h3>
          <p className="text-sm text-muted-foreground">No project loaded</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <Monitor className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">Start a new project to see live preview</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Live Preview</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={buildStatus === 'success' ? 'default' : 'secondary'} className="text-xs">
                {getBuildStatusIcon()}
                <span className="ml-1">{buildStatus}</span>
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBuild}
              disabled={isBuilding}
            >
              {isBuilding ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Building
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Build
                </>
              )}
            </Button>
            
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={mode} onValueChange={(value) => onModeChange(value as 'code' | 'preview')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">
              <Code className="w-4 h-4 mr-2" />
              Code
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {mode === 'code' ? (
        <div className="flex-1 flex flex-col">
          {/* File Info */}
          {selectedFile && (
            <div className="p-3 border-b border-border bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{selectedFile}</span>
                <Badge variant="outline" className="text-xs">
                  {getSelectedFileContent().language}
                </Badge>
              </div>
            </div>
          )}
          
          {/* Code Editor */}
          <ScrollArea className="flex-1">
            <SyntaxHighlighter
              language={getSelectedFileContent().language}
              style={oneDark}
              showLineNumbers
              className="text-sm"
              customStyle={{
                margin: 0,
                background: 'transparent',
                padding: '1rem',
              }}
            >
              {getSelectedFileContent().content}
            </SyntaxHighlighter>
          </ScrollArea>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Device Controls */}
          <div className="p-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <Button
                variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewDevice('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewDevice('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewDevice('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 p-4 bg-muted/20">
            <div className={`mx-auto transition-all duration-300 ${getDeviceClass()}`}>
              <Card className="aspect-[16/10] overflow-hidden">
                {buildStatus === 'success' ? (
                  <iframe
                    src="/preview"
                    className="w-full h-full border-0"
                    title="Live Preview"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-background">
                    <div className="text-center space-y-3">
                      {buildStatus === 'building' ? (
                        <>
                          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                          <p className="text-sm text-muted-foreground">Building your application...</p>
                        </>
                      ) : (
                        <>
                          <Play className="w-8 h-8 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">Click Build to see live preview</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}