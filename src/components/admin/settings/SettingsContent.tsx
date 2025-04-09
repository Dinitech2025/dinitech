import React, { useState, useEffect, FormEvent } from 'react';

interface Settings {
  appName: string;
  contactEmail: string;
  theme: 'light' | 'dark' | 'system';
}

const SettingsContent: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    appName: 'AuthDemo',
    contactEmail: 'contact@example.com',
    theme: 'light',
  });
  
  const [saveMessage, setSaveMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Erreur lors du chargement des paramètres:', e);
      }
    }
  }, []);
  
  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSettingsSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    try {
      localStorage.setItem('appSettings', JSON.stringify(settings));
      applySettings(settings);
      
      setSaveMessage({
        type: 'success',
        text: 'Paramètres enregistrés avec succès!'
      });
      
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des paramètres:', error);
      setSaveMessage({
        type: 'error',
        text: 'Erreur lors de la sauvegarde des paramètres'
      });
    }
  };
  
  const applySettings = (settings: Settings) => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.title = settings.appName;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h2>
      
      {saveMessage && (
        <div className={`mb-4 p-4 rounded-md ${saveMessage.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>
          {saveMessage.text}
        </div>
      )}
      
      <div className="max-w-xl">
        <form onSubmit={handleSettingsSubmit} className="space-y-6">
          <div>
            <label htmlFor="appName" className="block text-sm font-medium text-gray-700">
              Nom de l'application
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="appName"
                id="appName"
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={settings.appName}
                onChange={handleSettingChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
              Email de contact
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="contactEmail"
                id="contactEmail"
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={settings.contactEmail}
                onChange={handleSettingChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
              Thème
            </label>
            <select
              id="theme"
              name="theme"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={settings.theme}
              onChange={handleSettingChange}
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="system">Système</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsContent; 