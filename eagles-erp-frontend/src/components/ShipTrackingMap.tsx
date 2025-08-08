import React, { useState } from 'react';
import { Card } from 'antd';

// Mock ship data
const ships = [
  {
    id: 1,
    name: "Eagles Cargo 1",
    coordinates: [28.9784, 41.0082], // Istanbul
    status: "active",
    cargo: "Electronics"
  },
  {
    id: 2,
    name: "Eagles Cargo 2", 
    coordinates: [23.7275, 37.9838], // Athens
    status: "active",
    cargo: "Textiles"
  },
  {
    id: 3,
    name: "Eagles Cargo 3",
    coordinates: [12.4964, 41.9028], // Rome
    status: "maintenance",
    cargo: "Machinery"
  },
  {
    id: 4,
    name: "Eagles Cargo 4",
    coordinates: [2.3522, 48.8566], // Paris
    status: "active", 
    cargo: "Food Products"
  },
  {
    id: 5,
    name: "Eagles Cargo 5",
    coordinates: [-0.1276, 51.5074], // London
    status: "active",
    cargo: "Chemicals"
  },
  {
    id: 6,
    name: "Eagles Cargo 6",
    coordinates: [13.4050, 52.5200], // Berlin
    status: "maintenance",
    cargo: "Automotive"
  },
  {
    id: 7,
    name: "Eagles Cargo 7",
    coordinates: [4.9041, 52.3676], // Amsterdam
    status: "active",
    cargo: "Pharmaceuticals"
  },
  {
    id: 8,
    name: "Eagles Cargo 8",
    coordinates: [16.3738, 48.2082], // Vienna
    status: "active",
    cargo: "Construction Materials"
  }
];

const ShipTrackingMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getShipColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#52c41a';
      case 'maintenance':
        return '#faad14';
      case 'inactive':
        return '#ff4d4f';
      default:
        return '#1890ff';
    }
  };

  const handleMouseMove = (event: React.MouseEvent, ship: typeof ships[0]) => {
    setTooltipContent(`
      <div>
        <strong>${ship.name}</strong><br/>
        Durum: ${ship.status === 'active' ? 'Aktif' : ship.status === 'maintenance' ? 'Bakımda' : 'Pasif'}<br/>
        Kargo: ${ship.cargo}
      </div>
    `);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  // Convert coordinates to SVG positions
  const getShipPosition = (coordinates: number[]) => {
    const [lng, lat] = coordinates;
    // Convert longitude and latitude to SVG coordinates
    const x = ((lng + 180) / 360) * 1000;
    const y = ((90 - lat) / 180) * 500;
    return { x, y };
  };

  return (
    <Card 
      title="Gemi Takip Haritası" 
      style={{ height: 400 }}
      extra={
        <div style={{ fontSize: '12px', color: '#666' }}>
          Toplam {ships.length} gemi aktif
        </div>
      }
    >
      <div style={{ 
        position: 'relative', 
        height: 320,
        background: '#e6f7ff',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 500"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Real World Map */}
          {/* Background */}
          <rect x="0" y="0" width="1000" height="500" fill="#e6f7ff" />
          
          {/* North America */}
          <path d="M 100 100 L 120 90 L 140 95 L 160 85 L 180 90 L 200 80 L 220 85 L 240 75 L 260 80 L 280 70 L 300 75 L 320 65 L 340 70 L 360 60 L 380 65 L 400 55 L 420 60 L 440 50 L 460 55 L 480 45 L 500 50 L 520 40 L 540 45 L 560 35 L 580 40 L 600 30 L 620 35 L 640 25 L 660 30 L 680 20 L 700 25 L 720 15 L 740 20 L 760 10 L 780 15 L 800 5 L 820 10 L 840 0 L 860 5 L 880 0 L 900 5 L 920 0 L 940 5 L 960 0 L 980 5 L 1000 0 L 1000 180 L 100 180 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          
          {/* South America */}
          <path d="M 320 180 L 340 200 L 360 220 L 380 240 L 400 260 L 420 280 L 440 300 L 460 320 L 480 340 L 500 360 L 520 380 L 540 400 L 560 420 L 580 440 L 600 460 L 620 480 L 640 500 L 640 450 L 620 430 L 600 410 L 580 390 L 560 370 L 540 350 L 520 330 L 500 310 L 480 290 L 460 270 L 440 250 L 420 230 L 400 210 L 380 190 L 360 170 L 340 150 L 320 130 L 320 180 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          
          {/* Europe */}
          <path d="M 470 130 L 490 125 L 510 130 L 530 125 L 550 130 L 570 125 L 590 130 L 610 125 L 630 130 L 650 125 L 670 130 L 690 125 L 710 130 L 730 125 L 750 130 L 770 125 L 790 130 L 810 125 L 830 130 L 850 125 L 870 130 L 890 125 L 910 130 L 930 125 L 950 130 L 970 125 L 990 130 L 990 180 L 470 180 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          
          {/* Africa */}
          <path d="M 500 180 L 520 200 L 540 220 L 560 240 L 580 260 L 600 280 L 620 300 L 640 320 L 660 340 L 680 360 L 700 380 L 720 400 L 740 420 L 760 440 L 780 460 L 800 480 L 820 500 L 820 450 L 800 430 L 780 410 L 760 390 L 740 370 L 720 350 L 700 330 L 680 310 L 660 290 L 640 270 L 620 250 L 600 230 L 580 210 L 560 190 L 540 170 L 520 150 L 500 130 L 500 180 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          
          {/* Asia */}
          <path d="M 620 130 L 670 120 L 720 130 L 770 120 L 820 130 L 870 120 L 920 130 L 970 120 L 1000 130 L 1000 330 L 620 330 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          
          {/* Australia */}
          <path d="M 770 330 L 800 340 L 830 330 L 860 340 L 890 330 L 920 340 L 950 330 L 980 340 L 1000 330 L 1000 390 L 770 390 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          
          {/* Major Islands */}
          <path d="M 220 230 L 240 225 L 260 230 L 280 225 L 300 230 L 320 225 L 340 230 L 360 225 L 380 230 L 380 250 L 220 250 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          <path d="M 870 180 L 890 175 L 910 180 L 930 175 L 950 180 L 970 175 L 990 180 L 1000 175 L 1000 200 L 870 200 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          
          {/* Greenland */}
          <path d="M 300 50 L 320 45 L 340 50 L 360 45 L 380 50 L 400 45 L 420 50 L 440 45 L 460 50 L 480 45 L 500 50 L 520 45 L 540 50 L 560 45 L 580 50 L 600 45 L 620 50 L 640 45 L 660 50 L 680 45 L 700 50 L 720 45 L 740 50 L 760 45 L 780 50 L 800 45 L 820 50 L 840 45 L 860 50 L 880 45 L 900 50 L 920 45 L 940 50 L 960 45 L 980 50 L 1000 45 L 1000 100 L 300 100 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          
          {/* Antarctica */}
          <path d="M 100 450 L 200 440 L 300 450 L 400 440 L 500 450 L 600 440 L 700 450 L 800 440 L 900 450 L 1000 440 L 1000 500 L 100 500 Z" fill="#d4edda" stroke="#28a745" strokeWidth="1"/>
          
          {/* Ship markers */}
          {ships.map((ship) => {
            const position = getShipPosition(ship.coordinates);
            return (
              <g key={ship.id}>
                {/* Ship pulse effect for active ships */}
                {ship.status === 'active' && (
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r="8"
                    fill={getShipColor(ship.status)}
                    opacity="0.3"
                    style={{ animation: 'pulse 2s infinite' }}
                  />
                )}
                {/* Main ship marker */}
                <circle
                  cx={position.x}
                  cy={position.y}
                  r="4"
                  fill={getShipColor(ship.status)}
                  stroke="white"
                  strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  onMouseMove={(event) => handleMouseMove(event, ship)}
                  onMouseLeave={handleMouseLeave}
                />
              </g>
            );
          })}
        </svg>

        {/* Custom Tooltip */}
        {tooltipVisible && (
          <div
            style={{
              position: 'fixed',
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y - 10,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              zIndex: 1000,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            dangerouslySetInnerHTML={{ __html: tooltipContent }}
          />
        )}
      </div>

      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        marginTop: '10px',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: '#52c41a' 
          }} />
          <span>Aktif</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: '#faad14' 
          }} />
          <span>Bakımda</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: '#ff4d4f' 
          }} />
          <span>Pasif</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }
      `}</style>
    </Card>
  );
};

export default ShipTrackingMap; 