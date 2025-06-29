import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getConsentCookie } from '@/lib/cookieConsentManager.ts';

interface ConsentBannerProps {
  onAccept: () => void;
  onReject: () => void;
}

const ConsentBanner: React.FC<ConsentBannerProps> = ({ onAccept, onReject }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showConsentBanner = getConsentCookie() === undefined;
    if (showConsentBanner) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ga-consent', 'true');
    setVisible(false);
    onAccept();
  };

  const handleReject = () => {
    localStorage.setItem('ga-consent', 'false');
    setVisible(false);
    onReject();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full px-4">
      <Card className="bg-gray-100 dark:bg-zinc-900 text-foreground shadow-xl border-none rounded-none w-full">
        <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-6 w-full max-w-screen-xl mx-auto">
          <span className="text-sm text-center sm:text-left">
            This site uses cookies for basic analytics. You can accept or reject tracking.
          </span>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button
              size="sm"
              className="bg-red-600 text-white hover:bg-red-700 shadow-md cursor-pointer"
              onClick={handleReject}
            >
              Reject
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-md cursor-pointer"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentBanner;
