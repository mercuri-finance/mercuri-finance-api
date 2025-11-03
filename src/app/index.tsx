import { Routes, Route, Navigate } from 'react-router-dom';
import { Verify } from './containers/api/Verify/index.js';
import { Settle } from './containers/api/Settle/index.js';
import { Supported } from './containers/api/Supported/index.js';
import { PaymentResponse } from './containers/schemas/PaymentResponse.js';
import { PaymentSession } from './containers/schemas/PaymentSession.js';
import { TokenInfo } from './containers/schemas/TokenInfo.js';

export function App(): JSX.Element {
  return (
    <Routes>
      {/* Redirect root → docs intro */}
      <Route path="/" element={<Navigate to="/api/supported" replace />} />

      {/* Fallback or overview */}
      <Route path="/api/verify" element={<Verify />} />
      <Route path="/api/settle" element={<Settle />} />
      <Route path="/api/supported" element={<Supported />} />
    </Routes>
  );
}
