"use client"

import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronDown, 
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Plus,
  MoreHorizontal,
  FileText,
  FileCode,
  Settings,
  Image as ImageIcon,
  Smartphone,
  Globe,
  Database
} from 'lucide-react'

interface FileStructureProps {
  projectId: string | null
  selectedFile: string | null
  onFileSelect: (fileId: string) => void
}

interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string
  children?: FileNode[]
  isExpanded?: boolean
  status?: 'modified' | 'new' | 'deleted'
  icon?: React.ElementType
}

const mockFileStructure: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    path: 'src',
    isExpanded: true,
    children: [
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        path: 'src/components',
        isExpanded: true,
        children: [
          { id: 'header.tsx', name: 'Header.tsx', type: 'file', path: 'src/components/Header.tsx', icon: FileCode },
          { id: 'footer.tsx', name: 'Footer.tsx', type: 'file', path: 'src/components/Footer.tsx', icon: FileCode, status: 'new' },
        ]
      },
      {
        id: 'pages',
        name: 'pages',
        type: 'folder',
        path: 'src/pages',
        isExpanded: false,
        children: [
          { id: 'home.tsx', name: 'home.tsx', type: 'file', path: 'src/pages/home.tsx', icon: FileCode },
          { id: 'about.tsx', name: 'about.tsx', type: 'file', path: 'src/pages/about.tsx', icon: FileCode, status: 'modified' },
        ]
      },
      { id: 'app.tsx', name: 'App.tsx', type: 'file', path: 'src/App.tsx', icon: FileCode }
    ]
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    path: 'public',
    isExpanded: false,
    children: [
      { id: 'favicon.ico', name: 'favicon.ico', type: 'file', path: 'public/favicon.ico', icon: ImageIcon },
      { id: 'logo.png', name: 'logo.png', type: 'file', path: 'public/logo.png', icon: ImageIcon },
    ]
  },
  { id: 'package.json', name: 'package.json', type: 'file', path: 'package.json', icon: Settings },
  { id: 'readme.md', name: 'README.md', type: 'file', path: 'README.md', icon: FileText },
]

export function FileStructure({ projectId, selectedFile, onFileSelect }: FileStructureProps) {
  const [fileTree, setFileTree] = useState<FileNode[]>(mockFileStructure)

  const toggleFolder = (nodeId: string) => {
    const updateTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId && node.type === 'folder') {
          return { ...node, isExpanded: !node.isExpanded }
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) }
        }
        return node
      })
    }
    setFileTree(updateTree(fileTree))
  }

  const getFileIcon = (node: FileNode) => {
    if (node.type === 'folder') {
      return node.isExpanded ? FolderOpen : Folder
    }
    return node.icon || File
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'new':
        return 'text-green-500'
      case 'modified':
        return 'text-yellow-500'
      case 'deleted':
        return 'text-red-500'
      default:
        return 'text-muted-foreground'
    }
  }

  const renderFileNode = (node: FileNode, level: number = 0) => {
    const Icon = getFileIcon(node)
    const isSelected = selectedFile === node.id

    return (
      <div key={node.id}>
        <div
          className={`flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer ${
            isSelected ? 'bg-accent' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id)
            } else {
              onFileSelect(node.id)
            }
          }}
        >
          {node.type === 'folder' && (
            <div className="w-4 h-4 flex items-center justify-center">
              {node.isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </div>
          )}
          <Icon className={`w-4 h-4 ${getStatusColor(node.status)}`} />
          <span className="text-sm truncate flex-1">{node.name}</span>
          {node.status && (
            <Badge variant="outline" className="text-xs px-1 h-5">
              {node.status}
            </Badge>
          )}
        </div>
        
        {node.type === 'folder' && node.isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (!projectId) {
    return (
      <div className="h-full border-r border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">Project Files</h3>
          <p className="text-sm text-muted-foreground">No project loaded</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <Folder className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">Start a new project to see files</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Project Files</h3>
            <p className="text-sm text-muted-foreground">my-app</p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Project Type */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Web Application</p>
            <p className="text-xs text-muted-foreground">Next.js + TypeScript</p>
          </div>
        </div>
      </div>

      {/* File Tree */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {fileTree.map(node => renderFileNode(node))}
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="p-3 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          New File
        </Button>
      </div>
    </div>
  )
}