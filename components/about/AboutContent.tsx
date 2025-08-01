'use client';
import React from 'react';
import { FaClock, FaGlobe, FaUsers, FaCode, FaHeart, FaRocket } from 'react-icons/fa';

interface AboutContentProps {
  locale: string;
}

const AboutContent: React.FC<AboutContentProps> = ({ locale }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Timestamp.im</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Your trusted source for Unix timestamp conversion tools, timezone utilities, and time-related development resources.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaRocket className="mr-3 text-blue-600" />
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We believe that working with timestamps shouldn&apos;t be complicated. Our mission is to provide developers, data analysts, and anyone working with time data the most accurate, reliable, and easy-to-use timestamp conversion tools available anywhere on the web.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
            <FaGlobe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">12</h3>
            <p className="text-gray-600">Languages Supported</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
            <FaUsers className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">5K+</h3>
            <p className="text-gray-600">Monthly Users</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
            <FaClock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">50K+</h3>
            <p className="text-gray-600">Total Conversions</p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Timestamp Conversion</h3>
                <p className="text-gray-600">Convert between Unix timestamps and human-readable dates with support for multiple precision levels.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Timezone Tools</h3>
                <p className="text-gray-600">Convert times between different timezones with automatic DST handling and major timezone support.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Developer Resources</h3>
                <p className="text-gray-600">Code examples, best practices, and comprehensive guides for handling timestamps in various programming languages.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Multilingual Support</h3>
                <p className="text-gray-600">Available in 12+ languages to serve our global community of developers and users.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">5</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Educational Content</h3>
                <p className="text-gray-600">Detailed tutorials, FAQ sections, and explanations to help you understand timestamp concepts better.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">6</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Free Forever</h3>
                <p className="text-gray-600">All our tools and resources are completely free to use with no registration required.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Timestamp.im?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <FaCode className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Developer Focused</h3>
            <p className="text-gray-600 text-sm">Built by developers, for developers. We understand your needs and workflow.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <FaGlobe className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Global Accessibility</h3>
            <p className="text-gray-600 text-sm">Available worldwide with multilingual support and timezone-aware calculations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <FaHeart className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Privacy First</h3>
            <p className="text-gray-600 text-sm">All conversions happen locally in your browser. We don&apos;t store your data.</p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Built With Modern Technology</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="bg-white rounded-lg p-4 mb-2">
                <span className="text-2xl font-bold text-blue-600">Next.js</span>
              </div>
              <p className="text-sm text-gray-600">React Framework</p>
            </div>
            <div>
              <div className="bg-white rounded-lg p-4 mb-2">
                <span className="text-2xl font-bold text-green-600">TypeScript</span>
              </div>
              <p className="text-sm text-gray-600">Type Safety</p>
            </div>
            <div>
              <div className="bg-white rounded-lg p-4 mb-2">
                <span className="text-2xl font-bold text-purple-600">Tailwind</span>
              </div>
              <p className="text-sm text-gray-600">CSS Framework</p>
            </div>
            <div>
              <div className="bg-white rounded-lg p-4 mb-2">
                <span className="text-2xl font-bold text-orange-600">i18n</span>
              </div>
              <p className="text-sm text-gray-600">Internationalization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Commitment</h2>
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Continuous Improvement</h3>
              <p className="text-gray-700 mb-4">We&apos;re constantly working to improve our tools and add new features based on user feedback and emerging needs in the development community.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Regular updates and improvements
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Active response to user feedback
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  New features and tools regularly added
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Ongoing performance optimization
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <FaRocket className="w-16 h-16 text-blue-600" />
              </div>
              <p className="text-gray-600">Innovation drives everything we do, from our user interface design to our algorithm implementations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="text-center">
        <div className="bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6">Have questions, suggestions, or need help? We&apos;d love to hear from you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/contact`}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href={`/${locale}/blog`}
              className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Read Our Blog
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;