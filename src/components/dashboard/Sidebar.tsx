
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  PieChart, 
  BarChart, 
  LineChart, 
  ActivitySquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type ChartType = 'overview' | 'sales' | 'customers' | 'products' | 'performance';

interface SidebarProps {
  className?: string;
  activeChart: ChartType;
  onChartChange: (chart: ChartType) => void;
}

const chartIcons = {
  overview: LayoutDashboard,
  sales: BarChart,
  customers: PieChart,
  products: LineChart,
  performance: ActivitySquare
};

const chartLabels = {
  overview: "Overview Dashboard",
  sales: "Sales Analysis",
  customers: "Customer Insights",
  products: "Product Performance",
  performance: "KPI Metrics"
};

export const Sidebar = ({ className, activeChart, onChartChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "h-screen sticky top-0 flex flex-col glass border-r transition-all duration-300 ease-in-out z-10",
        collapsed ? "w-[72px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-foreground/90 overflow-hidden transition-all duration-300">
            Power BI Hub
          </h2>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 py-8">
        <TooltipProvider delayDuration={0}>
          <nav className="space-y-2 px-2">
            {(Object.keys(chartIcons) as ChartType[]).map((chart) => {
              const Icon = chartIcons[chart];
              return (
                <Tooltip key={chart}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeChart === chart ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 transition-all",
                        activeChart === chart && "bg-primary text-primary-foreground",
                        collapsed && "px-2 justify-center"
                      )}
                      onClick={() => onChartChange(chart)}
                    >
                      <Icon size={20} />
                      {!collapsed && <span>{chartLabels[chart]}</span>}
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {chartLabels[chart]}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
        </TooltipProvider>
      </div>
    </div>
  );
};
