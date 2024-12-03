import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
  <Card className="mb-6 border-0 shadow-sm">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium text-slate-900">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {services.map((service, index) => (
        <ServiceStatus key={index} {...service} />
      ))}
    </CardContent>
  </Card>
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
            <h1 className="text-3xl font-bold mb-3 text-slate-900">Best Practice Software</h1>
            <h2 className="text-xl font-semibold mb-2 text-slate-700">Bp Premier Status</h2>
            <p className="text-slate-600">Current status of services and integrations</p>
          </div>
        </div>

        {/* Alert Banner */}
        <Alert className="mb-6 border-rose-200 bg-rose-50">
          <AlertCircle className="h-4 w-4 text-rose-500" />
          <AlertTitle className="text-rose-900">Active Incident</AlertTitle>
          <AlertDescription className="text-rose-700">
            Best Health App is currently experiencing service degradation. Our team is investigating.
          </AlertDescription>
        </Alert>

        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="border-0 shadow-sm bg-emerald-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-900">Most systems operational</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-amber-900">Service degradation detected</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Australian Services */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-900">Australia</h2>
          <ServiceGroup title="Cloud Products" services={australianServices.cloud} />
          
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
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
            </CardContent>
          </Card>
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