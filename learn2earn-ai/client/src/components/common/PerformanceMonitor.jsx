import { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Only run in development
    if (import.meta.env.DEV) {
      const measurePerformance = () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        const metrics = {
          domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
          loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
          firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
          firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
          memory: performance.memory ? {
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
          } : null
        };

        setMetrics(metrics);
        console.log('Performance Metrics:', metrics);
      };

      // Measure after page load
      if (document.readyState === 'complete') {
        measurePerformance();
      } else {
        window.addEventListener('load', measurePerformance);
      }

      return () => {
        window.removeEventListener('load', measurePerformance);
      };
    }
  }, []);

  // Only show in development
  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white text-xs p-2 rounded max-w-xs">
      <div className="font-bold mb-1">Performance</div>
      <div>DOM Load: {metrics.domContentLoaded?.toFixed(0)}ms</div>
      <div>Page Load: {metrics.loadComplete?.toFixed(0)}ms</div>
      <div>First Paint: {metrics.firstPaint?.toFixed(0)}ms</div>
      <div>FCP: {metrics.firstContentfulPaint?.toFixed(0)}ms</div>
      {metrics.memory && (
        <div>Memory: {metrics.memory.used}MB / {metrics.memory.total}MB</div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
