import React, { useEffect, useState } from 'react';
import { Search, Calendar, Tag, Eye, GitFork, User, Code2, Heart, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { addSnippet, getPublicSnippet } from '../features/snippets/snippetSlice';

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=> {
    dispatch(getPublicSnippet())
  } , [dispatch])

  const {snippets} = useSelector(state => state.theSnippet)

  const allTags = Array.from(new Set(snippets.flatMap(snippet => snippet.tags)));

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !selectedTag || snippet.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Sort snippets
  const sortedSnippets = [...filteredSnippets].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'mostForked':
        return b.forks - a.forks;
      case 'mostViewed':
        return b.views - a.views;
      case 'recent':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const handleLike = (id) => {
    console.log('Like snippet:', id);
  };

  const handleFork = async(snippet) => {
    
     const forkSnippetData = {
          title : snippet.title ,
          description : `Snippet Forked from : \n Author : ${snippet.user.name}` ,
          tags : ["forked" , ...snippet.tags] ,
          html : snippet.html,
          css : snippet.css ,
          js : snippet.js ,
          isPublic : false
        }
    
        await dispatch(addSnippet(forkSnippetData))
        navigate(`/dashboard`)


  };

  return (
    <Layout>
      <div className=" min-h-screen px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="mb-8 px-4 md:px-32">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Community Snippets
              </h1>
              <p className="text-gray-400 mt-1">
                Discover and share code snippets with the community
              </p>
            </div>
            <div className="text-sm text-gray-400">
              {sortedSnippets.length} public snippets
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search snippets, authors, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-32">
          {sortedSnippets.map(snippet => (
            <div
              key={snippet?._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-2 border-gray-700 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-700/50 hover:bg-gradient-to-br"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Link
                    to={`/snippet/${snippet?._id}`}
                    className="text-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-200 truncate"
                  >
                    {snippet?.title}
                  </Link>
                </div>
                
                <p className="text-gray-300 text-base mb-6 line-clamp-2 leading-relaxed">
                  {snippet?.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {snippet?.tags?.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg border border-blue-400/30"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {snippet?.tags?.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{snippet.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center text-xs font-medium text-white">
                      <User/>
                    </div>
                    <span className="text-sm text-gray-400">{snippet?.user.name}</span>
                  </div>
                  <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-green-400" />
                      <span className="text-sm text-gray-500">{new Date(snippet?.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

               

                <div className="flex space-x-2">
                  <Link
                    to={`/snippet/${snippet._id}`}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/30 border border-green-400/20"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </Link>
                  {/* <button
                    onClick={() => handleLike(snippet.id)}
                    className="px-4 py-2 border border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-600 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <Heart className="h-4 w-4" />
                  </button> */}
                  <button
                    onClick={() => handleFork(snippet)}
                    className="px-4 py-2 border border-gray-600 text-gray-400 hover:text-blue-400 hover:border-blue-600 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <GitFork className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedSnippets.length === 0 && (
          <div className="text-center py-12">
            <Code2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No snippets found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CommunityPage;