import { useState } from 'react';
import Maquette3DSection from '../components/Maquette3DSection';
import ProjetGenerateur from '../components/ProjetGenerateur';
import { terrains } from '../data/terrains';
import ScoreBadge from '../components/ScoreBadge';

export default function MaquettePage({ user, onUpgradeClick }) {
  const [selectedTerrain, setSelectedTerrain] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Générateur de Maquettes 3D</h1>
        <p className="text-sm text-gray-500 mt-1">Sélectionnez un terrain et générez votre maquette 3D</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Colonne gauche : choix terrain + générateur de projet */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Choisir un terrain</h3>
            <div className="space-y-2">
              {terrains.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTerrain(t)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedTerrain?.id === t.id
                      ? 'border-primary bg-primary-light'
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm text-gray-800">{t.nom}</span>
                    <ScoreBadge score={t.score} priorite={t.priorite} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t.superficie.toLocaleString()} m²</p>
                </button>
              ))}
            </div>
          </div>

          {/* Générateur de projet IA */}
          <ProjetGenerateur />
        </div>

        {/* Colonne droite : maquette 3D */}
        <div className="lg:col-span-2">
          <Maquette3DSection
            terrain={selectedTerrain}
            user={user}
            onUpgradeClick={onUpgradeClick}
          />
        </div>
      </div>
    </div>
  );
}