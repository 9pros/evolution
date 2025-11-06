# AI Model Capabilities Index

This document defines the capabilities and optimal use cases for each AI model in the Evolution AI platform.

## Model Specifications

### qwen3-coder-plus (OPENAI_LIKE_CHAT_MODEL_1)
**Primary Role:** Code Generation & Software Development
- **Strengths:** 
  - Advanced code completion and generation
  - Multi-language programming support
  - Code refactoring and optimization
  - API integration and documentation
- **Use Cases:**
  - React/Next.js component generation
  - Backend API development
  - Database schema design
  - Code review and optimization
- **Context Window:** Large (supports complex codebases)
- **Speed:** Fast inference for real-time coding assistance

### qwen3-vl-plus (OPENAI_LIKE_CHAT_MODEL_2)
**Primary Role:** Vision & Multimodal Understanding
- **Strengths:**
  - Image-to-code conversion
  - UI/UX design analysis
  - Visual component recognition
  - Mockup interpretation
- **Use Cases:**
  - Converting design mockups to code
  - Analyzing uploaded UI screenshots
  - Visual debugging and layout optimization
  - Design system component extraction
- **Modalities:** Text + Vision
- **Best For:** Converting visual designs to functional code

### kimi-k2-0905 (OPENAI_LIKE_CHAT_MODEL_3)
**Primary Role:** Long Context Planning & Architecture
- **Strengths:**
  - Extended context understanding
  - System architecture design
  - Complex project planning
  - Multi-file coordination
- **Use Cases:**
  - Project architecture planning
  - Multi-component system design
  - Long-term project evolution
  - Complex workflow orchestration
- **Context Window:** Extremely large (ideal for full project context)
- **Best For:** High-level system design and planning

### glm-4.6 (OPENAI_LIKE_CHAT_MODEL_4)
**Primary Role:** Natural Language & User Interaction
- **Strengths:**
  - Natural conversation flow
  - Requirement gathering
  - User intent understanding
  - Content generation
- **Use Cases:**
  - Initial user conversation and requirement gathering
  - Prompt enhancement and optimization
  - Documentation generation
  - User experience optimization
- **Best For:** Human-like conversation and requirement analysis

### deepseek-v3.2 (OPENAI_LIKE_CHAT_MODEL_5)
**Primary Role:** Advanced Reasoning & Problem Solving
- **Strengths:**
  - Complex problem decomposition
  - Advanced debugging and error resolution
  - Performance optimization
  - Security analysis
- **Use Cases:**
  - Complex bug diagnosis
  - Performance bottleneck analysis
  - Security vulnerability assessment
  - Advanced algorithm implementation
- **Best For:** Deep technical analysis and problem solving

## Model Selection Strategy

### Task-Based Routing
1. **Initial User Interaction:** glm-4.6 (natural conversation)
2. **Design Upload/Analysis:** qwen3-vl-plus (vision capabilities)
3. **Code Generation:** qwen3-coder-plus (specialized coding)
4. **Architecture Planning:** kimi-k2-0905 (long context)
5. **Problem Solving:** deepseek-v3.2 (advanced reasoning)

### Dynamic Model Switching
The agent orchestrator will dynamically switch between models based on:
- Task complexity
- Input type (text, image, code)
- Context requirements
- Performance needs
- User preferences

### Model Ensemble Patterns
- **Consensus Generation:** Multiple models validate critical decisions
- **Specialized Pipeline:** Sequential model usage for complex tasks
- **Parallel Processing:** Multiple models work on different aspects simultaneously
- **Fallback Strategy:** Secondary model activation on primary failure