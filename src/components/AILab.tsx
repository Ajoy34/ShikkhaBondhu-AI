import React, { useState } from 'react';
import {
  Cpu, Zap, Code, Gamepad2, Rocket, BookOpen,
  Play, Download, Settings, Users, Star, Clock,
  TrendingUp, Award, Shield, MessageSquare, Bot,
  Wrench, Database, Brain, Target
} from 'lucide-react';

const AILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('resources');

  const gpuResources = [
    {
      id: 1,
      name: 'NVIDIA A100',
      specs: '40GB VRAM',
      available: 3,
      total: 5,
      usage: 60,
      performance: 'High',
      status: 'available'
    },
    {
      id: 2,
      name: 'NVIDIA V100',
      specs: '32GB VRAM',
      available: 5,
      total: 8,
      usage: 37,
      performance: 'Medium',
      status: 'available'
    },
    {
      id: 3,
      name: 'Tesla T4',
      specs: '16GB VRAM',
      available: 2,
      total: 10,
      usage: 80,
      performance: 'Standard',
      status: 'limited'
    }
  ];

  const aiChatbots = [
    {
      id: 1,
      name: 'GPT-4 API',
      description: 'Advanced language model for complex tasks',
      icon: '🤖',
      status: 'available',
      models: ['gpt-4', 'gpt-4-turbo'],
      useCases: ['Content Generation', 'Code Assistance', 'Analysis']
    },
    {
      id: 2,
      name: 'Claude',
      description: 'Anthropic AI for detailed reasoning',
      icon: '🧠',
      status: 'available',
      models: ['claude-3-opus', 'claude-3-sonnet'],
      useCases: ['Research', 'Writing', 'Problem Solving']
    },
    {
      id: 3,
      name: 'Llama 3',
      description: 'Open-source model for local deployment',
      icon: '🦙',
      status: 'available',
      models: ['llama-3-70b', 'llama-3-8b'],
      useCases: ['Custom Training', 'Fine-tuning', 'Privacy']
    },
    {
      id: 4,
      name: 'Gemini Pro',
      description: 'Google multimodal AI',
      icon: '✨',
      status: 'available',
      models: ['gemini-pro', 'gemini-pro-vision'],
      useCases: ['Multimodal', 'Vision', 'Long Context']
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'AI & Machine Learning Fundamentals',
      instructor: 'Dr. Rahman Ahmed',
      duration: '8 weeks',
      level: 'Beginner',
      students: 1234,
      rating: 4.8,
      price: 'Free',
      image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Python', 'Neural Networks', 'Deep Learning']
    },
    {
      id: 2,
      title: 'Game Development with Unity',
      instructor: 'Farhana Khan',
      duration: '10 weeks',
      level: 'Intermediate',
      students: 892,
      rating: 4.9,
      price: 'Free',
      image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Unity', 'C#', '3D Graphics', 'Game Design']
    },
    {
      id: 3,
      title: 'Advanced Fine-tuning Techniques',
      instructor: 'Sadia Rahman',
      duration: '6 weeks',
      level: 'Advanced',
      students: 456,
      rating: 4.7,
      price: 'Free',
      image: 'https://images.pexels.com/photos/8438979/pexels-photo-8438979.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['LLMs', 'Transfer Learning', 'Model Optimization']
    },
    {
      id: 4,
      title: 'Women Safety Tech Development',
      instructor: 'Nasrin Sultana',
      duration: '4 weeks',
      level: 'Intermediate',
      students: 678,
      rating: 4.9,
      price: 'Free',
      image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Safety Apps', 'IoT', 'Emergency Systems']
    }
  ];

  const gameDevelopmentTools = [
    {
      name: 'Unity Hub',
      description: 'Complete game development platform',
      icon: '🎮',
      features: ['3D/2D Engine', 'Cross-platform', 'Asset Store'],
      status: 'Installed'
    },
    {
      name: 'Unreal Engine',
      description: 'High-fidelity game engine',
      icon: '🎯',
      features: ['AAA Graphics', 'Blueprint Visual Scripting', 'Marketplace'],
      status: 'Installed'
    },
    {
      name: 'Godot',
      description: 'Open-source game engine',
      icon: '🚀',
      features: ['Lightweight', 'GDScript', 'Free & Open'],
      status: 'Installed'
    },
    {
      name: 'Blender',
      description: '3D modeling and animation',
      icon: '🎨',
      features: ['3D Modeling', 'Animation', 'Rendering'],
      status: 'Installed'
    }
  ];

  const deployedProjects = [
    {
      id: 1,
      name: 'Smart Traffic Analyzer',
      creator: 'Tamim Rahman',
      type: 'AI Model',
      description: 'Real-time traffic pattern analysis using computer vision',
      plays: 1234,
      rating: 4.6,
      deployed: '2024-05-20'
    },
    {
      id: 2,
      name: 'Bengali Language Tutor',
      creator: 'Sanjida Khan',
      type: 'Chatbot',
      description: 'AI-powered Bengali language learning assistant',
      plays: 2345,
      rating: 4.8,
      deployed: '2024-05-18'
    },
    {
      id: 3,
      name: 'Cyber Safety Adventure',
      creator: 'Fahim Ahmed',
      type: 'Game',
      description: 'Educational game teaching cybersecurity basics',
      plays: 3456,
      rating: 4.9,
      deployed: '2024-05-15'
    }
  ];

  const womenSafetyTools = [
    {
      name: 'Emergency Alert System',
      description: 'One-tap emergency contacts notification with location',
      features: ['GPS Tracking', 'Silent Alarm', 'Auto Recording'],
      status: 'Available'
    },
    {
      name: 'Safe Route Planner',
      description: 'AI-powered route planning based on safety data',
      features: ['Crowd-sourced Data', 'Real-time Updates', 'Night Mode'],
      status: 'Available'
    },
    {
      name: 'Virtual Escort',
      description: 'Live location sharing with trusted contacts',
      features: ['Real-time Tracking', 'Check-in Reminders', 'Panic Button'],
      status: 'Available'
    },
    {
      name: 'Safety Community',
      description: 'Connect with nearby verified safety volunteers',
      features: ['Verified Volunteers', 'Instant Connect', 'Local Network'],
      status: 'Available'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-10 h-10 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">AI Innovation Lab</h2>
          </div>
          <p className="font-bangla text-xl text-blue-600 mb-4">এআই ইনোভেশন ল্যাব</p>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access powerful GPU resources, state-of-the-art AI models, comprehensive courses,
            and game development tools. Build, train, and deploy your innovations.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Cpu className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-sm text-gray-600">GPU Units</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Bot className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12+</div>
            <div className="text-sm text-gray-600">AI Models</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Courses</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Gamepad2 className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">8+</div>
            <div className="text-sm text-gray-600">Dev Tools</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          {[
            { id: 'resources', label: 'GPU Resources', icon: Cpu },
            { id: 'chatbots', label: 'AI Chatbots', icon: Bot },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'game-dev', label: 'Game Dev', icon: Gamepad2 },
            { id: 'safety', label: 'Women Safety', icon: Shield },
            { id: 'deployed', label: 'Deployed Projects', icon: Rocket }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto">
          {activeTab === 'resources' && (
            <div className="space-y-6">
              {gpuResources.map((gpu) => (
                <div key={gpu.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{gpu.name}</h3>
                      <p className="text-gray-600">{gpu.specs}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        gpu.status === 'available' ? 'bg-green-100 text-green-800' :
                        gpu.status === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {gpu.available}/{gpu.total} Available
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{gpu.performance}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Current Usage</span>
                      <span className="font-bold">{gpu.usage}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          gpu.usage > 80 ? 'bg-red-600' :
                          gpu.usage > 50 ? 'bg-yellow-500' :
                          'bg-green-600'
                        }`}
                        style={{ width: `${gpu.usage}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    disabled={gpu.available === 0}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      gpu.available > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {gpu.available > 0 ? 'Request GPU Access' : 'No Units Available'}
                  </button>
                </div>
              ))}

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">How to Use GPU Resources</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Request GPU access from available units</li>
                  <li>2. Choose your framework (PyTorch, TensorFlow, JAX)</li>
                  <li>3. Upload your training code or use pre-configured notebooks</li>
                  <li>4. Monitor training progress in real-time</li>
                  <li>5. Download trained models when complete</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'chatbots' && (
            <div className="grid md:grid-cols-2 gap-6">
              {aiChatbots.map((chatbot) => (
                <div key={chatbot.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl">{chatbot.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{chatbot.name}</h3>
                      <p className="text-sm text-gray-600">{chatbot.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Available Models:</h4>
                    <div className="flex flex-wrap gap-2">
                      {chatbot.models.map((model, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Use Cases:</h4>
                    <div className="flex flex-wrap gap-2">
                      {chatbot.useCases.map((useCase, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Start Chat
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                      Fine-tune
                    </button>
                  </div>
                </div>
              ))}

              <div className="md:col-span-2 bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Wrench className="w-5 h-5 mr-2" />
                  Fine-tuning Capabilities
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Custom Datasets</h4>
                    <p className="text-sm text-gray-600">Train on your own data for specialized tasks</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Model Optimization</h4>
                    <p className="text-sm text-gray-600">Optimize for speed, accuracy, or efficiency</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Deployment Ready</h4>
                    <p className="text-sm text-gray-600">Export and deploy your fine-tuned models</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        course.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </span>
                      <span className="text-lg font-bold text-green-600">{course.price}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">By {course.instructor}</p>

                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        {course.rating}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.topics.map((topic, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'game-dev' && (
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {gameDevelopmentTools.map((tool, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl">{tool.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-700 mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {tool.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-semibold">{tool.status}</span>
                      <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                        Launch
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Deploy Your Game</h3>
                <p className="text-gray-700 mb-6">
                  Build your game and deploy it to our platform. Share with the community
                  and get feedback from players worldwide.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4">
                    <Rocket className="w-8 h-8 text-blue-600 mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1">Quick Deploy</h4>
                    <p className="text-sm text-gray-600">One-click deployment to our platform</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <Users className="w-8 h-8 text-green-600 mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1">Community Feedback</h4>
                    <p className="text-sm text-gray-600">Get reviews and improve your game</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1">Analytics</h4>
                    <p className="text-sm text-gray-600">Track plays and player engagement</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all">
                  Deploy Your Game
                </button>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {womenSafetyTools.map((tool, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-700 mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {tool.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                      Access Tool
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="w-8 h-8 text-red-600 mr-3" />
                  Build Safety Solutions
                </h3>
                <p className="text-gray-700 mb-6">
                  Use our AI Lab resources to develop innovative safety solutions. Access GPU resources,
                  AI models, and deployment tools to create applications that protect and empower women.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <button className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Start Building
                  </button>
                  <button className="bg-white text-red-600 border-2 border-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deployed' && (
            <div className="space-y-6">
              {deployedProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.type === 'AI Model' ? 'bg-blue-100 text-blue-800' :
                          project.type === 'Chatbot' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {project.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{project.description}</p>
                      <p className="text-sm text-gray-500">Created by {project.creator}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold">{project.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">{project.plays} plays</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Deployed: {new Date(project.deployed).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Play className="w-4 h-4" />
                        <span>Try It</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Deploy Your Project</h3>
                <p className="mb-6 max-w-2xl mx-auto">
                  Ready to share your AI model, chatbot, or game with the world?
                  Deploy it to our platform and reach thousands of users.
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Deploy Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AILab;
