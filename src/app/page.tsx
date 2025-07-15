/**
 * Landing Page Component
 * Main homepage with hero section, features, and call-to-action
 */

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Brain, 
  Target, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Nutrition',
      description: 'Get personalized diet plans created by advanced AI that understands your unique needs and preferences.',
    },
    {
      icon: Target,
      title: 'Goal-Oriented Plans',
      description: 'Whether you want to lose weight, gain muscle, or maintain health, our plans adapt to your specific goals.',
    },
    {
      icon: Shield,
      title: 'Health-First Approach',
      description: 'All recommendations consider your medical conditions, allergies, and dietary restrictions for safe nutrition.',
    },
    {
      icon: Zap,
      title: 'Real-Time Tracking',
      description: 'Monitor your progress with comprehensive health metrics, BMI calculations, and calorie tracking.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'Aititian transformed my approach to nutrition. The AI recommendations are spot-on and easy to follow.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Busy Professional',
      content: 'Finally, a nutrition app that understands my hectic schedule. The meal plans are practical and delicious.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Health Coach',
      content: 'I recommend Aititian to all my clients. The personalization level is incredible and results speak for themselves.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your AI-Powered
                <span className="text-emerald-600 block">Nutrition Coach</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Get personalized diet plans, track your health metrics, and achieve 
                your wellness goals with intelligent AI recommendations tailored just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </Link>
              </div>
              <div className="flex items-center mt-8 space-x-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-emerald-600 mr-2" />
                  <span className="text-gray-600">10,000+ Happy Users</span>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Heart className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Daily Overview</h3>
                    <p className="text-sm text-gray-500">March 15, 2024</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Calories</span>
                    <span className="font-semibold">1,847 / 2,100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">23.2</div>
                      <div className="text-xs text-gray-500">BMI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">68kg</div>
                      <div className="text-xs text-gray-500">Weight</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">15%</div>
                      <div className="text-xs text-gray-500">Body Fat</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Aititian?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with nutritional science 
              to deliver personalized health solutions that actually work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started with your personalized nutrition journey in just 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Complete Your Profile',
                description: 'Tell us about your health goals, dietary preferences, medical conditions, and lifestyle.',
              },
              {
                step: '02',
                title: 'Get AI Analysis',
                description: 'Our AI analyzes your data to calculate BMI, BMR, and create your personalized nutrition plan.',
              },
              {
                step: '03',
                title: 'Follow & Track',
                description: 'Receive daily meal plans, track your progress, and get continuous AI-powered recommendations.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who have transformed their health with Aititian
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of users who have already started their journey to better health 
            with AI-powered nutrition guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-emerald-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}