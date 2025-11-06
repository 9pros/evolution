// AI Model Types
export type AIModel = 
  | 'qwen3-coder-plus'    // OPENAI_LIKE_CHAT_MODEL_1
  | 'qwen3-vl-plus'       // OPENAI_LIKE_CHAT_MODEL_2
  | 'kimi-k2-0905'        // OPENAI_LIKE_CHAT_MODEL_3
  | 'glm-4.6'             // OPENAI_LIKE_CHAT_MODEL_4
  | 'deepseek-v3.2'       // OPENAI_LIKE_CHAT_MODEL_5

export interface ModelCapability {
  model: AIModel
  name: string
  description: string
  strengths: string[]
  useCases: string[]
  contextWindow: number
  speed: 'fast' | 'medium' | 'slow'
  modalities: ('text' | 'vision' | 'code')[]
}

// Chat Types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  model?: AIModel
  agentId?: string
  attachments?: FileAttachment[]
  metadata?: Record<string, any>
}

export interface FileAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  preview?: string
}

// Agent Types
export interface Agent {
  id: string
  name: string
  type: AgentType
  description: string
  capabilities: string[]
  status: AgentStatus
  currentTask?: string
  performance: AgentPerformance
  tools: string[]
  model?: AIModel
}

export type AgentType = 
  | 'meta-orchestration'
  | 'development'
  | 'domain-specific'
  | 'quality-security'
  | 'data-ai'
  | 'devops-infrastructure'
  | 'business-product'
  | 'user-experience'

export type AgentStatus = 'idle' | 'active' | 'busy' | 'error' | 'offline'

export interface AgentPerformance {
  tasksCompleted: number
  successRate: number
  averageResponseTime: number
  lastActive: Date
  rating: number
}

// Project Types
export interface Project {
  id: string
  name: string
  description: string
  type: ProjectType
  status: ProjectStatus
  createdAt: Date
  updatedAt: Date
  owner: string
  files: ProjectFile[]
  deploymentUrl?: string
  metadata: Record<string, any>
}

export type ProjectType = 
  | 'web-app'
  | 'mobile-app'
  | 'api'
  | 'landing-page'
  | 'dashboard'
  | 'e-commerce'
  | 'blog'
  | 'portfolio'
  | 'other'

export type ProjectStatus = 
  | 'initializing'
  | 'in-progress'
  | 'building'
  | 'deploying'
  | 'deployed'
  | 'error'

export interface ProjectFile {
  id: string
  path: string
  name: string
  type: FileType
  content: string
  size: number
  lastModified: Date
  isGenerated: boolean
  generatedBy?: string
}

export type FileType = 
  | 'component'
  | 'page'
  | 'api'
  | 'config'
  | 'style'
  | 'asset'
  | 'documentation'
  | 'test'

// Tool Types
export interface Tool {
  id: string
  name: string
  description: string
  type: ToolType
  category: string
  isCustom: boolean
  isDynamic: boolean
  parameters: ToolParameter[]
  performance: ToolPerformance
  createdBy?: string
}

export type ToolType = 'static' | 'dynamic' | 'evolved' | 'user-generated'

export interface ToolParameter {
  name: string
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
  required: boolean
  description: string
  defaultValue?: any
}

export interface ToolPerformance {
  usageCount: number
  successRate: number
  averageExecutionTime: number
  lastUsed: Date
  rating: number
}

// Workflow Types
export interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  status: WorkflowStatus
  progress: number
  startedAt?: Date
  completedAt?: Date
  error?: string
}

export type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'

export interface WorkflowStep {
  id: string
  name: string
  agentId: string
  toolId?: string
  status: StepStatus
  input: any
  output?: any
  error?: string
  startedAt?: Date
  completedAt?: Date
  dependencies: string[]
}

export type StepStatus = 'waiting' | 'running' | 'completed' | 'failed' | 'skipped'

// UI Types
export interface WorkbenchState {
  activePanel: 'chat' | 'files' | 'preview'
  previewMode: 'code' | 'preview'
  selectedFile?: string
  chatHistory: ChatMessage[]
  isGenerating: boolean
  error?: string
}

export interface FileTreeNode {
  id: string
  name: string
  path: string
  type: 'file' | 'folder'
  children?: FileTreeNode[]
  isExpanded?: boolean
  isSelected?: boolean
  isNew?: boolean
  status?: 'modified' | 'new' | 'deleted'
}

// API Types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface GenerationRequest {
  prompt: string
  model?: AIModel
  agentType?: AgentType
  context?: Record<string, any>
  files?: FileAttachment[]
  options?: GenerationOptions
}

export interface GenerationOptions {
  stream?: boolean
  temperature?: number
  maxTokens?: number
  includeContext?: boolean
  optimizePrompt?: boolean
}

export interface GenerationResponse {
  id: string
  content: string
  model: AIModel
  agentId: string
  files?: ProjectFile[]
  suggestions?: string[]
  metadata: Record<string, any>
}

// WebSocket Types
export interface WebSocketMessage {
  type: string
  payload: any
  timestamp: Date
  id: string
}

export interface AgentUpdate {
  agentId: string
  status: AgentStatus
  progress?: number
  message?: string
  currentTask?: string
}

export interface FileUpdate {
  fileId: string
  content: string
  path: string
  type: 'create' | 'update' | 'delete'
}

export interface PreviewUpdate {
  projectId: string
  url: string
  status: 'building' | 'ready' | 'error'
  error?: string
}