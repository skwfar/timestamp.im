import { useState } from 'react';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What are timestamp tools?",
      answer: "Timestamp tools are software or online utilities designed to generate, convert, or manipulate timestamps. These can be used to convert human-readable dates into Unix timestamps, convert Unix timestamps into readable dates, and compare different timestamps, among other functions."
    },
    {
      question: "How do I convert a date to a Unix timestamp?",
      answer: "To convert a date to a Unix timestamp, you can use various online timestamp conversion tools. Simply input the date and time, and the tool will generate the corresponding Unix timestamp. You can also use programming languages like Python, JavaScript, or PHP to achieve this programmatically."
    },
    {
      question: "Why do developers use Unix timestamps?",
      answer: "Unix timestamps provide a standardized way to represent date and time, which is crucial for developers working with different systems and languages. Using Unix timestamps ensures consistency and eliminates ambiguities related to time zones and formats, making it easier to store and manipulate date/time data."
    },
    {
      question: "Can timestamp tools handle different time zones?",
      answer: "Yes, many timestamp tools are equipped to handle different time zones. Users can specify the time zone they want to convert from or to, ensuring accuracy across different geographical locations. This feature is particularly useful for applications and websites serving a global audience."
    },
    {
      question: "Is it possible to compare timestamps using these tools?",
      answer: "Yes, timestamp tools often include functionalities to compare two or more timestamps. This can help determine the duration between events, check for discrepancies, or verify time-related data. Accurate timestamp comparisons are essential for applications like event scheduling, logging, and data synchronization."
    },
    {
      question: "Are timestamp tools free to use?",
      answer: "Many basic timestamp tools are available for free and accessible online. However, some advanced tools with additional features may require a subscription or one-time purchase. It's essential to evaluate the tool's capabilities and choose one that best meets your needs and budget."
    }
  ];

  return (
    <div className="space-y-4">
      <div className="pt-4">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow border-b border-base-300 bg-base-100 rounded-box mt-2">
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
