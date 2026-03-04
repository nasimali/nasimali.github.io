import { loadConfigData, type ConfigData } from '@/lib/fetchConfig';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface ConfigContextType {
  config: ConfigData | null;
  isLoading: boolean;
  error: Error | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeConfig = async () => {
      try {
        setIsLoading(true);
        const data = await loadConfigData();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error loading config'));
      } finally {
        setIsLoading(false);
      }
    };

    initializeConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, isLoading, error }}>{children}</ConfigContext.Provider>
  );
};

export const useConfigContext = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('useConfigContext must be used within ConfigProvider');
  }

  return context;
};

export const useConfigData = (): ConfigData => {
  const { config } = useConfigContext();

  if (!config) {
    throw new Error('Config data is not loaded yet');
  }

  return config;
};
