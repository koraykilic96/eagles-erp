import { useState, useEffect } from 'react';

interface EmergencyNotification {
  id: string;
  vessel: string;
  module: string;
  status: string;
  count: number;
  description: string;
  priority: 'high' | 'medium' | 'low';
  lastUpdate: string;
}

export const useEmergencyNotification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [notifications, setNotifications] = useState<EmergencyNotification[]>([]);

  // Mock emergency notifications data
  const getEmergencyNotifications = (): EmergencyNotification[] => {
    return [
      {
        id: '1',
        vessel: 'BATTLESHIP',
        module: 'Certificate',
        status: 'Overdue',
        count: 20,
        description: 'Safety Management Certificate expired',
        priority: 'high',
        lastUpdate: '2 hours ago'
      },
      {
        id: '2',
        vessel: 'BATTLESHIP',
        module: 'Deficiency',
        status: 'NC',
        count: 5,
        description: 'Critical non-conformities identified',
        priority: 'high',
        lastUpdate: '4 hours ago'
      },
      {
        id: '3',
        vessel: 'VOYAGER',
        module: 'Certificate',
        status: 'Overdue',
        count: 30,
        description: 'Multiple certificates expired',
        priority: 'high',
        lastUpdate: '45 minutes ago'
      },
      {
        id: '4',
        vessel: 'BLACK PEARL',
        module: 'Maintenance',
        status: 'Overdue',
        count: 10,
        description: 'Engine maintenance overdue',
        priority: 'high',
        lastUpdate: '30 minutes ago'
      }
    ];
  };

  const checkAndShowPopup = () => {
    debugger;
    const emergencyData = getEmergencyNotifications();
    
    // Eğer hiç emergency notification yoksa popup gösterme
    if (emergencyData.length === 0) {
      setIsVisible(false);
      return;
    }

    // Manuel tetikleme için direkt popup göster
    setNotifications(emergencyData);
    setIsVisible(true);
  };

  const checkAutoShowPopup = () => {
    const emergencyData = getEmergencyNotifications();
    
    // Eğer hiç emergency notification yoksa popup gösterme
    if (emergencyData.length === 0) {
      setIsVisible(false);
      return;
    }

    const lastClosedTime = localStorage.getItem('emergencyNotificationLastClosed');
    const currentTime = Date.now();
    
    // İlk giriş veya 1 saat geçmişse popup göster
    if (!lastClosedTime || (currentTime - parseInt(lastClosedTime)) >= 60 * 60 * 1000) {
      setNotifications(emergencyData);
      setIsVisible(true);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Popup'ı kapattığında zamanı kaydet
    localStorage.setItem('emergencyNotificationLastClosed', Date.now().toString());
  };

  useEffect(() => {
    // Sayfa yüklendiğinde popup kontrolü
    checkAutoShowPopup();

    // Her 5 dakikada bir kontrol et (opsiyonel)
    const interval = setInterval(checkAutoShowPopup, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    isVisible,
    notifications,
    handleClose,
    checkAndShowPopup,
    checkAutoShowPopup
  };
}; 