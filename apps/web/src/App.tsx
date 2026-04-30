import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import RunbookDashboard from './pages/RunbookDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The automation engine is currently orchestrating operational workflows. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<RunbookDashboard />} />
          <Route path="/runbooks" element={<Placeholder name="Runbook Library Hub" />} />
          <Route path="/executions" element={<Placeholder name="Active Execution Control" />} />
          <Route path="/workflows" element={<Placeholder name="Multi-Step Workflow Builder" />} />
          <Route path="/incidents" element={<Placeholder name="Automated Incident Response" />} />
          <Route path="/governance" element={<Placeholder name="Automation Governance & Approval" />} />
          <Route path="/history" element={<Placeholder name="Operational Execution History" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
