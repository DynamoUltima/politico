import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { clsx } from 'clsx';
import { formatDate } from '../../utils/formatDate';

export default function Feedback() {
  const { feedbacks, addFeedback, upvoteFeedback } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Suggestion',
    message: '',
    anonymous: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      name: formData.anonymous ? 'Anonymous Constituency Member' : (formData.name || 'Anonymous'),
      category: formData.category,
      message: formData.message,
    };
    addFeedback(newFeedback);
    setSubmitted(true);
    setFormData({ name: '', email: '', category: 'Suggestion', message: '', anonymous: false });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Community Voice</h1>
          <p className="text-lg text-gray-600">
            Your input drives our priorities. Submit complaints, suggestions, or questions directly to the MP's office.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Section */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 tracking-tight">
                <iconify-icon icon="solar:pen-new-square-linear" class="text-blue-600"></iconify-icon>
                Submit a Concern
              </h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3">
                    <iconify-icon icon="solar:check-circle-linear" width="24"></iconify-icon>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Received securely.</h3>
                  <p className="text-sm">Thank you for your feedback. Our team will review this shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Full Name (Optional)</label>
                      <input 
                        type="text" 
                        disabled={formData.anonymous}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none p-2.5 disabled:opacity-50"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Email (Optional)</label>
                      <input 
                        type="email" 
                        disabled={formData.anonymous}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none p-2.5 disabled:opacity-50"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded-lg border border-gray-100 w-max">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={formData.anonymous}
                      onChange={e => setFormData({...formData, anonymous: e.target.checked})}
                    />
                    <span className="text-sm font-medium text-gray-700">Submit Anonymously</span>
                  </label>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Complaint', 'Suggestion', 'Question'].map(cat => (
                        <div 
                          key={cat}
                          onClick={() => setFormData({...formData, category: cat})}
                          className={clsx(
                            "cursor-pointer text-center py-2 px-3 rounded-lg border text-sm font-medium transition-all",
                            formData.category === cat 
                              ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm" 
                              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Your Message <span className="text-red-500">*</span></label>
                    <textarea 
                      required
                      rows="5"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none p-3 resize-none"
                      placeholder="Please describe your concern or idea in detail..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm px-5 py-3 text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    Submit Feedback
                    <iconify-icon icon="solar:plain-2-linear" width="18"></iconify-icon>
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">All submissions are moderated before appearing publicly.</p>
                </form>
              )}
            </div>
          </div>

          {/* Public Board Section */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recent Community Posts</h2>
              <div className="text-sm text-gray-500 font-medium">Sorted by: <span className="text-gray-900">Most Relevant</span></div>
            </div>

            <div className="space-y-4">
              {feedbacks.map(feedback => (
                <div key={feedback.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Upvote Column */}
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={() => upvoteFeedback(feedback.id)}
                        className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        <iconify-icon icon="solar:alt-arrow-up-linear" width="20"></iconify-icon>
                      </button>
                      <span className="text-sm font-bold text-gray-700">{feedback.upvotes}</span>
                    </div>
                    
                    {/* Content Column */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className={clsx(
                            "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border",
                            feedback.category === 'Complaint' ? "bg-red-50 text-red-700 border-red-200" :
                            feedback.category === 'Suggestion' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            "bg-blue-50 text-blue-700 border-blue-200"
                          )}>
                            {feedback.category}
                          </span>
                          <span className="text-sm text-gray-500">• {formatDate(feedback.date)}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-900 font-medium text-lg leading-snug mb-3">
                        {feedback.message}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <iconify-icon icon="solar:user-rounded-linear" class="text-gray-500" width="14"></iconify-icon>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{feedback.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Load more discussions
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}