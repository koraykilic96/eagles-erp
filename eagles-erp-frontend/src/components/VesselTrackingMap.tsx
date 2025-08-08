import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom vessel icon
const vesselIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTQgMTJIMjJMMTQgMjJIMTBMOCAyMkwyIDEySDhMMTIgMloiIGZpbGw9IiMzYjgyZjYiLz4KPC9zdmc+',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

interface Vessel {
  id: string;
  name: string;
  type: string;
  status: string;
  position: [number, number];
  speed: number;
  course: number;
  destination: string;
  destinationCoords: [number, number];
}

const vesselData: Vessel[] = [
  {
    id: '1',
    name: 'BATTLESHIP',
    type: 'Cargo',
    status: 'Active',
    position: [41.0082, 28.9784], // Istanbul
    speed: 12.5,
    course: 320, // Istanbul'dan Rotterdam'a (Kuzeybatı - gerçek rota)
    destination: 'Rotterdam',
    destinationCoords: [51.9225, 4.4792] // Rotterdam, Netherlands
  },
  {
    id: '2',
    name: 'VOYAGER',
    type: 'Tanker',
    status: 'Active',
    position: [40.7128, -74.0060], // New York
    speed: 8.2,
    course: 280, // New York'dan Singapore'a (Batı - Panama Kanalı üzerinden)
    destination: 'Singapore',
    destinationCoords: [1.3521, 103.8198] // Singapore
  },
  {
    id: '3',
    name: 'BLACK PEARL',
    type: 'Cargo',
    status: 'Active',
    position: [51.5074, -0.1278], // London
    speed: 15.3,
    course: 165, // London'dan Cape Town'a (Güney - Atlantik rotası)
    destination: 'Cape Town',
    destinationCoords: [-33.9249, 18.4241] // Cape Town, South Africa
  },
  {
    id: '4',
    name: 'TITANIC',
    type: 'Passenger',
    status: 'Inactive',
    position: [35.6762, 139.6503], // Tokyo
    speed: 0,
    course: 0,
    destination: 'Docked',
    destinationCoords: [35.6762, 139.6503] // Tokyo (docked)
  },
  {
    id: '5',
    name: 'EAGLES',
    type: 'Cargo',
    status: 'Active',
    position: [22.3193, 114.1694], // Hong Kong
    speed: 10.8,
    course: 75, // Hong Kong'dan Los Angeles'a (Doğu - Pasifik rotası)
    destination: 'Los Angeles',
    destinationCoords: [34.0522, -118.2437] // Los Angeles, USA
  }
];

const VesselTrackingMap: React.FC = () => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[30, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vesselData.map((vessel) => (
          <Marker
            key={vessel.id}
            position={vessel.position}
            icon={vesselIcon}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#374151' }}>{vessel.name}</h3>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  <p style={{ margin: '4px 0' }}><strong>Type:</strong> {vessel.type}</p>
                  <p style={{ margin: '4px 0' }}><strong>Status:</strong> 
                    <span style={{ 
                      color: vessel.status === 'Active' ? '#34d399' : '#f87171',
                      fontWeight: 'bold'
                    }}> {vessel.status}</span>
                  </p>
                                     <p style={{ margin: '4px 0' }}><strong>Speed:</strong> {vessel.speed} knots</p>
                   <p style={{ margin: '4px 0' }}><strong>Course:</strong> {vessel.course}°</p>
                   <p style={{ margin: '4px 0' }}><strong>Destination:</strong> {vessel.destination}</p>
                   <p style={{ margin: '4px 0', fontSize: '10px', opacity: 0.7 }}>
                     <strong>Dest. Coords:</strong> {vessel.destinationCoords[0].toFixed(4)}, {vessel.destinationCoords[1].toFixed(4)}
                   </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VesselTrackingMap; 