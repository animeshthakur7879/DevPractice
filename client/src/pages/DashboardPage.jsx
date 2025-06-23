import React, { useEffect, useState } from 'react';
import { Plus, Search, Calendar, Tag, Edit3, Trash2, ExternalLink, Code2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { addSnippet, getUserSnippets } from '../features/snippets/snippetSlice';
import { getUserSnippet } from '../features/snippets/snippetSlice';
import { removeSnippet } from '../features/snippets/snippetSlice';
import { toast } from 'react-toastify';

// Spinner Loader Component
const SpinnerLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-gray-600 border-t-orange-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animation-delay-150"></div>
    </div>
  </div>
);

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {snippet , isLoading , isError , snippets } = useSelector(state => state.theSnippet)

  useEffect(() => {
    dispatch(getUserSnippets())
  } , [ dispatch , snippet ])

  const allTags = Array.from(new Set(snippets?.flatMap(snippet => snippet.tags)));

  const filteredSnippets = snippets?.filter(snippet => {
    const matchesSearch = snippet?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet?.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !selectedTag || snippet?.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleDelete = (sid) => {
    dispatch(removeSnippet(sid))
    toast.success("Snippet Removed")
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSnippet = async () => {
    if (!formData.title.trim()) {
      toast.warning('Please enter a title for your snippet')
      return;
    }

    try {
      const resultAction = await dispatch(addSnippet(formData));
      const newSnippet = resultAction.payload;

      if (newSnippet && newSnippet.snippet._id) {
          toast.success("Snippet Created")
      } else {
        console.error("Snippet created but _id missing:", newSnippet);
      }

      setShowModal(false);
      setFormData({ title: '', description: '' });
    } catch (error) {
      console.error("Failed to create snippet:", error);
      alert("Something went wrong while creating snippet");
    }
  };

  const handleEdit = async(sid) => {
    await dispatch(getUserSnippet(sid))
    navigate(`/editor/${sid}`)
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: '', description: '' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  MY SNIPPETS
                </h1>
                <p className="text-gray-300 mt-2 text-lg font-medium">
                  {isLoading ? 'Loading snippets...' : `${filteredSnippets?.length || 0} snippets loaded`}
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-sky-400 to-blue-700 hover:from-blue-400 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/30 flex items-center space-x-2 border border-orange-400/20"
              >
                <Plus className="h-5 w-5" />
                <span>NEW SNIPPET</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                <input
                  type="text"
                  placeholder="Search snippets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 font-medium"
                />
              </div>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-3 border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 font-medium"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Show loader when loading */}
          {isLoading ? (
            <SpinnerLoader />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSnippets?.map(snippet => (
                  <div
                    key={snippet?._id}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-2 border-gray-700 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-700/50 hover:bg-gradient-to-br "
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white truncate leading-tight">
                          {snippet?.title}
                        </h3>
                        {snippet?.isPublic && (
                          <ExternalLink className="h-5 w-5 text-green-400 flex-shrink-0 ml-2" />
                        )}
                      </div>
                      
                      <p className="text-gray-300 text-base mb-6 line-clamp-2 leading-relaxed">
                        {snippet?.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {snippet?.tags?.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg border border-blue-400/30"
                          >
                            <Tag className="h-3.5 w-3.5 mr-1.5" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-green-400" />
                          <span className="font-medium">{new Date(snippet?.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs font-medium">
                          Updated {new Date(snippet?.updatedAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(snippet._id)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/30 border border-green-400/20"
                        >
                          <Edit3 className="h-4 w-4" />
                          <span>EDIT</span>
                        </button>
                        <button
                          onClick={() => handleDelete(snippet?._id)}
                          className="px-4 py-2.5 border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-400 rounded-lg text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-red-500/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSnippets?.length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-12 border-2 border-gray-700 max-w-md mx-auto shadow-2xl">
                    <Code2 className="h-20 w-20 text-orange-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-3">
                      NO SNIPPETS FOUND
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed font-medium">
                      {searchTerm || selectedTag 
                        ? 'Try adjusting your search or filter criteria.'
                        : 'Get started by creating your first code snippet.'
                      }
                    </p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/30 space-x-2 border border-orange-400/20"
                    >
                      <Plus className="h-5 w-5" />
                      <span>CREATE NEW SNIPPET</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-2 border-gray-700 w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b-2 border-gray-700">
                  <h2 className="text-2xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    CREATE NEW SNIPPET
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <label htmlFor="title" className="block text-base font-bold text-white mb-3">
                      TITLE <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter snippet title..."
                      className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 font-medium"
                      required
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="description" className="block text-base font-bold text-white mb-3">
                      DESCRIPTION <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter snippet description..."
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none transition-all duration-200 font-medium"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCreateSnippet}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-orange-500/30 border border-orange-400/20"
                    >
                      CREATE
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 border-2 border-gray-500"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;