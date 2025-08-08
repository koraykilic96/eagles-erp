import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import trTR from 'antd/locale/tr_TR';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainLayout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Notifications from './pages/Notifications';
import Certificate from './pages/Certificate';
import Jobs from './pages/Jobs';
import Events from './pages/Events';
import ActionPlan from './pages/ActionPlan';
import VesselManagement from './pages/VesselManagement';
import Maintenance from './pages/Maintenance';
import ActivationDeactivationLibrary from './pages/ActivationDeactivationLibrary';
import KPI from './pages/KPI';
import SparePart from './pages/SparePart';
import ChemicalTestCenter from './pages/ChemicalTestCenter';
import Purchasing from './pages/Purchasing';
import RunningCostAccounting from './pages/RunningCostAccounting';
import Safety from './pages/Safety';
import Inspection from './pages/Inspection';
import Offer from './pages/Offer';
import TrainingDrill from './pages/TrainingDrill';
import IncidentAccident from './pages/IncidentAccident';
import NearMiss from './pages/NearMiss';
import './App.css';

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ConfigProvider 
        locale={trTR}
        theme={{
          token: {
            // React 19 uyumluluğu için token ayarları
            borderRadius: 6,
            colorPrimary: '#3b82f6',
          },
        }}
      >
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/action-plan" element={<ActionPlan />} />
              <Route path="/vessel-management" element={<VesselManagement />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/activation-deactivation-library" element={<ActivationDeactivationLibrary />} />
              <Route path="/kpi" element={<KPI />} />
              <Route path="/spare-part" element={<SparePart />} />
              <Route path="/chemical-test-center" element={<ChemicalTestCenter />} />
              <Route path="/purchasing" element={<Purchasing />} />
              <Route path="/running-cost-accounting" element={<RunningCostAccounting />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/inspection" element={<Inspection />} />
              <Route path="/offer" element={<Offer />} />
              <Route path="/training-drill" element={<TrainingDrill />} />
              <Route path="/incident-accident" element={<IncidentAccident />} />
              <Route path="/near-miss" element={<NearMiss />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/Certificate" element={<Certificate />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </Router>
      </ConfigProvider>
    </DndProvider>
  );
};

export default App;
