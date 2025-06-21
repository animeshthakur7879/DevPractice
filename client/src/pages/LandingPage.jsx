import React, { useEffect, useState } from 'react';
import { Code2, Play, Users, Zap, Github, Twitter, Mail, Eye, GitFork, Star, Terminal, Cpu, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)
  
  useEffect(() => {
    if(user) {
      navigate('/dashboard')
    }
    
  } , [dispatch , user])

  const handleLogin = async() => {
    const response = await signInWithPopup(auth , provider)
    const user = response.user
    const userData = {
      name : user.displayName ,
      email : user.email , 
      phoneNumber : user.phoneNumber
    }

    dispatch(loginUser(userData))
    
  };

  const handleInputChange = (e) => {
    setLoginForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Animated background grid
  const GridBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'grid-move 20s linear infinite'
      }}></div>
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );

  // Floating code elements
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute text-blue-500/20 font-mono text-sm animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        >
          {['<div>', '</>', 'const', 'function', '{ }', 'return'][i]}
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.4; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative">
      {/* Animated Background */}
      <GridBackground />
      <FloatingElements />
      
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 sticky top-0 z-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-full"></div>
                <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl">
                  <Terminal className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  DevPractice
                </span>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.5}s`}}></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="relative group text-gray-300 hover:text-cyan-400 transition-all duration-300 font-mono">
                <span className="relative z-10">Features</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#community" className="relative group text-gray-300 hover:text-cyan-400 transition-all duration-300 font-mono">
                <span className="relative z-10">Community</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#about" className="relative group text-gray-300 hover:text-cyan-400 transition-all duration-300 font-mono">
                <span className="relative z-10">About</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLogin()}
                className="relative group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center space-x-2">
                  <Cpu className="h-4 w-4" />
                  <span>Login</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-black to-blue-900/10"></div>
        
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-mono text-sm">System Online</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white font-mono">Code</span>
            <span className="text-cyan-400 mx-4">∙</span>
            <span className="text-white font-mono">Share</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-mono animate-pulse">
              Inspire
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            The next-generation code playground where developers
            <span className="text-cyan-400 font-mono"> create</span>,
            <span className="text-blue-400 font-mono"> share</span>, and
            <span className="text-purple-400 font-mono"> discover</span> amazing web snippets.
            <br />
            Build your ideas with our quantum-powered editor.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => handleLogin()}
              className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center space-x-3">
                <Play className="h-5 w-5" />
                <span>Initialize Coding</span>
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </span>
            </button>
            
            <Link
              
              className="group relative border-2 border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-gray-900/20 hover:bg-cyan-500/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center space-x-3">
                <Users className="h-5 w-5" />
                <span>Join Community</span>
              </span>
            </Link>
          </div>

          {/* Terminal-style stats */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 font-mono text-left">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">devpractice@terminal</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="text-cyan-400">
                  <span className="text-gray-500">$</span> npm install awesome-coding-experience
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">✓</span> Real-time code editor loaded
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">✓</span> Community features online
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">✓</span> Snippet sharing ready
                </div>
                <div className="text-cyan-400">
                  <span className="text-gray-500">$</span> <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900/80 backdrop-blur-xl border-t border-cyan-500/20 py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-purple-900/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-full"></div>
                <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl">
                  <Terminal className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  DevPractice
                </span>
                <span className="text-xs text-gray-500 font-mono">v2.0.1</span>
              </div>
            </div>
            
            <div className="flex space-x-6">
              <a href="https://github.com/animeshthakur7879" className="group relative text-gray-400 hover:text-cyan-400 transition-all duration-300 p-2">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <Github className="h-6 w-6 relative z-10" />
              </a>
              <a href="#" className="group relative text-gray-400 hover:text-cyan-400 transition-all duration-300 p-2">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <Twitter className="h-6 w-6 relative z-10" />
              </a>
              <a href="#" className="group relative text-gray-400 hover:text-cyan-400 transition-all duration-300 p-2">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <Mail className="h-6 w-6 relative z-10" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-gray-400 font-mono text-sm">
                © 2025 DevPractice. Crafted with 
                <span className="text-red-400 animate-pulse mx-1">♥</span> 
                by ANIMESH THAKUR
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 font-mono">
                <span>Status: Online</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;