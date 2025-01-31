
import React, { useState } from 'react';
import '../style/FAQs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFAQ = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={toggleFAQ}>
                <span>{question}</span>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </div>
            {isOpen && (
                <div className="faq-answer">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQs = () => {
    const faqData = [
        { question: ' How do I book an ambulance cab?', answer: ' You can book via our website, mobile app, or by calling our 24/7 helpline.' },
        { question: 'Are your ambulance cabs equipped for emergencies?', answer: 'Yes, all vehicles have basic medical equipment and trained personal.' },
        { question: ' How long will it take for the ambulance cab to arrive?', answer: 'Arrival times vary based on location but typically range from 10–30 minutes.' },
        { question: ' Do you provide intercity ambulance services?', answer: 'Yes, we offer both local and long-distance patient transport.' },
        { question: ' What payment options do you accept?', answer: 'We accept UPI and credit/debit card payments.' },
    ];

    return (
        <div className="FAQcontainer">
            <h1>Frequently Asked Questions</h1>
            {faqData.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
        </div>
    );
};

export default FAQs;
