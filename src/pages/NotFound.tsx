
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass p-8 rounded-lg shadow-sm max-w-md w-full animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-center">404</h1>
        <p className="text-xl text-muted-foreground mb-6 text-center">Page not found</p>
        <div className="flex justify-center">
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium transition-colors hover:bg-primary/90"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
