'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Bot, User, Lightbulb, TrendingUp } from 'lucide-react';
import { chatbotSampleConversations } from '@/lib/constants/dashboard/dashboardData';
import { ChatMessage } from '@/lib/types/dashboard';

interface ChatbotInterfaceProps {
  selectedRegion?: string | null;
  context?: string;
  placeholder?: string;
}

export function ChatbotInterface({ selectedRegion, context = "general", placeholder }: ChatbotInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(chatbotSampleConversations);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      type: 'user',
      message: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        type: 'ai',
        message: 'Berdasarkan analisis data terkini dan model ML kami, berikut adalah prediksi dampak kebijakan yang Anda tanyakan:',
        predictions: [
          { icon: '📊', metric: 'Tingkat partisipasi program', value: 'Naik 7.3%' },
          { icon: '💰', metric: 'Alokasi anggaran optimal', value: '+Rp 2.1M' },
          { icon: '🎯', metric: 'Efektivitas targeting', value: 'Meningkat 12%' },
          { icon: '⏱️', metric: 'Waktu implementasi', value: '3-4 bulan' }
        ],
        note: '*Prediksi berdasarkan model yang dilatih dengan data 2017-2024',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion.replace(/"/g, ''));
  };

  const quickQuestions = [
    "Dampak kenaikan bantuan sosial 10% di Jawa Timur?",
    "Prediksi harga beras jika subsidi naik?",
    "Efektivitas program PKH vs BST?",
    "Analisis kemiskinan regional terbaru?"
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Assistant - Analisis Kebijakan
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Tanyakan tentang dampak kebijakan bantuan sosial pada berbagai metrik
              {selectedRegion && ` untuk wilayah ${selectedRegion.replace('-', ' ').toUpperCase()}`}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chat Messages */}
              <div className="h-96 bg-gray-50 rounded-lg border p-4 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white border'} rounded-lg p-3 shadow-sm`}>
                      <div className="flex items-start gap-2 mb-2">
                        {message.type === 'ai' ? <Bot className="h-4 w-4 mt-0.5 text-blue-500" /> : <User className="h-4 w-4 mt-0.5" />}
                        <span className="font-medium text-xs">
                          {message.type === 'ai' ? 'AI Assistant' : 'Anda'}
                        </span>
                      </div>
                      
                      <p className="text-sm">{message.message}</p>
                      
                      {message.suggestions && (
                        <div className="mt-3 space-y-1">
                          {message.suggestions.map((suggestion, idx) => (
                            <div key={idx} className="text-xs bg-blue-50 p-2 rounded border-l-2 border-blue-200">
                              • {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {message.predictions && (
                        <div className="mt-3 space-y-2">
                          {message.predictions.map((prediction, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded text-xs">
                              <span className="flex items-center gap-1">
                                <span>{prediction.icon}</span>
                                <strong>{prediction.metric}:</strong>
                              </span>
                              <span className="font-medium text-green-700">{prediction.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {message.note && (
                        <p className="text-xs text-gray-500 mt-2 italic">{message.note}</p>
                      )}
                      
                      {message.timestamp && (
                        <p className="text-xs text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-500" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Quick Questions */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">Pertanyaan Cepat:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto p-2 text-left justify-start"
                      onClick={() => handleSuggestionClick(question)}
                    >
                      <Lightbulb className="h-3 w-3 mr-1 flex-shrink-0" />
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder || "Tanyakan tentang dampak kebijakan..."}
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Information */}
      <div className="space-y-6">
        {/* Context Info */}
        {selectedRegion && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Konteks Regional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center">
                  {selectedRegion.replace('-', ' ').toUpperCase()}
                </Badge>
                <p className="text-xs text-gray-600">
                  Pertanyaan Anda akan dianalisis dengan konteks data regional ini
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Model Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Performa Model AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Prediksi Kebijakan</span>
                  <span className="font-medium">92.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{width: '92.5%'}}></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Analisis Ekonomi</span>
                  <span className="font-medium">89.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '89.3%'}}></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Forecasting</span>
                  <span className="font-medium">87.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{width: '87.8%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-2 bg-blue-50 rounded text-xs">
              <p className="font-medium text-blue-900">💡 Tips:</p>
              <p className="text-blue-800">Semakin spesifik pertanyaan, semakin akurat analisis yang diberikan</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Update Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Model v3.2 Deployed</p>
                  <p className="text-gray-600">Akurasi prediksi meningkat 5%</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Data Refresh</p>
                  <p className="text-gray-600">Dataset terbaru dari BPS 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">New Features</p>
                  <p className="text-gray-600">Regional context analysis</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
