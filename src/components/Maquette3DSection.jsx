import { useState, useEffect, useRef } from 'react';
import { Wand2, Download, Save, Lock, RotateCcw } from 'lucide-react';
import { projectTypes } from '../data/terrains';

const GENERATION_DURATION = 3000;

export default function Maquette3DSection({ terrain, user, onUpgradeClick }) {
  const [selectedType, setSelectedType] = useState(null);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'loading' | 'result'
  const [progress, setProgress] = useState(0);
  const [resultType, setResultType] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const progressRef = useRef(null);

  const isPro = user?.plan === 'pro';

  // Reset when terrain changes
  useEffect(() => {
    setPhase('idle');
    setResultType(null);
    setSelectedType(null);
    setProgress(0);
  }, [terrain?.id]);

  const handleGenerate = () => {
    if (!isPro) { onUpgradeClick(); return; }
    if (!selectedType || !terrain) return;

    setPhase('loading');
    setProgress(0);

    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / GENERATION_DURATION) * 100, 98);
      setProgress(pct);
    }, 30);

    setTimeout(() => {
      clearInterval(progressRef.current);
      setProgress(100);
      setTimeout(() => {
        setResultType(projectTypes.find((t) => t.id === selectedType));
        setPhase('result');
      }, 300);
    }, GENERATION_DURATION);
  };

  const handleReset = () => {
    setPhase('idle');
    setResultType(null);
    setProgress(0);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  const handleExport = () => {
    const blob = new Blob([`[Maquette 3D - ${terrain?.nom} - ${resultType?.label}]`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${terrain?.nom ?? 'terrain'}-${resultType?.id ?? 'maquette'}.obj`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const canGenerate = isPro && selectedType && terrain && phase !== 'loading';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-800 text-base">Maquette 3D du Projet</h2>
          {terrain && (
            <p className="text-xs text-gray-400 mt-0.5">
              {terrain.nom} — {terrain.superficie.toLocaleString()} m² — {terrain.quartier}
            </p>
          )}
        </div>
        {phase === 'result' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors"
          >
            <RotateCcw size={13} /> Réinitialiser
          </button>
        )}
      </div>

      <div className="p-4">
        {/* ── IMAGE ZONE ── */}
        <div className="relative rounded-xl overflow-hidden mb-4 bg-gray-100" style={{ height: 280 }}>
          {!terrain ? (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Sélectionnez un terrain pour commencer
            </div>
          ) : (
            <>
              {/* Before image (always present as base) */}
              <img
                src={terrain.image}
                alt={terrain.nom}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  phase === 'loading' ? 'blur-sm scale-105 brightness-75' : ''
                } ${phase === 'result' ? 'opacity-0' : 'opacity-100'}`}
              />

              {/* After image — fades in when result */}
              {resultType && (
                <img
                  src={resultType.resultImage}
                  alt={resultType.label}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    phase === 'result' ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}

              {/* Loading overlay */}
              {phase === 'loading' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                  <p className="text-white text-xl font-semibold tracking-widest drop-shadow">
                    Loading{' '}
                    <span className="inline-flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        >
                          .
                        </span>
                      ))}
                    </span>
                  </p>

                  {/* Progress bar */}
                  <div className="w-56 h-2.5 bg-white/30 rounded-full overflow-hidden border border-white/50">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-white/70 text-xs">Génération IA en cours…</p>
                </div>
              )}

              {/* Result label badge */}
              {phase === 'result' && resultType && (
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur rounded-xl px-4 py-2.5 shadow-lg z-10">
                  <p className="text-sm font-bold text-gray-800">{resultType.resultLabel}</p>
                </div>
              )}

              {/* Pro lock overlay */}
              {!isPro && terrain && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2 z-20">
                  <Lock size={28} className="text-white" />
                  <p className="text-white text-sm font-semibold">Fonctionnalité Pro</p>
                  <button
                    onClick={onUpgradeClick}
                    className="mt-1 px-4 py-1.5 bg-amber-400 text-white text-xs font-bold rounded-full hover:bg-amber-500 transition-colors"
                  >
                    Passer au Pro
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── PROJECT TYPE SELECTOR ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {projectTypes.map((type) => {
            const isSelected = selectedType === type.id;
            const disabled = !isPro || phase === 'loading';
            return (
              <button
                key={type.id}
                onClick={() => !disabled && setSelectedType(type.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isSelected && phase !== 'result'
                    ? 'border-primary bg-primary-light text-primary shadow-sm'
                    : disabled
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                    : 'border-gray-200 text-gray-600 hover:border-primary hover:bg-primary-light'
                }`}
              >
                <span>{type.icon}</span>
                <span className="text-xs leading-tight">{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div className="flex gap-2 flex-wrap">
          {phase !== 'result' ? (
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Wand2 size={16} />
              {phase === 'loading' ? 'Génération en cours…' : 'Générer la Maquette 3D'}
            </button>
          ) : (
            <>
              <button
                onClick={handleGenerate}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors"
              >
                <Wand2 size={16} /> Regénérer
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-3 border border-primary text-primary text-sm font-medium rounded-xl hover:bg-primary-light transition-colors disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? 'Sauvegarde…' : saved ? 'Sauvegardé ✓' : 'Sauvegarder'}
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Download size={16} /> Exporter
              </button>
            </>
          )}
        </div>

        {!isPro && (
          <p className="text-xs text-gray-400 mt-3 text-center">
            La génération de maquettes 3D est réservée aux abonnés Pro.{' '}
            <button onClick={onUpgradeClick} className="text-primary underline">
              Passer au Pro
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
