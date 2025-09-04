import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {Heart, Sparkles, Users, MessageCircle, Star, ArrowRight,Shield, Zap, Target, Award, MapPin, Camera, } from 'lucide-react';
import Link from 'next/link';
import { redirect } from "next/navigation";

const CompleteDatingApp =  async() => {

     const session = await getServerSession(authOptions)
  if (session?.user?.email) {
    redirect('/match');
  }
  const FloatingHearts = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <Heart
          key={i}
          className={`absolute text-pink-300/30 animate-bounce`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
          size={12 + Math.random() * 16}
        />
      ))}
    </div>
  );

  const Navigation = () => (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-pink-500 fill-current" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">DateIn</span>
          </div>

          <div className=" flex items-center space-x-4">
            <Link href={`/sign-in`} className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <FloatingHearts />

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`text-center lg:text-left transition-all duration-1000  `}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full border border-pink-200 mb-8">
              <Sparkles className="w-4 h-4 text-pink-500 mr-2" />
              <span className="text-pink-600 text-sm font-medium">Find Your Perfect Match</span>
            </div>
            <h1 className="text-6xl  lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="  bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Date
              </span>
                
              <span> Starts Here.</span>
            </h1>

            <p className="text-sm text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
              Connect with meaningful people who share your values, interests, and dreams.
              Your perfect match is just a swipe away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href={`/match`} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                Start Matching
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>
           
          </div>

          {/* Right Content - Interactive Cards */}
          <div className={`relative transition-all duration-1000 delay-300  `}>
            <div className="relative">
              {/* Main Dating Card */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-2xl hover:scale-105 transition-all duration-500">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Smart Matching</h3>
                    <p className="text-gray-600">AI-powered compatibility</p>
                  </div>
                </div>

                {/* Mock Profile Cards */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${i === 1 ? 'from-pink-400 to-red-400' : i === 2 ? 'from-blue-400 to-cyan-400' : 'from-purple-400 to-indigo-400'}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 font-semibold">
                            {i === 1 ? 'Alexandra' : i === 2 ? 'Michael' : 'Sophia'}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {i === 1 ? '95% Match • 2.1 km away' : i === 2 ? '92% Match • 1.8 km away' : '89% Match • 3.2 km away'}
                        </p>
                      </div>
                      <Heart className={`w-5 h-5 ${i === 1 ? 'text-pink-400 fill-current' : 'text-gray-400'} hover:text-pink-400 hover:fill-current transition-colors cursor-pointer`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Feature Cards */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-4 shadow-xl text-white">
                <Users className="w-6 h-6 mb-2" />
                <div className="font-bold text-sm">5,000+</div>
                <div className="text-blue-100 text-xs">New matches daily</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-4 shadow-xl text-white">
                <MessageCircle className="w-6 h-6 mb-2" />
                <div className="font-bold text-sm">Real-time</div>
                <div className="text-pink-100 text-xs">Conversations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );

  const FeaturesPage = () => (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose DateIn?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced features designed to help you find meaningful connections safely and efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-8 h-8" />,
              title: "Smart Matching",
              description: "Our AI algorithm analyzes compatibility based on interests, values, and lifestyle preferences.",
              color: "from-pink-500 to-rose-500"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Safe & Secure",
              description: "Advanced verification, photo authentication, and 24/7 safety monitoring for your protection.",
              color: "from-blue-500 to-indigo-500"
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Instant Connections",
              description: "Real-time messaging, video calls, and interactive features to build genuine relationships.",
              color: "from-purple-500 to-violet-500"
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: "Location-Based",
              description: "Find people nearby or expand your search globally. Distance filters help you control your radius.",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: <Camera className="w-8 h-8" />,
              title: "Photo Verification",
              description: "Verified profiles ensure you're talking to real people. Selfie verification prevents catfishing.",
              color: "from-orange-500 to-red-500"
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: "Success Stories",
              description: "Join thousands of couples who found love through DateIn. Your story could be next!",
              color: "from-teal-500 to-cyan-500"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to Find Your Match?</h3>
          <p className="text-xl opacity-90 mb-8">Join millions of people who have found love through DateIn</p>
          <button className="px-8 py-4 bg-white text-pink-600 rounded-full font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );

 

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-pink-500 fill-current" />
              <span className="text-2xl font-bold">DateIn</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting hearts, creating futures. Find your perfect match today.
            </p>
            {/* <div className="flex space-x-4">
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                <span className="text-sm font-bold">ig</span>
              </div>
            </div> */}
          </div>


        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DateIn. All rights reserved. Made with ❤️ for finding love.</p>
        </div>
      </div>
    </footer>
  );
  return (
    <div className="font-sans">
      <Navigation />
       <HomePage />
       <FeaturesPage />
      <Footer />
    </div>
  );
};

export default CompleteDatingApp;