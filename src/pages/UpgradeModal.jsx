import { useState } from 'react';
import { X, Crown, Check, CreditCard, AlertCircle } from 'lucide-react';

const features = [
  'Génération de maquettes 3D par IA',
  'Sauvegarde illimitée des maquettes',
  'Export en fichier 3D',
  'Comparaison avancée (jusqu\'à 4 maquettes)',
  'Tableau de bord complet',
  'Support prioritaire',
];

export default function UpgradeModal({ onClose, onUpgrade }) {
  const [step, setStep] = useState('offer'); // 'offer' | 'payment' | 'success'
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const formatCard = (val) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) =>
    val.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/');

  const handlePay = (e) => {
    e.preventDefault();
    if (card.number.replace(/\s/g, '').length < 16) {
      setError('Numéro de carte invalide.'); return;
    }
    setError('');
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
      setTimeout(() => { onUpgrade(); onClose(); }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-amber-500" />
            <h2 className="font-bold text-gray-800">Pack Pro</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {step === 'offer' && (
          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-gray-800">
                29€ <span className="text-base font-normal text-gray-500">/ mois</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Sans engagement · Annulable à tout moment</p>
            </div>

            <ul className="space-y-2.5 mb-6">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setStep('payment')}
              className="w-full py-3 bg-amber-400 text-white font-bold rounded-xl hover:bg-amber-500 transition-colors flex items-center justify-center gap-2"
            >
              <Crown size={18} /> Souscrire au Pack Pro
            </button>
          </div>
        )}

        {step === 'payment' && (
          <form onSubmit={handlePay} className="p-6 space-y-4">
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              <CreditCard size={16} className="text-primary" />
              Paiement sécurisé
            </p>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm px-3 py-2 rounded-xl">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Titulaire de la carte</label>
              <input
                type="text"
                placeholder="Julie Dupont"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Numéro de carte</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Expiration</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={card.expiry}
                  onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={card.cvv}
                  maxLength={3}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Traitement...
                </>
              ) : (
                'Payer 29€'
              )}
            </button>
            <button type="button" onClick={() => setStep('offer')} className="w-full text-sm text-gray-400 hover:text-gray-600 mt-1">
              Retour
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Bienvenue dans le Pack Pro !</h3>
            <p className="text-sm text-gray-500">Toutes les fonctionnalités Pro sont maintenant accessibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
