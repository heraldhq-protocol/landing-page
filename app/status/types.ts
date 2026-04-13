export interface MonitorStatus {
  id: string;
  name: string;
  url: string;
  currentStatus: 'up' | 'down' | 'degraded';
  uptimePercentage: number;
  averageResponseTime: number;
  lastChecked: string;
  history: Array<{
    timestamp: string;
    status: string;
    responseTime: number;
  }>;
}

export interface SystemStatus {
  overallStatus: 'operational' | 'degraded' | 'major_outage';
  activeIncidents: number;
  monitors: MonitorStatus[];
  lastUpdated: string;
}
