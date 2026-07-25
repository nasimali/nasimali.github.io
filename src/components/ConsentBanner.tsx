import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getConsentCookie } from '@/lib/cookieConsentManager';

interface ConsentBannerProps {
  onAccept: () => void;
  onReject: () => void;
}

const ConsentBanner = ({ onAccept, onReject }: ConsentBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(getConsentCookie() === undefined);
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleAccept = () => {
    setIsVisible(false);
    onAccept();
  };

  const handleReject = () => {
    setIsVisible(false);
    onReject();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <Card className="term-window mx-auto w-full max-w-3xl rounded-lg bg-background/95 py-0 backdrop-blur-xl">
        <CardContent className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            <span className="text-term-amber">$ cookies</span> — privacy-friendly analytics only.
            Allow tracking?
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-xs"
              onClick={handleReject}
            >
              [n] reject
            </Button>
            <Button size="sm" className="font-mono text-xs" onClick={handleAccept}>
              [y] accept
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentBanner;
