'use client';
import React, { useState } from 'react';
import { FaEnvelope, FaTwitter, FaGithub, FaGlobe, FaQuestionCircle, FaBug, FaLightbulb, FaHeart } from 'react-icons/fa';

interface ContactContentProps {
  locale: string;
}

const ContactContent: React.FC<ContactContentProps> = ({ locale }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We&apos;ll get back to you as soon as possible.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Have questions, suggestions, or need help? We&apos;re here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  What is this about?
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please describe your question, issue, or suggestion in detail. The more information you provide, the better we can help you."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a href="mailto:contact@timestamp.im" className="text-blue-600 hover:text-blue-800">
                    contact@timestamp.im
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <FaGlobe className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <a href="https://timestamp.im" className="text-green-600 hover:text-green-800">
                    timestamp.im
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Response Time</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <span className="text-sm text-gray-700">General inquiries: 24-48 hours</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                <span className="text-sm text-gray-700">Technical issues: 12-24 hours</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                <span className="text-sm text-gray-700">Urgent issues: 2-6 hours</span>
              </div>
            </div>
          </div>

          {/* Contact Types */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">What can we help you with?</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaQuestionCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">General Questions</p>
                  <p className="text-sm text-gray-600">Questions about our tools, features, or how to use them effectively.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaBug className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Bug Reports</p>
                  <p className="text-sm text-gray-600">Found something that&apos;s not working correctly? Let us know so we can fix it.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaLightbulb className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Feature Suggestions</p>
                  <p className="text-sm text-gray-600">Have ideas for new tools or improvements? We&apos;d love to hear them.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaHeart className="w-5 h-5 text-pink-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Partnerships</p>
                  <p className="text-sm text-gray-600">Interested in collaborating or integrating our tools? Get in touch.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/timestampim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/timestampim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-2">How accurate are your timestamp conversion tools?</h3>
            <p className="text-gray-600 text-sm">Our tools use industry-standard algorithms and are tested extensively. All conversions are mathematically precise and handle edge cases like leap years and timezone transitions correctly.</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-2">Is your service completely free?</h3>
            <p className="text-gray-600 text-sm">Yes! All our timestamp tools and resources are completely free to use. There are no hidden fees, registration requirements, or usage limits.</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-2">How do you handle my data and privacy?</h3>
            <p className="text-gray-600 text-sm">We prioritize your privacy. All timestamp conversions happen locally in your browser - we don&apos;t store or transmit your data. Check our Privacy Policy for complete details.</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-2">Do your tools work on mobile devices?</h3>
            <p className="text-gray-600 text-sm">Absolutely! Our website is fully responsive and optimized for mobile devices, tablets, and desktops. You can use all our tools on any device with a web browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;