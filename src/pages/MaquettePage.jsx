import { useNavigate } from 'react-router-dom';
import ProjetGenerateur from '../components/ProjetGenerateur';

export default function MaquettePage({ user, onUpgradeClick }) {
  const navigate = useNavigate();
  const isPro = user?.plan === 'pro';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Conception libre</h1>
        <p className="text-sm text-gray-500 mt-1">
          Créez un projet sur mesure sans sélectionner un terrain existant
        </p>
      </div>

      {isPro ? (
        <ProjetGenerateur />
      ) : (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          <p className="text-base text-gray-700 font-semibold mb-3">
            La conception est réservée aux abonnés Pro.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Vous pouvez accéder au tableau de bord sans compte, mais la génération de projet est gardée pour les utilisateurs Pro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onUpgradeClick}
              className="px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              Passer au Pack Pro
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Retour au tableau de bord
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
