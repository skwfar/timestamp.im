'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendar, FaClock, FaTag, FaShare, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

interface BlogPostProps {
  slug: string;
  locale: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, locale }) => {
  const { t } = useTranslation();

  // In a real app, this would fetch content based on the slug
  const getPostContent = (slug: string) => {
    // Import blog data
    const { blogPosts } = require('./blogData');
    return blogPosts[slug] || null;
  };

  const post = getPostContent(slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('post-not-found')}</h1>
        <Link href={`/${locale}/blog`} className="text-blue-600 hover:text-blue-800">
          {t('back-to-blog')}
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = `https://timestamp.im/${locale}/blog/${slug}`;
  const shareTitle = encodeURIComponent(post.title);

  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><Link href={`/${locale}`}>{t('home')}</Link></li>
          <li>•</li>
          <li><Link href={`/${locale}/blog`}>{t('blog')}</Link></li>
          <li>•</li>
          <li className="text-gray-900">{post.title}</li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-2 md:mb-0">
            <FaTag className="w-3 h-3 mr-1" />
            {post.category}
          </span>
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <span className="flex items-center">
              <FaCalendar className="w-4 h-4 mr-1" />
              {formatDate(post.publishDate)}
            </span>
            <span className="flex items-center">
              <FaClock className="w-4 h-4 mr-1" />
              {post.readTime}
            </span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Share Buttons */}
      <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700 flex items-center">
          <FaShare className="w-4 h-4 mr-2" />
          {t('share')}:
        </span>
        <a
          href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition-colors"
        >
          <FaTwitter className="w-5 h-5" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaFacebook className="w-5 h-5" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 transition-colors"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
      </div>

      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link 
            href={`/${locale}/blog`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← {t('back-to-blog')}
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{t('share-this-article')}:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition-colors"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogPost;