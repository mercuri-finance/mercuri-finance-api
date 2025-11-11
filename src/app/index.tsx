import { Routes, Route, Navigate } from 'react-router-dom';
import { Verify } from './containers/api/Verify/index.js';
import { Settle } from './containers/api/Settle/index.js';
import { Supported } from './containers/api/Supported/index.js';
import { Discover } from './containers/api/discovery/index.js';
import { Funding } from './containers/api/funding/index.js';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/api/discover" replace />} />
      <Route path="/api/discover" element={<Discover />} />
      <Route path="/api/funding" element={<Funding />} />
      <Route path="/api/verify" element={<Verify />} />
      <Route path="/api/settle" element={<Settle />} />
      <Route path="/api/supported" element={<Supported />} />
    </Routes>
  );
}
