import { create } from 'zustand'
import { ModelRouter, type AIModel } from '@/lib/model-router'
import type { Agent, AgentType, AgentStatus, Tool, Workflow, WorkflowStep } from '@/types'

interface AgentOrchestratorState {
  agents: Map<string, Agent>
  activeWorkflows: Map<string, Workflow>
  tools: Map<string, Tool>
  isInitialized: boolean
  
  // Actions
  initializeOrchestrator: () => Promise<void>
  createAgent: (type: AgentType, config?: Partial<Agent>) => Promise<Agent>
  assignTask: (agentId: string, task: any) => Promise<string>
  createWorkflow: (name: string, description: string, steps: Omit<WorkflowStep, 'id'>[]) => string
  executeWorkflow: (workflowId: string, input?: any) => Promise<void>
  updateAgentStatus: (agentId: string, status: AgentStatus, currentTask?: string) => void
  getAvailableAgents: (capabilities?: string[]) => Agent[]
  getBestAgentForTask: (taskType: string, requirements?: any) => Agent | null
  
  // Tool Management
  registerTool: (tool: Omit<Tool, 'id' | 'performance'>) => string
  createDynamicTool: (description: string, requirements: any) => Promise<Tool>
  evolveTool: (toolId: string, usageData: any) => Promise<void>
}

// Specialized Agent Templates based on VoltAgent research
const AGENT_TEMPLATES = {
  // Meta-Orchestration Agents
  'agent-organizer': {
    name: 'Agent Organizer',
    description: 'Multi-agent coordinator and team assembly specialist',
    capabilities: ['task-decomposition', 'agent-selection', 'workflow-design', 'team-optimization'],
    tools: ['context-query', 'agent-capability-mapping', 'workflow-orchestration'],
    model: 'kimi-k2-0905' as AIModel
  },
  
  'context-manager': {
    name: 'Context Manager',
    description: 'Information storage, retrieval, and synchronization expert',
    capabilities: ['state-management', 'data-synchronization', 'context-optimization', 'retrieval'],
    tools: ['database-query', 'state-sync', 'context-retrieval', 'data-lifecycle'],
    model: 'kimi-k2-0905' as AIModel
  },
  
  'performance-monitor': {
    name: 'Performance Monitor',
    description: 'System-wide metrics collection and optimization specialist',
    capabilities: ['metrics-collection', 'anomaly-detection', 'performance-analysis', 'optimization'],
    tools: ['metrics-aggregation', 'alert-management', 'bottleneck-analysis'],
    model: 'deepseek-v3.2' as AIModel
  },
  
  'error-coordinator': {
    name: 'Error Coordinator',
    description: 'Distributed error handling and recovery specialist',
    capabilities: ['error-correlation', 'failure-recovery', 'cascade-prevention', 'system-resilience'],
    tools: ['error-aggregation', 'circuit-breaker', 'recovery-orchestration'],
    model: 'deepseek-v3.2' as AIModel
  },
  
  // Development Agents
  'nextjs-developer': {
    name: 'Next.js Developer',
    description: 'Next.js 14+ full-stack development specialist',
    capabilities: ['component-creation', 'api-development', 'routing', 'optimization', 'deployment'],
    tools: ['code-generation', 'file-manipulation', 'build-optimization'],
    model: 'qwen3-coder-plus' as AIModel
  },
  
  'react-specialist': {
    name: 'React Specialist',
    description: 'React 18+ modern patterns and state management expert',
    capabilities: ['component-architecture', 'state-management', 'hooks-optimization', 'performance'],
    tools: ['component-generation', 'state-optimization', 'performance-analysis'],
    model: 'qwen3-coder-plus' as AIModel
  },
  
  'ui-designer': {
    name: 'UI Designer',
    description: 'Modern UI/UX design and component creation specialist',
    capabilities: ['design-systems', 'component-design', 'accessibility', 'responsive-design'],
    tools: ['design-generation', 'component-styling', 'accessibility-check'],
    model: 'qwen3-vl-plus' as AIModel
  },
  
  // Specialized Domain Agents
  'mobile-developer': {
    name: 'Mobile Developer',
    description: 'Cross-platform mobile application specialist',
    capabilities: ['mobile-ui', 'native-features', 'app-optimization', 'store-deployment'],
    tools: ['mobile-generation', 'native-integration', 'performance-optimization'],
    model: 'qwen3-coder-plus' as AIModel
  },
  
  'api-architect': {
    name: 'API Architect',
    description: 'RESTful API and backend service design expert',
    capabilities: ['api-design', 'database-integration', 'authentication', 'rate-limiting'],
    tools: ['api-generation', 'schema-validation', 'auth-implementation'],
    model: 'qwen3-coder-plus' as AIModel
  },
  
  'requirement-analyst': {
    name: 'Requirement Analyst',
    description: 'User requirement gathering and analysis specialist',
    capabilities: ['requirement-extraction', 'user-story-creation', 'scope-definition'],
    tools: ['conversation-analysis', 'requirement-structuring', 'scope-validation'],
    model: 'glm-4.6' as AIModel
  }
}

export const useAgentOrchestrator = create<AgentOrchestratorState>((set, get) => ({
  agents: new Map(),
  activeWorkflows: new Map(),
  tools: new Map(),
  isInitialized: false,

  initializeOrchestrator: async () => {
    const state = get()
    
    if (state.isInitialized) return
    
    console.log('🚀 Initializing Agent Orchestrator...')
    
    // Initialize core agents
    const coreAgentTypes: AgentType[] = [
      'meta-orchestration',
      'development',
      'domain-specific',
      'quality-security'
    ]
    
    const initializedAgents = new Map<string, Agent>()
    
    // Create essential agents
    const essentialAgents = [
      'agent-organizer',
      'context-manager', 
      'nextjs-developer',
      'react-specialist',
      'ui-designer',
      'requirement-analyst'
    ]
    
    for (const agentKey of essentialAgents) {
      const template = AGENT_TEMPLATES[agentKey as keyof typeof AGENT_TEMPLATES]
      if (template) {
        const agent: Agent = {
          id: agentKey,
          name: template.name,
          type: agentKey.includes('organizer') || agentKey.includes('context') ? 'meta-orchestration' :
                agentKey.includes('nextjs') || agentKey.includes('react') || agentKey.includes('ui') ? 'development' :
                'domain-specific',
          description: template.description,
          capabilities: template.capabilities,
          status: 'idle',
          performance: {
            tasksCompleted: 0,
            successRate: 100,
            averageResponseTime: 0,
            lastActive: new Date(),
            rating: 5
          },
          tools: template.tools,
          model: template.model
        }
        
        initializedAgents.set(agentKey, agent)
      }
    }
    
    console.log(`✅ Initialized ${initializedAgents.size} agents`)
    
    set({
      agents: initializedAgents,
      isInitialized: true
    })
  },

  createAgent: async (type: AgentType, config?: Partial<Agent>) => {
    const id = `${type}-${Date.now()}`
    const model = ModelRouter.getModelForAgent(type)
    
    const agent: Agent = {
      id,
      name: config?.name || `${type} Agent`,
      type,
      description: config?.description || `Specialized ${type} agent`,
      capabilities: config?.capabilities || [],
      status: 'idle',
      performance: {
        tasksCompleted: 0,
        successRate: 100,
        averageResponseTime: 0,
        lastActive: new Date(),
        rating: 5
      },
      tools: config?.tools || [],
      model,
      ...config
    }
    
    const { agents } = get()
    agents.set(id, agent)
    
    set({ agents: new Map(agents) })
    
    console.log(`🤖 Created agent: ${agent.name} (${agent.type})`)
    
    return agent
  },

  assignTask: async (agentId: string, task: any) => {
    const { agents } = get()
    const agent = agents.get(agentId)
    
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`)
    }
    
    // Update agent status
    agent.status = 'active'
    agent.currentTask = task.description || task.type || 'Executing task'
    agent.performance.lastActive = new Date()
    
    agents.set(agentId, agent)
    set({ agents: new Map(agents) })
    
    console.log(`📋 Assigned task to ${agent.name}: ${agent.currentTask}`)
    
    // Create workflow for task execution
    const workflowId = get().createWorkflow(
      `Task: ${task.type}`,
      `Executing ${task.type} task`,
      [{
        name: 'Execute Task',
        agentId,
        status: 'running',
        input: task,
        dependencies: []
      }]
    )
    
    return workflowId
  },

  createWorkflow: (name: string, description: string, steps: Omit<WorkflowStep, 'id'>[]) => {
    const id = `workflow-${Date.now()}`
    
    const workflow: Workflow = {
      id,
      name,
      description,
      steps: steps.map((step, index) => ({
        ...step,
        id: `step-${index}`,
        status: step.status || 'waiting'
      })),
      status: 'pending',
      progress: 0
    }
    
    const { activeWorkflows } = get()
    activeWorkflows.set(id, workflow)
    
    set({ activeWorkflows: new Map(activeWorkflows) })
    
    console.log(`🔄 Created workflow: ${name}`)
    
    return id
  },

  executeWorkflow: async (workflowId: string, input?: any) => {
    const { activeWorkflows, agents } = get()
    const workflow = activeWorkflows.get(workflowId)
    
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`)
    }
    
    workflow.status = 'running'
    workflow.startedAt = new Date()
    
    console.log(`▶️  Executing workflow: ${workflow.name}`)
    
    try {
      // Execute steps sequentially (for now)
      for (const step of workflow.steps) {
        const agent = agents.get(step.agentId)
        
        if (!agent) {
          step.status = 'failed'
          step.error = `Agent ${step.agentId} not found`
          continue
        }
        
        step.status = 'running'
        step.startedAt = new Date()
        
        // Simulate agent execution
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        step.status = 'completed'
        step.completedAt = new Date()
        step.output = { success: true, result: `Task completed by ${agent.name}` }
        
        // Update agent performance
        agent.performance.tasksCompleted++
        agent.performance.averageResponseTime = 
          (agent.performance.averageResponseTime + 1000) / 2
        agent.status = 'idle'
        agent.currentTask = undefined
      }
      
      workflow.status = 'completed'
      workflow.completedAt = new Date()
      workflow.progress = 100
      
      console.log(`✅ Workflow completed: ${workflow.name}`)
      
    } catch (error) {
      workflow.status = 'failed'
      workflow.error = error instanceof Error ? error.message : 'Unknown error'
      
      console.error(`❌ Workflow failed: ${workflow.name}`, error)
    }
    
    activeWorkflows.set(workflowId, workflow)
    set({ 
      activeWorkflows: new Map(activeWorkflows),
      agents: new Map(agents)
    })
  },

  updateAgentStatus: (agentId: string, status: AgentStatus, currentTask?: string) => {
    const { agents } = get()
    const agent = agents.get(agentId)
    
    if (agent) {
      agent.status = status
      agent.currentTask = currentTask
      agent.performance.lastActive = new Date()
      
      agents.set(agentId, agent)
      set({ agents: new Map(agents) })
    }
  },

  getAvailableAgents: (capabilities?: string[]) => {
    const { agents } = get()
    
    return Array.from(agents.values()).filter(agent => {
      if (agent.status === 'offline' || agent.status === 'error') {
        return false
      }
      
      if (capabilities && capabilities.length > 0) {
        return capabilities.some(cap => 
          agent.capabilities.includes(cap)
        )
      }
      
      return true
    })
  },

  getBestAgentForTask: (taskType: string, requirements?: any) => {
    const availableAgents = get().getAvailableAgents()
    
    // Score agents based on capabilities match and performance
    const scoredAgents = availableAgents.map(agent => {
      let score = 0
      
      // Capability matching
      if (agent.capabilities.includes(taskType)) {
        score += 50
      }
      
      // Performance scoring
      score += agent.performance.successRate * 0.3
      score += Math.max(0, 10 - agent.performance.averageResponseTime / 1000) * 5
      
      // Availability bonus
      if (agent.status === 'idle') {
        score += 20
      }
      
      return { agent, score }
    })
    
    // Sort by score and return best match
    scoredAgents.sort((a, b) => b.score - a.score)
    
    return scoredAgents.length > 0 ? scoredAgents[0].agent : null
  },

  registerTool: (toolConfig: Omit<Tool, 'id' | 'performance'>) => {
    const id = `tool-${Date.now()}`
    
    const tool: Tool = {
      ...toolConfig,
      id,
      performance: {
        usageCount: 0,
        successRate: 100,
        averageExecutionTime: 0,
        lastUsed: new Date(),
        rating: 5
      }
    }
    
    const { tools } = get()
    tools.set(id, tool)
    
    set({ tools: new Map(tools) })
    
    console.log(`🔧 Registered tool: ${tool.name}`)
    
    return id
  },

  createDynamicTool: async (description: string, requirements: any) => {
    // This would use AI to generate a new tool based on requirements
    // For now, create a placeholder dynamic tool
    
    const toolId = get().registerTool({
      name: `Dynamic Tool: ${description}`,
      description,
      type: 'dynamic',
      category: 'generated',
      isCustom: true,
      isDynamic: true,
      parameters: [],
      createdBy: 'system'
    })
    
    console.log(`⚡ Created dynamic tool: ${description}`)
    
    const { tools } = get()
    return tools.get(toolId)!
  },

  evolveTool: async (toolId: string, usageData: any) => {
    const { tools } = get()
    const tool = tools.get(toolId)
    
    if (!tool) return
    
    // Update tool performance based on usage
    tool.performance.usageCount++
    tool.performance.lastUsed = new Date()
    
    if (usageData.executionTime) {
      tool.performance.averageExecutionTime = 
        (tool.performance.averageExecutionTime + usageData.executionTime) / 2
    }
    
    if (usageData.success !== undefined) {
      const totalUsage = tool.performance.usageCount
      const currentSuccessCount = tool.performance.successRate * (totalUsage - 1) / 100
      const newSuccessCount = currentSuccessCount + (usageData.success ? 1 : 0)
      tool.performance.successRate = (newSuccessCount / totalUsage) * 100
    }
    
    tools.set(toolId, tool)
    set({ tools: new Map(tools) })
    
    console.log(`🔄 Evolved tool: ${tool.name} (Success rate: ${tool.performance.successRate.toFixed(1)}%)`)
  }
}))

// Initialize orchestrator on module load
if (typeof window !== 'undefined') {
  useAgentOrchestrator.getState().initializeOrchestrator()
}