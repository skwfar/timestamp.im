'use client';
import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaCopy } from 'react-icons/fa';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description, className = '' }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Could add a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="text-sm text-gray-600">Share:</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600 transition-colors"
        title="Share on Twitter"
      >
        <FaTwitter className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
        title="Share on Facebook"
      >
        <FaFacebook className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 transition-colors"
        title="Share on LinkedIn"
      >
        <FaLinkedin className="w-5 h-5" />
      </a>
      <button
        onClick={copyToClipboard}
        className="text-gray-600 hover:text-gray-800 transition-colors"
        title="Copy link"
      >
        <FaCopy className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SocialShare;