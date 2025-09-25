
import React from 'react';
import type { PaymentStatus as PaymentStatusType, PaymentDetails } from '../types';

interface PaymentStatusProps {
  status: PaymentStatusType;
  details: PaymentDetails | null;
  onReset: () => void;
}

const SuccessIcon: React.FC = () => (
    <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const FailureIcon: React.FC = () => (
    <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const DetailRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-gray-200">
    <span className="font-medium text-gray-500">{label}:</span>
    <span className="font-mono text-gray-700 break-all text-right">{value || 'N/A'}</span>
  </div>
);

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, details, onReset }) => {
  if (status === 'SUCCESS') {
    return (
      <div className="text-center">
        <SuccessIcon />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
        <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Transaction Details:</h3>
          <DetailRow label="Payment ID" value={details?.razorpay_payment_id} />
          <DetailRow label="Order ID" value={details?.razorpay_order_id} />
        </div>
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs rounded-md">
            <strong>Important:</strong> In a real application, you must verify the <code className="bg-yellow-200 p-1 rounded">razorpay_signature</code> on your backend to confirm the payment's authenticity.
        </div>
        <button
          onClick={onReset}
          className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Make Another Payment
        </button>
      </div>
    );
  }

  if (status === 'FAILED') {
    return (
      <div className="text-center">
        <FailureIcon />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Failed</h2>
        <p className="text-gray-600 mt-2">{details?.error?.description || 'An unknown error occurred.'}</p>
        <div className="mt-6 text-left bg-red-50 p-4 rounded-lg">
           <h3 className="font-semibold text-red-700 mb-2">Error Details:</h3>
           <DetailRow label="Reason" value={details?.error?.reason} />
           <DetailRow label="Source" value={details?.error?.source} />
           <DetailRow label="Step" value={details?.error?.step} />
           <DetailRow label="Order ID" value={details?.error?.metadata?.order_id} />
        </div>
        <button
          onClick={onReset}
          className="w-full mt-8 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return null;
};
