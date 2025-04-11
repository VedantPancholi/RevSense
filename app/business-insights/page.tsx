"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaChartPie,
  FaChartLine,
  FaExclamationTriangle,
  FaShieldAlt,
  FaUserShield,
  FaRobot,
  FaArrowUp,
  FaArrowDown,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Navbar from "../component/Navbar";
import BackButton from "../component/BackButton";
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface RootCause {
  key_aspect_1: string;
  key_aspect_2: string;
  key_aspect_3?: string;
}

interface Impact {
  customer_experience: string;
  trust_loss: string;
  financial_loss: string;
}

interface CustomerService {
  bot_reliance: string;
  human_agents: string;
  escalation_process: string;
}

interface SuggestedFixes {
  aspect_1: string;
  aspect_2: string;
  customer_service?: CustomerService;
}

interface Issue {
  issue_type: string;
  root_cause: RootCause;
  impact: Impact;
  severity: string;
  frequency: string;
  suggested_fixes: SuggestedFixes;
}

interface BusinessInsight {
  category: string;
  issues: Issue[];
}

const API_URL = '/api/business-insights';

const BusinessInsightsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<BusinessInsight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async () => {
    try {
      console.log('Fetching data from API...');
      const response = await fetch('/api/business-insights', {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('API Response Status:', response.status);
      const responseData = await response.json();
      console.log('API Response Data:', responseData);
      
      if (!response.ok) {
        throw new Error(responseData.error || responseData.details || 'Failed to fetch data');
      }
      
      // Validate the data structure
      if (!Array.isArray(responseData)) {
        console.error('Invalid data format:', responseData);
        throw new Error('Invalid data format: expected an array');
      }
      
      setData(responseData);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data from the server');
      
      // Retry up to 3 times if the error is due to server unavailability
      if (retryCount < 3 && err instanceof Error && err.message.includes('Failed to fetch')) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchData();
        }, 2000); // Retry after 2 seconds
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [retryCount]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          {retryCount > 0 && (
            <p className="mt-4 text-gray-600">Retrying... (Attempt {retryCount + 1}/3)</p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error: {error}</div>
          {retryCount < 3 && (
            <button
              onClick={() => {
                setRetryCount(prev => prev + 1);
                setIsLoading(true);
                fetchData();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">No Data Available</h2>
          <p className="text-gray-500 mt-2">There are no business insights to display at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      <BackButton />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <FaChartPie className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Business Insights Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Deep analysis of business metrics and customer feedback
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-8">
          {data.map((categoryData, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100"
            >
              {/* Category Header */}
              <div 
                className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleCategory(categoryData.category)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md">
                    <FaChartLine className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{categoryData.category}</h2>
                    <p className="text-gray-600 font-medium">{categoryData.issues.length} issues reported</p>
                  </div>
                </div>
                {expandedCategories.has(categoryData.category) ? (
                  <ChevronUp className="h-6 w-6 text-gray-500" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-500" />
                )}
              </div>

              {/* Category Content */}
              {expandedCategories.has(categoryData.category) && (
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  {/* Overview Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-gray-500 text-sm font-medium mb-2">Total Issues</h3>
                      <p className="text-2xl font-bold text-indigo-600">{categoryData.issues.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-gray-500 text-sm font-medium mb-2">Average Severity</h3>
                      <p className="text-2xl font-bold text-indigo-600">
                        {categoryData.issues.reduce((acc, issue) => {
                          const severityValue = 
                            issue.severity.toLowerCase() === 'critical' ? 4 :
                            issue.severity.toLowerCase() === 'high' ? 3 :
                            issue.severity.toLowerCase() === 'medium' ? 2 : 1;
                          return acc + severityValue;
                        }, 0) / categoryData.issues.length}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-gray-500 text-sm font-medium mb-2">Trust Impact</h3>
                      <p className="text-2xl font-bold text-indigo-600">
                        {categoryData.issues.reduce((acc, issue) => {
                          const impactValue = 
                            issue.impact.trust_loss.toLowerCase() === 'high' ? 3 :
                            issue.impact.trust_loss.toLowerCase() === 'medium' ? 2 : 1;
                          return acc + impactValue;
                        }, 0) / categoryData.issues.length}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-gray-500 text-sm font-medium mb-2">Financial Risk</h3>
                      <p className="text-2xl font-bold text-indigo-600">
                        {categoryData.issues.reduce((acc, issue) => {
                          const riskValue = 
                            issue.impact.financial_loss.toLowerCase() === 'high' ? 3 :
                            issue.impact.financial_loss.toLowerCase() === 'medium' ? 2 : 1;
                          return acc + riskValue;
                        }, 0) / categoryData.issues.length}
                      </p>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="space-y-6">
                    {categoryData.issues.map((issue, issueIndex) => (
                      <motion.div
                        key={issueIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: issueIndex * 0.1 }}
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-800">{issue.issue_type}</h3>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getSeverityColor(issue.severity)}`}>
                            {issue.severity} Severity
                          </span>
                        </div>

                        {/* Root Causes */}
                        <div className="mb-6">
                          <h4 className="text-lg font-medium text-gray-800 mb-3">Root Causes</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(issue.root_cause).map(([key, value], idx) => (
                              <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <div className="flex items-center space-x-2">
                                  <FaExclamationTriangle className="w-5 h-5 text-orange-500" />
                                  <h5 className="font-medium text-gray-700">{value}</h5>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Impact */}
                        <div className="mb-6">
                          <h4 className="text-lg font-medium text-gray-800 mb-3">Impact</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <h5 className="text-sm text-gray-500 mb-1">Customer Experience</h5>
                              <p className={`font-medium ${
                                issue.impact.customer_experience.toLowerCase().includes('negative') 
                                  ? 'text-red-600' 
                                  : 'text-green-600'
                              }`}>
                                {issue.impact.customer_experience}
                              </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <h5 className="text-sm text-gray-500 mb-1">Trust Loss</h5>
                              <p className="font-medium text-orange-600">{issue.impact.trust_loss}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <h5 className="text-sm text-gray-500 mb-1">Financial Loss</h5>
                              <p className="font-medium text-red-600">{issue.impact.financial_loss}</p>
                            </div>
                          </div>
                        </div>

                        {/* Suggested Fixes */}
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-3">Suggested Fixes</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <h5 className="text-sm text-gray-500 mb-1">Primary Fix</h5>
                              <p className="font-medium text-gray-700">{issue.suggested_fixes.aspect_1}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <h5 className="text-sm text-gray-500 mb-1">Secondary Fix</h5>
                              <p className="font-medium text-gray-700">{issue.suggested_fixes.aspect_2}</p>
                            </div>
                          </div>
                          {issue.suggested_fixes.customer_service && (
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <h5 className="text-sm text-gray-500 mb-2">Customer Service Improvements</h5>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <FaRobot className="w-4 h-4 text-blue-500" />
                                  <span className="text-sm text-gray-700">{issue.suggested_fixes.customer_service.bot_reliance}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <FaUserShield className="w-4 h-4 text-blue-500" />
                                  <span className="text-sm text-gray-700">{issue.suggested_fixes.customer_service.human_agents}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <FaArrowUp className="w-4 h-4 text-blue-500" />
                                  <span className="text-sm text-gray-700">{issue.suggested_fixes.customer_service.escalation_process}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BusinessInsightsPage; 