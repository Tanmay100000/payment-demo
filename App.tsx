
import React, { useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { PaymentStatus } from './components/PaymentStatus';
import type { PaymentStatus as PaymentStatusType, PaymentDetails } from './types';

const App: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusType>('IDLE');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  const product = {
    name: 'Nebula Smart Projector',
    description: 'A high-definition smart projector for an immersive home cinema experience.',
    price: 49900, // Price in paisa (e.g., 499.00 INR)
    currency: 'INR',
    image: 'https://picsum.photos/seed/projector/600/400',
  };

  const handlePaymentSuccess = (details: PaymentDetails) => {
    setPaymentDetails(details);
    setPaymentStatus('SUCCESS');
  };

  const handlePaymentFailure = (details: PaymentDetails) => {
    setPaymentDetails(details);
    setPaymentStatus('FAILED');
  };

  const resetPayment = () => {
    setPaymentStatus('IDLE');
    setPaymentDetails(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">React Razorpay Demo</h1>
            <p className="text-gray-500 mt-2">Securely process payments with Razorpay.</p>
          </header>
          
          <main>
            {paymentStatus === 'IDLE' || paymentStatus === 'PROCESSING' ? (
              <ProductCard
                product={product}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentFailure={handlePaymentFailure}
                setPaymentStatus={setPaymentStatus}
                paymentStatus={paymentStatus}
              />
            ) : (
              <PaymentStatus 
                status={paymentStatus}
                details={paymentDetails}
                onReset={resetPayment}
              />
            )}
          </main>
        </div>
      </div>
      <footer className="text-center mt-8 text-gray-400 text-sm">
        <p>This is a demo application. Do not use real card details.</p>
      </footer>
    </div>
  );
};

export default App;
