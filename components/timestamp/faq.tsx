import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Faq = () => {
  const { t } = useTranslation()

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: t('what-are-timestamp-tools'),
      answer: t('timestamp-tools-are-software-or-online-utilities-designed-to-generate-convert-or-manipulate-timestamps-these-can-be-used-to-convert-human-readable-dates-into-unix-timestamps-convert-unix-timestamps-into-readable-dates-and-compare-different-timestamps-among-other-functions')
    },
    {
      question: t('how-do-i-convert-a-date-to-a-unix-timestamp'),
      answer: t('to-convert-a-date-to-a-unix-timestamp-you-can-use-various-online-timestamp-conversion-tools-simply-input-the-date-and-time-and-the-tool-will-generate-the-corresponding-unix-timestamp-you-can-also-use-programming-languages-like-python-javascript-or-php-to-achieve-this-programmatically')
    },
    {
      question: t('why-do-developers-use-unix-timestamps'),
      answer: t('unix-timestamps-provide-a-standardized-way-to-represent-date-and-time-which-is-crucial-for-developers-working-with-different-systems-and-languages-using-unix-timestamps-ensures-consistency-and-eliminates-ambiguities-related-to-time-zones-and-formats-making-it-easier-to-store-and-manipulate-date-time-data')
    },
    {
      question: t('can-timestamp-tools-handle-different-time-zones'),
      answer: t('yes-many-timestamp-tools-are-equipped-to-handle-different-time-zones-users-can-specify-the-time-zone-they-want-to-convert-from-or-to-ensuring-accuracy-across-different-geographical-locations-this-feature-is-particularly-useful-for-applications-and-websites-serving-a-global-audience')
    },
    {
      question: t('is-it-possible-to-compare-timestamps-using-these-tools'),
      answer: t('yes-timestamp-tools-often-include-functionalities-to-compare-two-or-more-timestamps-this-can-help-determine-the-duration-between-events-check-for-discrepancies-or-verify-time-related-data-accurate-timestamp-comparisons-are-essential-for-applications-like-event-scheduling-logging-and-data-synchronization')
    },
    {
      question: t('are-timestamp-tools-free-to-use'),
      answer: t('many-basic-timestamp-tools-are-available-for-free-and-accessible-online-however-some-advanced-tools-with-additional-features-may-require-a-subscription-or-one-time-purchase-its-essential-to-evaluate-the-tools-capabilities-and-choose-one-that-best-meets-your-needs-and-budget')
    },
    {
      question: t('year-2038-problem'),
      answer: t('year-2038-explanation')
    },
    {
      question: t('timestamp-formats-question'),
      answer: t('timestamp-formats-explanation')
    },
    {
      question: t('timestamp-validation-question'),
      answer: t('timestamp-validation-explanation')
    },
    {
      question: t('utc-vs-local-question'),
      answer: t('utc-vs-local-explanation')
    }
  ];

  return (
    <div className="space-y-4">
      <div className="pt-4">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow border-b border-base-300 rounded-box mt-2">
            <input 
              type="checkbox" 
              className="peer" 
              checked={openIndex === index} 
              onChange={() => handleToggle(index)} 
            />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
