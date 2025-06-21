import React, { useEffect, useState } from 'react';
import { Copy, Eye, GitFork, User, Calendar, Tag } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSnippet, getUserSnippet } from '../features/snippets/snippetSlice';
import { Editor } from '@monaco-editor/react';
import { toast } from 'react-toastify';

const PublicSnippetPage = () => {
  const [copied, setCopied] = useState(false);

  const {user} = useSelector(state => state.auth)


  const {sid} = useParams()
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    if(user){
      dispatch(getUserSnippet(sid))
    }
    else{
      toast.error("Login to view this project")
    }

  } , [dispatch])


  const {snippet} = useSelector(state => state.theSnippet)

  const generatePreview = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${snippet?.css}</style>
      </head>
      <body>
        ${snippet?.html}
        <script>${snippet?.js}</script>
      </body>
      </html>
    `;
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.info("Link Copied to clipboard")
  };

  const handleFork = async() => {
    
    const forkSnippetData = {
      title : snippet.title ,
      description : `Snippet Forked from : \n Author : ${snippet.user.name}` ,
      tags : ["forked" , ...snippet.tags] ,
      html : snippet.html,
      css : snippet.css ,
      js : snippet.js ,
      isPublic : false
    }

    console.log(forkSnippetData)

    await dispatch(addSnippet(forkSnippetData))
    navigate(`/dashboard`)
    

    console.log('Forking snippet:', snippet?._id);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Header */}
        <div className=" bg-gradient-to-r from-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold font-black bg-gradient-to-r from-gray-300  to-gray-500 bg-clip-text text-transparent mb-2">
                  {snippet?.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>by {snippet?.user?.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(snippet?.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {snippet?.tags?.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg border border-blue-400/30"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleCopyUrl}
                  className="px-4 py-2 text-gray-400 hover:text-white border border-gray-600 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <Copy className="h-4 w-4" />
                  <span>{copied ? 'Copied!' : 'Copy URL'}</span>
                </button>
                <button
                  onClick={handleFork}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <GitFork className="h-4 w-4" />
                  <span>Fork this snippet</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div>
              <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">Preview</span>
                  </div>
                </div>
                <div className="aspect-video bg-white">
                  <iframe
                    srcDoc={generatePreview()}
                    className="w-full h-full border-none"
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="space-y-6">
              {/* HTML */}
              <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                <div className="bg-red-900/20 px-4 py-3 border-b border-gray-600">
                  <span className="text-sm font-medium text-red-300">HTML</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm bg-gray-900">
                  <code className="text-gray-200 font-mono">
                    {snippet?.html}
                  </code>
                </pre>
              </div>

              {/* CSS */}
              <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                <div className="bg-blue-900/20 px-4 py-3 border-b border-gray-600">
                  <span className="text-sm font-medium text-blue-300">CSS</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm bg-gray-900">
                  <code className="text-gray-200 font-mono">
                    {snippet?.css}
                  </code>
                </pre>
              </div>

              {/* JavaScript */}
              <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                <div className="bg-yellow-900/20 px-4 py-3 border-b border-gray-600">
                  <span className="text-sm font-medium text-yellow-300">JavaScript</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm bg-gray-900">
                  <code className="text-gray-200 font-mono">
                    {snippet?.js}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PublicSnippetPage;