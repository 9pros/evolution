"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Globe, 
  Smartphone, 
  Database, 
  ShoppingCart, 
  BarChart3, 
  FileText,
  Sparkles,
  Zap,
  Brain
} from 'lucide-react'

interface WelcomeScreenProps {
  onStartProject: (projectId: string | null) => void
}

const projectTemplates = [
  {
    id: 'web-app',
    title: 'Web Application',
    description: 'Full-stack web application with modern UI',
    icon: Globe,
    tags: ['React', 'Next.js', 'TypeScript'],
    popular: true
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    description: 'Cross-platform mobile application',
    icon: Smartphone,
    tags: ['React Native', 'Flutter', 'Mobile']
  },
  {
    id: 'api-service',
    title: 'API Service',
    description: 'RESTful API with database integration',
    icon: Database,
    tags: ['Node.js', 'PostgreSQL', 'REST']
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Store',
    description: 'Online store with payment integration',
    icon: ShoppingCart,
    tags: ['E-commerce', 'Payments', 'Inventory']
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description: 'Data visualization and analytics platform',
    icon: BarChart3,
    tags: ['Charts', 'Analytics', 'Real-time']
  },
  {
    id: 'portfolio',
    title: 'Portfolio Site',
    description: 'Personal or business portfolio website',
    icon: FileText,
    tags: ['Portfolio', 'Static', 'SEO']
  }
]

export function WelcomeScreen({ onStartProject }: WelcomeScreenProps) {
  const handleStartWithTemplate = (templateId: string) => {
    onStartProject(templateId)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Evolution AI</h1>
            <p className="text-muted-foreground">Next generation AI app builder</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Brain className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Intelligent AI Agents</p>
                  <p className="text-sm text-muted-foreground">Specialized agents for every development task</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Sparkles className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Real-time Collaboration</p>
                  <p className="text-sm text-muted-foreground">Live preview and instant code generation</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">One-Click Deploy</p>
                  <p className="text-sm text-muted-foreground">Instant deployment to Cloudflare</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Start Templates</h2>
            <div className="grid grid-cols-1 gap-3">
              {projectTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <Card 
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleStartWithTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium truncate">{template.title}</h3>
                            {template.popular && (
                              <Badge variant="secondary" className="text-xs">Popular</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {template.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {template.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Custom Project */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Start from Scratch</CardTitle>
              <CardDescription>
                Describe your project in natural language and let our AI agents build it for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => onStartProject('custom')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Custom Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}