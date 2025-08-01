'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUsers, FaExchangeAlt, FaGlobe, FaClock, FaCode, FaDownload } from 'react-icons/fa';

const SiteStats: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: FaUsers,
      value: '5K+',
      label: t('monthly-active-users'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: FaExchangeAlt,
      value: '50K+',
      label: t('timestamp-conversions'),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: FaGlobe,
      value: '12',
      label: t('supported-languages'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: FaClock,
      value: '24/7',
      label: t('availability'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: FaCode,
      value: '6',
      label: t('developer-tools'),
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: FaDownload,
      value: '99%',
      label: t('uptime'),
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="my-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('trusted-by-developers-worldwide')}</h2>
        <p className="text-gray-600">{t('stats-description')}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4 text-center`}>
            <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
            <div className="font-bold text-xl text-gray-800 mb-1">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">{t('accuracy-guaranteed')}</h3>
            <p className="text-sm text-gray-600">{t('accuracy-description')}</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">{t('privacy-focused')}</h3>
            <p className="text-sm text-gray-600">{t('privacy-description')}</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">{t('developer-friendly')}</h3>
            <p className="text-sm text-gray-600">{t('developer-description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteStats;