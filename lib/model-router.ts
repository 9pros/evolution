import { type ModelCapability, type AIModel } from '@/types'

export const MODEL_CAPABILITIES: Record<AIModel, ModelCapability> = {
  'qwen3-coder-plus': {
    model: 'qwen3-coder-plus',
    name: 'Qwen3 Coder Plus',
    description: 'Advanced code generation and software development',
    strengths: [
      'Code completion and generation',
      'Multi-language programming support', 
      'Code refactoring and optimization',
      'API integration and documentation'
    ],
    useCases: [
      'React/Next.js component generation',
      'Backend API development',
      'Database schema design',
      'Code review and optimization'
    ],
    contextWindow: 32000,
    speed: 'fast',
    modalities: ['text', 'code']
  },
  
  'qwen3-vl-plus': {
    model: 'qwen3-vl-plus',
    name: 'Qwen3 Vision Plus',
    description: 'Vision and multimodal understanding',
    strengths: [
      'Image-to-code conversion',
      'UI/UX design analysis',
      'Visual component recognition',
      'Mockup interpretation'
    ],
    useCases: [
      'Converting design mockups to code',
      'Analyzing uploaded UI screenshots',
      'Visual debugging and layout optimization',
      'Design system component extraction'
    ],
    contextWindow: 8000,
    speed: 'medium',
    modalities: ['text', 'vision', 'code']
  },
  
  'kimi-k2-0905': {
    model: 'kimi-k2-0905',
    name: 'Kimi K2',
    description: 'Long context planning and architecture',
    strengths: [
      'Extended context understanding',
      'System architecture design',
      'Complex project planning',
      'Multi-file coordination'
    ],
    useCases: [
      'Project architecture planning',
      'Multi-component system design',
      'Long-term project evolution',
      'Complex workflow orchestration'
    ],
    contextWindow: 200000,
    speed: 'medium',
    modalities: ['text', 'code']
  },
  
  'glm-4.6': {
    model: 'glm-4.6',
    name: 'GLM 4.6',
    description: 'Natural language and user interaction',
    strengths: [
      'Natural conversation flow',
      'Requirement gathering',
      'User intent understanding', 
      'Content generation'
    ],
    useCases: [
      'Initial user conversation and requirement gathering',
      'Prompt enhancement and optimization',
      'Documentation generation',
      'User experience optimization'
    ],
    contextWindow: 16000,
    speed: 'fast',
    modalities: ['text']
  },
  
  'deepseek-v3.2': {
    model: 'deepseek-v3.2',
    name: 'DeepSeek V3.2',
    description: 'Advanced reasoning and problem solving',
    strengths: [
      'Complex problem decomposition',
      'Advanced debugging and error resolution',
      'Performance optimization',
      'Security analysis'
    ],
    useCases: [
      'Complex bug diagnosis',
      'Performance bottleneck analysis',
      'Security vulnerability assessment',
      'Advanced algorithm implementation'
    ],
    contextWindow: 64000,
    speed: 'slow',
    modalities: ['text', 'code']
  }
}

export class ModelRouter {
  static selectModel(taskType: string, inputType?: string): AIModel {
    switch (taskType) {
      case 'conversation':
      case 'requirements':
      case 'prompt-enhancement':
        return 'glm-4.6'
        
      case 'vision':
      case 'image-analysis':
      case 'design-conversion':
        return 'qwen3-vl-plus'
        
      case 'code-generation':
      case 'component-creation':
      case 'api-development':
        return 'qwen3-coder-plus'
        
      case 'architecture':
      case 'planning':
      case 'complex-design':
        return 'kimi-k2-0905'
        
      case 'debugging':
      case 'optimization':
      case 'security':
      case 'problem-solving':
        return 'deepseek-v3.2'
        
      default:
        // Default to conversation model for unknown tasks
        return 'glm-4.6'
    }
  }
  
  static getModelForAgent(agentType: string): AIModel {
    const modelMap: Record<string, AIModel> = {
      'agent-organizer': 'kimi-k2-0905',
      'context-manager': 'kimi-k2-0905',
      'performance-monitor': 'deepseek-v3.2',
      'error-coordinator': 'deepseek-v3.2',
      'nextjs-developer': 'qwen3-coder-plus',
      'react-specialist': 'qwen3-coder-plus',
      'ui-designer': 'qwen3-vl-plus',
      'backend-architect': 'qwen3-coder-plus',
      'requirement-analyst': 'glm-4.6',
      'user-researcher': 'glm-4.6'
    }
    
    return modelMap[agentType] || 'glm-4.6'
  }
  
  static getBestModelForContext(contextSize: number): AIModel {
    if (contextSize > 100000) return 'kimi-k2-0905'
    if (contextSize > 50000) return 'deepseek-v3.2'
    if (contextSize > 20000) return 'qwen3-coder-plus'
    return 'glm-4.6'
  }
}

export function getModelCapabilities(model: AIModel): ModelCapability {
  return MODEL_CAPABILITIES[model]
}

export function getAllModels(): ModelCapability[] {
  return Object.values(MODEL_CAPABILITIES)
}