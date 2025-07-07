'use client';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface LocalizedContentProps {
  locale: string;
  type: 'privacy' | 'terms';
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<SectionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left transition-colors"
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-800">{title}</h3>
        {isOpen ? <FaChevronUp className="text-gray-500 text-sm" /> : <FaChevronDown className="text-gray-500 text-sm" />}
      </button>
      {isOpen && (
        <div className="px-4 md:px-6 py-3 md:py-4 bg-white border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

const LocalizedContent: React.FC<LocalizedContentProps> = ({ locale, type }) => {
  if (type === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">
            We are committed to protecting your privacy and ensuring transparency about how we handle your data.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-gray-700">
            <strong>Privacy First:</strong> All timestamp conversions are performed locally in your browser. 
            We do not store or transmit the timestamp values you enter for conversion.
          </p>
        </div>

        {/* Collapsible Sections */}
        <CollapsibleSection 
          title="Information We Collect" 
          defaultOpen={true}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Automatically Collected Information</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Browser type and version
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Operating system
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  IP address (anonymized)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Pages visited and time spent
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Information You Provide</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Timestamp values (processed locally only)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Language preferences
                </li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="How We Use Information">
          <div className="space-y-3">
            <p>We use the collected information to:</p>
            <ul className="space-y-2 ml-4">
              <li>• Provide and improve our timestamp conversion services</li>
              <li>• Analyze website usage and performance</li>
              <li>• Ensure security and prevent abuse</li>
              <li>• Customize content based on your language preference</li>
            </ul>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Cookies & Tracking">
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="text-gray-700">
                <strong>Cookie Notice:</strong> We use minimal cookies only for essential functionality and analytics.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">Cookie Type</th>
                    <th className="border border-gray-300 p-3 text-left">Purpose</th>
                    <th className="border border-gray-300 p-3 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Language Preference</td>
                    <td className="border border-gray-300 p-3">Remember your chosen language</td>
                    <td className="border border-gray-300 p-3">1 year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Google Analytics</td>
                    <td className="border border-gray-300 p-3">Anonymous usage statistics</td>
                    <td className="border border-gray-300 p-3">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Your Rights">
          <div className="space-y-3">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate information</li>
              <li>• Request deletion of your information</li>
              <li>• Object to processing of your information</li>
              <li>• Data portability</li>
              <li>• Restrict data processing</li>
            </ul>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Contact Us">
          <div className="space-y-3">
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@timestamp.im</p>
              <p><strong>Website:</strong> https://timestamp.im</p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    );
  }

  // Terms of Service content
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms of Service</h1>
        <p className="text-gray-600 text-lg">
          Please read these terms carefully before using our timestamp conversion tools.
        </p>
        <p className="text-gray-500 text-sm mt-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
        <p className="text-gray-700">
          <strong>Agreement:</strong> By using Timestamp.im, you agree to these terms and conditions.
        </p>
      </div>

      <CollapsibleSection 
        title="Service Description" 
        defaultOpen={true}
      >
        <div className="space-y-3">
          <p>Timestamp.im provides free online tools for timestamp conversion, including:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
            <li>• Unix timestamp conversion</li>
            <li>• Date to timestamp conversion</li>
            <li>• Discord timestamp generator</li>
            <li>• Timezone conversion tools</li>
            <li>• ISO 8601 format conversion</li>
            <li>• Current timestamp display</li>
          </ul>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Acceptable Use">
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <p className="text-gray-700">
              <strong>Important:</strong> Our service is for lawful purposes only.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">❌ Prohibited Activities</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Illegal or unauthorized use</li>
                <li>• Accessing systems without permission</li>
                <li>• Disrupting service operation</li>
                <li>• Excessive automated requests</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">✅ Encouraged Use</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Development and testing</li>
                <li>• Educational purposes</li>
                <li>• Personal projects</li>
                <li>• Commercial applications</li>
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Limitation of Liability">
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <p className="text-gray-700">
            <strong>Important Disclaimer:</strong> While we strive for accuracy, timestamp conversions should be verified for critical applications. 
            Timestamp.im is not liable for any damages resulting from the use of our service.
          </p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Contact Information">
        <div className="space-y-3">
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <div className="space-y-2">
            <p><strong>Email:</strong> legal@timestamp.im</p>
            <p><strong>Website:</strong> https://timestamp.im</p>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default LocalizedContent;