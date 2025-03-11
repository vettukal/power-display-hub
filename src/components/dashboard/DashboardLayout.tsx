
import React, { useState } from 'react';
import { Sidebar, ChartType } from './Sidebar';
import { PowerBIEmbed } from './PowerBIEmbed';

export const DashboardLayout = () => {
  const [activeChart, setActiveChart] = useState<ChartType>('overview');

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar 
        activeChart={activeChart} 
        onChartChange={setActiveChart} 
      />
      <main className="flex-1 overflow-auto">
        <PowerBIEmbed 
          chartType={activeChart} 
        />
      </main>
    </div>
  );
};
