import React, { useState } from 'react';
import { CheckCircle, AlertCircle, MinusCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

const PastIncidents = () => {
  const incidents = [
    {
      id: 1,
      service: 'Best Health App',
      status: 'Resolved',
      description: 'OAuth authentication service degradation affecting user logins',
      startDate: '2024-11-28 14:30 AEST',
      resolvedDate: '2024-11-28 16:45 AEST',
      region: 'AU'
    },
    {
      id: 2,
      service: 'Bp Premier Online',
      status: 'Resolved',
      description: 'Scheduled maintenance completed: System upgrade and performance improvements',
      startDate: '2024-11-15 22:00 AEST',
      resolvedDate: '2024-11-16 03:30 AEST',
      region: 'AU'
    },
    {
      id: 3,
      service: 'BHA Cloud Services',
      status: 'Resolved',
      description: 'Intermittent delays in data synchronization',
      startDate: '2024-11-10 09:15 AEST',
      resolvedDate: '2024-11-10 10:45 AEST',
      region: 'AU'
    },
    {
      id: 4,
      service: 'Allied Omni',
      status: 'Resolved',
      description: 'Brief service interruption during database optimization',
      startDate: '2024-11-05 13:20 NZST',
      resolvedDate: '2024-11-05 14:10 NZST',
      region: 'NZ'
    }
  ];

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">Past Incidents</h2>
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div 
            key={incident.id} 
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <h3 className="font-medium text-slate-900">{incident.service}</h3>
                <span className="text-sm px-2 py-1 bg-emerald-50 text-emerald-700 rounded">
                  {incident.status}
                </span>
                <span className="text-sm px-2 py-1 bg-slate-100 text-slate-700 rounded">
                  {incident.region}
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-2">{incident.description}</p>
            <div className="text-xs text-slate-500">
              <span>Started: {incident.startDate}</span>
              <span className="mx-2">•</span>
              <span>Resolved: {incident.resolvedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceStatus = ({ name, status, lastUpdated }) => {
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return { icon: CheckCircle, color: 'text-emerald-500', bgColor: 'bg-emerald-50' };
      case 'degraded':
        return { icon: AlertTriangle, color: 'text-amber-500', bgColor: 'bg-amber-50' };
      case 'outage':
        return { icon: AlertCircle, color: 'text-rose-500', bgColor: 'bg-rose-50' };
      case 'maintenance':
        return { icon: Clock, color: 'text-sky-500', bgColor: 'bg-sky-50' };
      default:
        return { icon: MinusCircle, color: 'text-slate-500', bgColor: 'bg-slate-50' };
    }
  };

  const { icon: StatusIcon, color, bgColor } = getStatusConfig(status);

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg mb-2 ${bgColor} transition-all duration-200 hover:shadow-sm`}>
      <div className="flex items-center space-x-4">
        <StatusIcon className={`w-5 h-5 ${color}`} />
        <div>
          <h3 className="font-medium text-slate-900">{name}</h3>
          <p className={`text-sm ${color} font-medium`}>{status}</p>
        </div>
      </div>
      <div className="text-sm text-slate-500">
        Updated: {lastUpdated}
      </div>
    </div>
  );
};

const ServiceGroup = ({ title, services }) => (
  <div className="mb-6 rounded-lg border border-slate-200 bg-white shadow-sm">
    <div className="p-6 pb-2">
      <h3 className="text-lg font-medium text-slate-900">{title}</h3>
    </div>
    <div className="p-6">
      {services.map((service, index) => (
        <ServiceStatus key={index} {...service} />
      ))}
    </div>
  </div>
);

const RegionToggle = ({ selectedRegion, onToggle }) => (
  <div className="flex p-1 bg-slate-100 rounded-lg w-fit mb-6">
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        selectedRegion === 'AU' 
          ? 'bg-white text-slate-900 shadow-sm' 
          : 'text-slate-600 hover:text-slate-900'
      }`}
      onClick={() => onToggle('AU')}
    >
      Australia
    </button>
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        selectedRegion === 'NZ' 
          ? 'bg-white text-slate-900 shadow-sm' 
          : 'text-slate-600 hover:text-slate-900'
      }`}
      onClick={() => onToggle('NZ')}
    >
      New Zealand
    </button>
  </div>
);

const StatusPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('AU');

  const australianServices = {
    cloud: [
      { name: 'Bp Premier Online', status: 'operational', lastUpdated: '2024-12-04 09:00 AEST' },
      { name: 'Best Health App', status: 'degraded', lastUpdated: '2024-12-04 09:00 AEST' },
      { name: 'BHA Cloud Services', status: 'operational', lastUpdated: '2024-12-04 08:45 AEST' }
    ]
  };

  const nzServices = {
    cloud: [
      { name: 'Allied Omni', status: 'operational', lastUpdated: '2024-12-04 11:00 NZST' },
      { name: 'Best Health App', status: 'operational', lastUpdated: '2024-12-04 11:00 NZST' }
    ]
  };

  const renderContent = () => {
    if (selectedRegion === 'AU') {
      return (
        <>
          <ServiceGroup title="Cloud Products" services={australianServices.cloud} />
          
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="p-6">
              <h3 className="font-medium mb-3 text-slate-900">Government Services Status</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <a 
                  href="https://www2.medicareaustralia.gov.au/pext/ECLIPSEMonitor/external/eclipse_status.jsp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 transition-colors inline-flex items-center space-x-1"
                >
                  <span>Medicare Online Services</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                
                <a 
                  href="https://medicarestatus.humanservices.gov.au/healthsystemmonitor/external/pbsclaimsstatus.xhtml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 transition-colors inline-flex items-center space-x-1"
                >
                  <span>PBS Claims</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a 
                  href="https://medicarestatus.humanservices.gov.au/healthsystemmonitor/external/pbsauthoritystatus.xhtml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 transition-colors inline-flex items-center space-x-1"
                >
                  <span>PBS Authority</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a 
                  href="https://medicarestatus.humanservices.gov.au/healthsystemmonitor/external/airstatus.xhtml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 transition-colors inline-flex items-center space-x-1"
                >
                  <span>Australian Immunisation Register</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a 
                  href="https://medicarestatus.humanservices.gov.au/healthsystemmonitor/external/dvastatus.xhtml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 transition-colors inline-flex items-center space-x-1"
                >
                  <span>Department of Veterans' Affairs</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <ServiceGroup title="Cloud Products" services={nzServices.cloud} />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl p-8 shadow-sm">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-2 text-slate-900">Best Practice Software</h1>
            <p className="text-slate-600">Current status of services and integrations</p>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-rose-500 mt-1" />
            <div>
              <h5 className="text-rose-900 font-medium mb-1">Active Incident</h5>
              <p className="text-rose-700 text-sm">
                Best Health App is currently experiencing service degradation. Our team is investigating.
              </p>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-lg border border-slate-200 bg-emerald-50 shadow-sm">
            <div className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-900">Most systems operational</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-amber-50 shadow-sm">
            <div className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-amber-900">Service degradation detected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Region Toggle */}
        <RegionToggle 
          selectedRegion={selectedRegion} 
          onToggle={setSelectedRegion}
        />

        {/* Services Content */}
        {renderContent()}

        {/* Past Incidents */}
        <PastIncidents />
      </div>
    </div>
  );
};

export default StatusPage;