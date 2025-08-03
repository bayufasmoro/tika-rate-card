import React from 'react';
import { Link } from 'react-router-dom';

interface RateCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const RateCard: React.FC<RateCardProps> = ({ title, price, features, isPopular = false }) => {
  return (
    <div className={`p-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 ${isPopular ? 'border-2 border-pink-500' : 'border border-gray-100'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-pink-500">{title}</h3>
        {isPopular && (
          <span className="px-3 py-1 text-sm bg-pink-100 text-pink-700 rounded-full">Popular</span>
        )}
      </div>
      <div className="text-4xl font-bold text-gray-800 mb-6">{price}</div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full mt-auto py-3 px-6 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors">
        Get Started
      </button>
    </div>
  );
};

const Pricing: React.FC = () => {
  const rateCards = [
    {
      title: "Basic",
      price: "$9.99/mo",
      features: [
        "100 GB Storage",
        "5 Users",
        "Basic Support",
        "Email Integration"
      ]
    },
    {
      title: "Premium",
      price: "$29.99/mo",
      features: [
        "500 GB Storage",
        "20 Users",
        "Priority Support",
        "Advanced Analytics",
        "Custom Branding"
      ],
      isPopular: true
    },
    {
      title: "Enterprise",
      price: "$49.99/mo",
      features: [
        "Unlimited Storage",
        "Unlimited Users",
        "24/7 Support",
        "Custom Solutions",
        "API Access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan that fits your needs. No hidden fees, no contracts, just simple pricing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rateCards.map((card, index) => (
            <div key={index} className={card.isPopular ? "lg:-mt-4" : ""}>
              <RateCard {...card} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Need something custom?</h2>
          <p className="text-gray-600 mb-6">We can create a custom plan tailored to your specific requirements.</p>
          <Link 
            to="/contact" 
            className="inline-block bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
