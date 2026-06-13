import ProjetGenerateur from '../components/ProjetGenerateur';

export default function MaquettePage({ user, onUpgradeClick }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Conception libre</h1>
        <p className="text-sm text-gray-500 mt-1">
          Créez un projet sur mesure sans sélectionner un terrain existant
        </p>
      </div>
      <ProjetGenerateur />
    </div>
  );
}