'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FaCalendar, FaClock, FaTag } from 'react-icons/fa';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

interface BlogListProps {
  locale: string;
}

const BlogList: React.FC<BlogListProps> = ({ locale }) => {
  const { t } = useTranslation();

  // Import blog posts data
  const { blogPostsList } = require('./blogData');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPosts = blogPostsList.filter((post: BlogPost) => post.featured);
  const regularPosts = blogPostsList.filter((post: BlogPost) => !post.featured);

  return (
    <div className="space-y-8">
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Posts</h2>
          <div className="grid gap-6">
            {featuredPosts.map((post: BlogPost) => (
              <article key={post.slug} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2 md:mb-0">
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <Link 
                    href={`/${locale}/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                <Link 
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Posts</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {regularPosts.map((post: BlogPost) => (
            <article key={post.slug} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2 sm:mb-0">
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                <Link 
                  href={`/${locale}/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
              <Link 
                href={`/${locale}/blog/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Stay Updated</h3>
        <p className="text-gray-600 mb-4">Get the latest tutorials and tips delivered to your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogList;