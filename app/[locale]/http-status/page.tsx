"use client";

import { useState } from "react";

interface HTTPStatus {
  code: string;
  message: string;
  description: string;
  category: string;
  color: string;
}

const httpStatusCodes: HTTPStatus[] = [
  // 1xx Informational
  { code: "100", message: "Continue", description: "The server has received the request headers and the client should proceed to send the request body.", category: "Informational", color: "text-blue-500" },
  { code: "101", message: "Switching Protocols", description: "The requester has asked the server to switch protocols and the server has agreed to do so.", category: "Informational", color: "text-blue-500" },
  { code: "102", message: "Processing", description: "This code indicates that the server has received and is processing the request, but no response is available yet.", category: "Informational", color: "text-blue-500" },
  { code: "103", message: "Early Hints", description: "This status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response.", category: "Informational", color: "text-blue-500" },

  // 2xx Success
  { code: "200", message: "OK", description: "The request has succeeded. The information returned with the response is dependent on the method used in the request.", category: "Success", color: "text-green-500" },
  { code: "201", message: "Created", description: "The request has been fulfilled and resulted in a new resource being created.", category: "Success", color: "text-green-500" },
  { code: "202", message: "Accepted", description: "The request has been accepted for processing, but the processing has not been completed.", category: "Success", color: "text-green-500" },
  { code: "204", message: "No Content", description: "The server successfully processed the request and is not returning any content.", category: "Success", color: "text-green-500" },
  { code: "206", message: "Partial Content", description: "The server is delivering only part of the resource due to a range header sent by the client.", category: "Success", color: "text-green-500" },

  // 3xx Redirection
  { code: "300", message: "Multiple Choices", description: "The requested resource has multiple representations, each with its own specific location.", category: "Redirection", color: "text-yellow-500" },
  { code: "301", message: "Moved Permanently", description: "The requested resource has been permanently moved to a new URI.", category: "Redirection", color: "text-yellow-500" },
  { code: "302", message: "Found", description: "The requested resource has been temporarily moved to a different URI.", category: "Redirection", color: "text-yellow-500" },
  { code: "304", message: "Not Modified", description: "The resource has not been modified since the version specified by the request headers.", category: "Redirection", color: "text-yellow-500" },
  { code: "307", message: "Temporary Redirect", description: "The request should be repeated with another URI, but future requests should still use the original URI.", category: "Redirection", color: "text-yellow-500" },
  { code: "308", message: "Permanent Redirect", description: "The request and all future requests should be repeated using another URI.", category: "Redirection", color: "text-yellow-500" },

  // 4xx Client Errors
  { code: "400", message: "Bad Request", description: "The server cannot or will not process the request due to an apparent client error.", category: "Client Error", color: "text-red-500" },
  { code: "401", message: "Unauthorized", description: "Authentication is required and has failed or has not been provided.", category: "Client Error", color: "text-red-500" },
  { code: "403", message: "Forbidden", description: "The server understood the request but refuses to authorize it.", category: "Client Error", color: "text-red-500" },
  { code: "404", message: "Not Found", description: "The requested resource could not be found but may be available in the future.", category: "Client Error", color: "text-red-500" },
  { code: "405", message: "Method Not Allowed", description: "The method specified in the request is not allowed for the resource identified by the request URI.", category: "Client Error", color: "text-red-500" },
  { code: "408", message: "Request Timeout", description: "The server timed out waiting for the request.", category: "Client Error", color: "text-red-500" },
  { code: "409", message: "Conflict", description: "The request could not be completed due to a conflict with the current state of the resource.", category: "Client Error", color: "text-red-500" },
  { code: "413", message: "Payload Too Large", description: "The request is larger than the server is willing or able to process.", category: "Client Error", color: "text-red-500" },
  { code: "414", message: "URI Too Long", description: "The URI provided was too long for the server to process.", category: "Client Error", color: "text-red-500" },
  { code: "429", message: "Too Many Requests", description: "The user has sent too many requests in a given amount of time.", category: "Client Error", color: "text-red-500" },

  // 5xx Server Errors
  { code: "500", message: "Internal Server Error", description: "An unexpected condition was encountered and no more specific message is suitable.", category: "Server Error", color: "text-purple-500" },
  { code: "501", message: "Not Implemented", description: "The server either does not recognize the request method, or it lacks the ability to fulfill the request.", category: "Server Error", color: "text-purple-500" },
  { code: "502", message: "Bad Gateway", description: "The server received an invalid response from the upstream server it accessed while attempting to fulfill the request.", category: "Server Error", color: "text-purple-500" },
  { code: "503", message: "Service Unavailable", description: "The server is currently unavailable due to maintenance or overload.", category: "Server Error", color: "text-purple-500" },
  { code: "504", message: "Gateway Timeout", description: "The server did not receive a timely response from the upstream server.", category: "Server Error", color: "text-purple-500" },
  { code: "505", message: "HTTP Version Not Supported", description: "The server does not support the HTTP protocol version used in the request.", category: "Server Error", color: "text-purple-500" }
];

export default function HTTPStatusLookup() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<HTTPStatus | null>(null);

  const categories = ["All", "Informational", "Success", "Redirection", "Client Error", "Server Error"];

  const filteredStatusCodes = httpStatusCodes.filter(status => {
    const matchesSearch = status.code.includes(searchTerm) || 
                         status.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         status.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || status.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStatusClick = (status: HTTPStatus) => {
    setSelectedStatus(status);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedStatus(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Informational": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Success": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Redirection": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Client Error": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Server Error": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            HTTP Status Code Lookup
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Search and understand HTTP status codes with detailed descriptions and meanings
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-6 h-6 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Status Codes
            </h2>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all duration-200 text-sm"
            >
              Clear
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by code, message, or description..."
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredStatusCodes.map((status) => (
            <div
              key={status.code}
              onClick={() => handleStatusClick(status)}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl font-bold ${status.color}`}>
                  {status.code}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(status.category)}`}>
                  {status.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {status.message}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {status.description}
              </p>
            </div>
          ))}
        </div>

        {/* Selected Status Detail */}
        {selectedStatus && (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-6 h-6 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Status Code Details
              </h2>
              <button
                onClick={() => setSelectedStatus(null)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${selectedStatus.color}`}>
                  {selectedStatus.code}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getCategoryColor(selectedStatus.category)}`}>
                  {selectedStatus.category}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  {selectedStatus.message}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedStatus.description}
                </p>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
} 