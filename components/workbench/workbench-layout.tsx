"use client"

import { useState } from 'react'
import { ChatInterface } from './chat-interface'
import { FileStructure } from './file-structure' 
import { LivePreview } from './live-preview'
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable'

export function WorkbenchLayout() {
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<'code' | 'preview'>('code')

  return (
    <div className="h-screen w-full bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Chat Interface */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={50}>
          <ChatInterface
            onProjectChange={setActiveProject}
            activeProject={activeProject}
          />
        </ResizablePanel>

        <ResizableHandle />

        {/* File Structure */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileStructure
            projectId={activeProject}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </ResizablePanel>

        <ResizableHandle />

        {/* Live Preview */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <LivePreview
            projectId={activeProject}
            selectedFile={selectedFile}
            mode={previewMode}
            onModeChange={setPreviewMode}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}