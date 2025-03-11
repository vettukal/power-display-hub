
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChartType } from './Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PowerBIEmbedProps {
  chartType: ChartType;
  className?: string;
}

const chartUrls = {
  overview: 'https://app.powerbi.com/reportEmbed?reportId=sample1&autoAuth=true',
  sales: 'https://app.powerbi.com/reportEmbed?reportId=sample2&autoAuth=true',
  customers: 'https://app.powerbi.com/reportEmbed?reportId=sample3&autoAuth=true',
  products: 'https://app.powerbi.com/reportEmbed?reportId=sample4&autoAuth=true',
  performance: 'https://app.powerbi.com/reportEmbed?reportId=sample5&autoAuth=true'
};

const chartTitles = {
  overview: "Dashboard Overview",
  sales: "Sales Analysis",
  customers: "Customer Insights",
  products: "Product Performance",
  performance: "KPI Metrics"
};

const chartDescriptions = {
  overview: "Complete view of all key metrics across the organization",
  sales: "Detailed breakdown of sales data by region, product, and time period",
  customers: "Customer segmentation and behavior analysis",
  products: "In-depth product performance metrics and trends",
  performance: "Key performance indicators and goal tracking"
};

export const PowerBIEmbed = ({ chartType, className }: PowerBIEmbedProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentChart, setCurrentChart] = useState(chartType);
  const [animationState, setAnimationState] = useState<'entering' | 'exiting' | null>(null);

  useEffect(() => {
    if (chartType !== currentChart) {
      // Start exit animation
      setAnimationState('exiting');
      setIsTransitioning(true);
      
      // After exit animation completes, switch to new chart
      const exitTimer = setTimeout(() => {
        setCurrentChart(chartType);
        setAnimationState('entering');
        
        // After entry animation completes, finish transition
        const enterTimer = setTimeout(() => {
          setAnimationState(null);
          setIsTransitioning(false);
        }, 300);
        
        return () => clearTimeout(enterTimer);
      }, 300);
      
      return () => clearTimeout(exitTimer);
    }
  }, [chartType, currentChart]);

  // For demo purposes, we're showing placeholder content instead of actual Power BI embeds
  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <div className="mb-4 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs px-3 py-1 bg-primary/10 text-primary font-medium">
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
          </Badge>
          <h1 className="text-2xl font-semibold text-foreground">{chartTitles[currentChart]}</h1>
        </div>
        <p className="text-muted-foreground">{chartDescriptions[currentChart]}</p>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        <div
          className={cn(
            "chart-container absolute inset-0 p-4",
            animationState
          )}
        >
          {/* In a real implementation, this would be the iframe embedding the Power BI report */}
          <Card className="w-full h-full overflow-hidden shadow-sm border">
            <CardContent className="p-0 h-full flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-xl font-medium mb-2">Power BI Embed - {chartTitles[currentChart]}</h3>
                <p className="text-muted-foreground mb-4">
                  This is a placeholder for the Power BI embedded report.
                </p>
                <p className="text-sm bg-muted p-2 rounded">
                  In a production environment, you would embed your Power BI report here using the Microsoft Power BI 
                  Embedding JavaScript SDK and the appropriate embed URL and token.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
