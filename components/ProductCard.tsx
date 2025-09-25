
import React from 'react';
import type { Product, PaymentDetails, RazorpayOptions, PaymentStatus } from '../types';

interface ProductCardProps {
  product: Product;
  onPaymentSuccess: (details: PaymentDetails) => void;
  onPaymentFailure: (details: PaymentDetails) => void;
  setPaymentStatus: (status: PaymentStatus) => void;
  paymentStatus: PaymentStatus;
}

const SpinnerIcon: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onPaymentSuccess, 
  onPaymentFailure,
  setPaymentStatus,
  paymentStatus 
}) => {
  const handlePayment = async () => {
    setPaymentStatus('PROCESSING');
    
    // IMPORTANT: In a real-world application, the order creation should happen on a secure backend server.
    // The backend would call the Razorpay API with your secret key to create an order and return the order_id.
    // For this demo, we'll simulate this process.
    console.log("Simulating backend order creation...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    // This is a dummy order_id. In a real app, this comes from your server.
    const simulatedOrderId = `order_demo_${Date.now()}`;
    console.log(`Simulated Order ID: ${simulatedOrderId}`);

    const options: RazorpayOptions = {
      key: 'rzp_test_YOUR_KEY_ID', // IMPORTANT: Replace with your actual Razorpay Key ID
      amount: product.price,
      currency: product.currency,
      name: 'Your Company Name',
      description: `Payment for ${product.name}`,
      image: 'https://picsum.photos/seed/logo/128/128', // Your Company Logo
      order_id: simulatedOrderId,
      handler: (response) => {
        console.log('Payment Successful:', response);
        onPaymentSuccess(response);
      },
      prefill: {
        name: 'Test User',
        email: 'test.user@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Demo Address, Pune',
      },
      theme: {
        color: '#3399cc',
      },
    };

    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Are you online?');
      setPaymentStatus('IDLE');
      return;
    }
    
    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', (response: PaymentDetails) => {
      console.error('Payment Failed:', response);
      onPaymentFailure(response);
    });

    rzp.open();
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-600 mt-2 text-center">{product.description}</p>
      <p className="text-4xl font-bold text-indigo-600 my-6">
        {(product.price / 100).toLocaleString('en-IN', {
          style: 'currency',
          currency: product.currency,
        })}
      </p>
      <button
        onClick={handlePayment}
        disabled={paymentStatus === 'PROCESSING'}
        className="w-full flex justify-center items-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {paymentStatus === 'PROCESSING' ? (
          <>
            <SpinnerIcon />
            Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </button>
    </div>
  );
};
