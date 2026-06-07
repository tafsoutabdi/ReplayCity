import { MapPin, Star, TrendingUp } from 'lucide-react';

export default function StatsBar({ stats }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-around gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <MapPin size={20} className="text-blue-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{stats.terrainsIdentifies}</p>
          <p className="text-xs text-gray-500">Terrains Identifiés</p>
        </div>
      </div>

      <div className="w-px h-10 bg-gray-100" />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
          <Star size={20} className="text-amber-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-amber-500">{stats.sitesPrioritaires}</p>
          <p className="text-xs text-gray-500">Sites Prioritaires</p>
        </div>
      </div>

      <div className="w-px h-10 bg-gray-100" />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
          <TrendingUp size={20} className="text-green-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">{stats.scoreMoyen}</p>
          <p className="text-xs text-gray-500">Score Moyen</p>
        </div>
      </div>
    </div>
  );
}
