import React from 'react';
import { CheckCircle, AlertCircle, MinusCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

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

const StatusPage = () => {
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

        {/* Australian Services */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-900">Australia</h2>
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
        </div>

        {/* New Zealand Services */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-900">New Zealand</h2>
          <ServiceGroup title="Cloud Products" services={nzServices.cloud} />
        </div>
      </div>
    </div>
  );
};

export default StatusPage;