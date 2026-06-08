import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

function createIcon(score, selected) {
  const color = score >= 80 ? '#ef4444' : score >= 70 ? '#f59e0b' : '#10b981';
  const size = selected ? 44 : 36;
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:${size}px;height:${size}px;
        background:${color};
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
        display:flex;align-items:center;justify-content:center;
        transition:all 0.2s;
      ">
        <span style="transform:rotate(45deg);color:white;font-weight:bold;font-size:${selected ? 12 : 10}px;display:block;margin-top:2px;">
          ${score}
        </span>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

function FlyTo({ terrain }) {
  const map = useMap();
  useEffect(() => {
    if (terrain) {
      map.flyTo([terrain.lat, terrain.lng], 15, { duration: 1 });
    }
  }, [terrain, map]);
  return null;
}

export default function MapView({ terrains, selectedTerrain, onSelect }) {
  const center = [43.7102, 7.2620];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-gray-800 text-base">Carte des Terrains</h2>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Prioritaire
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Moyen
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Potentiel
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {terrains.map((t) => (
            <Marker
              key={t.id}
              position={[t.lat, t.lng]}
              icon={createIcon(t.score, selectedTerrain?.id === t.id)}
              eventHandlers={{ click: () => onSelect(t) }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{t.nom}</p>
                  <p className="text-gray-600">{t.superficie} m²</p>
                  <p className="text-gray-500">{t.quartier}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          {selectedTerrain && <FlyTo terrain={selectedTerrain} />}
        </MapContainer>
      </div>
    </div>
  );
}