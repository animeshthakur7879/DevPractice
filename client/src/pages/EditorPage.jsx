import React, { useEffect, useState } from 'react';
import { Save, Wand2, Share2, Play, FileText, Code, Palette, Eye, Terminal, X, Settings, Maximize2, Minimize2, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserSnippet } from '../features/snippets/snippetSlice';
import { updateUserSnippet } from '../features/snippets/snippetSlice';
import Editor from '@monaco-editor/react'
import { toast } from 'react-toastify';

const EditorPage = () => {
  const [activeTab, setActiveTab] = useState('html');
  const [showConsole, setShowConsole] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {sid} = useParams()
  
  const {snippet , isError , isLoading} = useSelector(state => state.theSnippet) 
  
  useEffect(() => {   

      dispatch(getUserSnippet(sid))
    
  } , [dispatch , snippet])

  
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.log('Fullscreen not supported:', error);
    }
  };
  const [code, setCode] = useState({
    html: snippet?.html || '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Snippet</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>Start coding...</p>\n</body>\n</html>' ,
    css: snippet?.css || 'body {\n  font-family: Arial, sans-serif;\n  margin: 40px;\n  background: #f5f5f5;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}\n\np {\n  color: #666;\n  line-height: 1.6;\n}',
    js: snippet?.js ||  '// JavaScript code here\nconsole.log("Hello, DevPractice!");\n\n// Example: Add interactivity\ndocument.addEventListener("DOMContentLoaded", function() {\n  console.log("Page loaded!");\n});'
  });
  const [title, setTitle] = useState(snippet?.title || "Untitled Description" );
  const [description, setDescription] = useState(snippet?.description || "");
  const [tags, setTags] = useState(snippet?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [isPublic, setIsPublic] = useState(snippet?.isPublic || false);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const tabs = [
    { id: 'html', label: 'HTML', icon: FileText, color: 'text-orange-400', gradient: 'from-orange-500 to-red-500' },
    { id: 'css', label: 'CSS', icon: Palette, color: 'text-blue-400', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'js', label: 'JavaScript', icon: Code, color: 'text-yellow-400', gradient: 'from-yellow-500 to-orange-500' }
  ];

  // useEffect(() => {
  //   getLanguage(activeTab)
  //   console.log(activeTab)
  // } , [activeTab])


  const getLanguage = (tab) => {
    switch (tab) {
      case 'html': return 'html';
      case 'css': return 'css';
      case 'js': return 'javascript';
      return 'plaintext';
    }
  };

console.log(  getLanguage(activeTab)
)

  const handleCodeChange = (tab, value) => {
    setCode(prev => ({ ...prev, [tab]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags(prev => [...prev, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    const snippetData = {
      title,
      description,
      tags,
      html : code.html , 
      css : code.css , 
      js : code.js ,
      isPublic
    };
    dispatch(updateUserSnippet({formData : snippetData , sid}));
    toast.success("Saved Successfully")
  };

  const handleFormat = () => {
    console.log('Formatting code for:', activeTab);
  };

  const handleShare = () => {
    if(!snippet.isPublic){
      toast.error("Make snippet public to share")
    }
    else{
      const shareLink = `${window.location.origin}/snippet/${sid}`;
      navigator.clipboard.writeText(shareLink);
      toast.info("Link copied to clipboard")
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const generatePreview = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${code.css}</style>
      </head>
      <body>
        ${code.html}
        <script>${code.js}</script>
      </body>
      </html>
    `;
  };

  return (
      <div className="h-screen flex flex-col bg-black relative overflow-hidden">
        {/* Ultra Modern Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.3),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(236,72,153,0.3),transparent_70%)]"></div>
          
          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          {/* Matrix-like Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_98%,rgba(0,255,255,0.1)_100%)] bg-[length:50px_50px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_98%,rgba(0,255,255,0.1)_100%)] bg-[length:50px_50px]"></div>
        </div>

        {/* Futuristic Header Bar */}
        <div className="bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/30 px-6 py-4 relative z-10 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Left Section - Back Button and Holographic Title */}
            <div className="flex items-center space-x-6">
              {/* Back to Dashboard Button */}
              <button
                onClick={handleBackToDashboard}
                className="p-3 text-gray-400 hover:text-cyan-400 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-cyan-500/50 backdrop-blur-sm group"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              </button>

              {/* Futuristic Traffic Lights */}
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
                <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/50 animate-pulse delay-300"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-500/50 animate-pulse delay-700"></div>
              </div>
              
              {/* Holographic Title Input */}
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-bold bg-transparent border-none outline-none text-cyan-400 placeholder-gray-500 focus:ring-0 min-w-0 pr-4 caret-cyan-400"
                  placeholder="∆ Untitled Snippet"
                />
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-full backdrop-blur-sm border border-gray-600/50 shadow-lg">
                <div className={`w-3 h-3 rounded-full shadow-lg ${isPublic ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-green-500/50' : 'bg-gradient-to-r from-gray-400 to-gray-600 shadow-gray-500/50'} animate-pulse`}></div>
                <span className="text-sm font-medium text-gray-300">{isPublic ? '◉ PUBLIC' : '◉ PRIVATE'}</span>
              </div>
            </div>
            
            {/* Right Section - Futuristic Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-3 text-gray-400 hover:text-cyan-400 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-cyan-500/50 backdrop-blur-sm group"
              >
                <Settings className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-3 text-gray-400 hover:text-purple-400 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50 backdrop-blur-sm"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
              
              <div className="w-px h-8 bg-gradient-to-t from-transparent via-gray-500 to-transparent"></div>
              
              <button
                onClick={handleFormat}
                className="px-4 py-3 text-gray-300 hover:text-white bg-gradient-to-r from-gray-800/70 to-gray-900/70 hover:from-gray-700/70 hover:to-gray-800/70 rounded-xl transition-all duration-300 flex items-center space-x-2 border border-gray-600/50 hover:border-gray-500/50 backdrop-blur-sm group"
              >
                <Wand2 className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium">FORMAT</span>
              </button>
              
              <button
                onClick={handleShare}
                className="px-4 py-3 text-gray-300 hover:text-white bg-gradient-to-r from-gray-800/70 to-gray-900/70 hover:from-gray-700/70 hover:to-gray-800/70 rounded-xl transition-all duration-300 flex items-center space-x-2 border border-gray-600/50 hover:border-gray-500/50 backdrop-blur-sm group"
              >
                <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">SHARE</span>
              </button>
              
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 shadow-2xl hover:shadow-cyan-500/25 border border-cyan-500/50 hover:border-cyan-400/70 backdrop-blur-sm group"
              >
                <Save className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>SAVE</span>
              </button>
            </div>
          </div>

          {/* Advanced Settings Panel */}
          {showSettings && (
            <div className="mt-6 p-6 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 rounded-2xl backdrop-blur-xl border border-gray-600/50 shadow-2xl animate-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wider">◈ Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your futuristic creation..."
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/70 resize-none transition-all duration-300 backdrop-blur-sm"
                    rows="4"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-purple-400 mb-3 uppercase tracking-wider">◈ Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3 min-h-[3rem] p-3 bg-gray-800/50 rounded-xl border border-gray-600/50">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border border-blue-500/50 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:text-red-300 transition-colors duration-300 group-hover:rotate-90"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleAddTag}
                    placeholder="Add tags (press Enter)..."
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500/70 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center space-x-4">
                <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-800/50 rounded-xl border border-gray-600/50 hover:border-green-500/50 transition-all duration-300">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-5 h-5 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-300">◉ Make this snippet public</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex overflow-hidden relative z-10">
          {/* Left Panel - Code Editor */}
          <div className="w-1/2 flex flex-col border-r border-cyan-500/30 bg-gray-900/50 backdrop-blur-xl">
            {/* Futuristic Editor Tabs */}
            <div className="flex bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 text-sm font-bold transition-all duration-500 flex items-center space-x-3 relative group ${
                    activeTab === tab.id
                      ? `bg-gradient-to-b from-gray-800/90 to-gray-900/90 text-white border-b-2 border-gradient-to-r ${tab.gradient} shadow-lg`
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/70'
                  }`}
                >
                  <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? tab.color : ''} transition-all duration-500 ${activeTab === tab.id ? 'animate-pulse' : 'group-hover:rotate-12'}`} />
                  <span className="uppercase tracking-wider">{tab.label}</span>
                  {activeTab === tab.id && (
                    <>
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.gradient} animate-pulse`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-5`}></div>
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Enhanced Code Editor */}
            <div className="flex-1 bg-black/90 backdrop-blur-xl relative border border-gray-800/50">
              {/* Editor Header */}
              <div className="absolute top-4 right-4 flex items-center space-x-3 z-10">
                <div className="text-xs font-bold text-gray-400 bg-gray-800/70 px-3 py-1.5 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                  <span className="text-cyan-400">◈</span> {activeTab.toUpperCase()}
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300 shadow-lg shadow-yellow-500/50"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-700 shadow-lg shadow-red-500/50"></div>
                </div>
              </div>
              
              <Editor
                height="100%"
                language={getLanguage(activeTab)}
                value={code[activeTab]}
                onChange={(value) => handleCodeChange(activeTab, value)}
                theme="vs-dark"
                options={{
                  fontSize: 15,
                  fontFamily: 'JetBrains Mono, Fira Code, monospace',
                  minimap: { enabled: true },
                  automaticLayout: true,
                  wordWrap: 'on',
                  tabSize: 2,
                  insertSpaces: true,
                  autoClosingBrackets: 'always',
                  autoIndent: 'full',
                  cursorBlinking: 'smooth',
                  cursorSmoothCaretAnimation: true,
                  fontLigatures: true,
                  renderWhitespace: 'selection',
                  smoothScrolling: true,
                }}
              />
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="w-1/2 flex flex-col bg-gray-900/50 backdrop-blur-xl">
            {/* Preview Header */}
            <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-green-400 animate-pulse" />
                  <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">◈ Live Preview</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-xs text-green-400 font-medium">ACTIVE</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowConsole(!showConsole)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center space-x-2 border backdrop-blur-sm ${
                    showConsole
                      ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border-blue-500/50 shadow-lg shadow-blue-500/25'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/70 border-gray-600/50 hover:border-gray-500/50'
                  }`}
                >
                  <Terminal className="h-4 w-4" />
                  <span className="uppercase tracking-wider">Console</span>
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              {/* Preview iframe with holographic border */}
              <div className={`${showConsole ? 'h-2/3' : 'flex-1'} bg-white relative overflow-hidden transition-all duration-500 border-2 border-transparent bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-0.5`}>
                <div className="absolute top-3 left-3 flex space-x-2 z-10">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg shadow-red-500/50"></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-500/50"></div>
                </div>
                <iframe
                  srcDoc={generatePreview()}
                  className="w-full h-full border-none bg-white"
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>

              {/* Enhanced Console */}
              {showConsole && (
                <div className="h-1/3 bg-black/95 backdrop-blur-xl text-green-400 font-mono text-sm border-t border-cyan-500/30 transition-all duration-500 animate-in slide-in-from-bottom-4">
                  <div className="p-6 h-full overflow-auto">
                    <div className="flex items-center space-x-3 text-gray-400 mb-4 border-b border-gray-700/50 pb-3">
                      <Terminal className="h-5 w-5 text-cyan-400" />
                      <span className="text-sm font-bold uppercase tracking-wider text-cyan-400">◈ Console Output</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-green-400 flex items-center space-x-3 group">
                        <span className="text-cyan-400 font-bold">{'>'}</span>
                        <span className="group-hover:text-green-300 transition-colors duration-300">Hello, DevPractice!</span>
                      </div>
                      <div className="text-green-400 flex items-center space-x-3 group">
                        <span className="text-cyan-400 font-bold">{'>'}</span>
                        <span className="group-hover:text-green-300 transition-colors duration-300">Page loaded!</span>
                      </div>
                      <div className="text-gray-500 flex items-center space-x-3">
                        <span className="text-purple-400 font-bold">{'◈'}</span>
                        <span className="text-xs">Ready for commands...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditorPage;