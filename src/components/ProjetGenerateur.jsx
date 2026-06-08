import { useState } from 'react';
import { Wand2, RotateCcw, CheckCircle2 } from 'lucide-react';

const STEPS = [
  'Analyse des dimensions du terrain…',
  'Recherche d\'équipements adaptés…',
  'Optimisation de l\'espace…',
  'Création du plan 2D…',
  'Finalisation du projet…',
];

const TYPE_OPTIONS = [
  { id: 'jeux', label: 'Aire de jeux', icon: '🎡' },
  { id: 'jardin', label: 'Jardin pédagogique', icon: '🌱' },
  { id: 'lecture', label: 'Espace lecture', icon: '📚' },
  { id: 'mixte', label: 'Mixte', icon: '✨' },
];

const AGE_OPTIONS = [
  { id: '2-5', label: '2 – 5 ans', icon: '🐣' },
  { id: '6-10', label: '6 – 10 ans', icon: '🧒' },
  { id: '11-15', label: '11 – 15 ans', icon: '🧑' },
  { id: 'tous', label: 'Tous âges', icon: '👨‍👩‍👧' },
];

// ── Logique de génération locale ──────────────────────────────────────────────
const EQUIPEMENTS = {
  jeux: {
    '2-5':   ['2 toboggans sécurisés', '3 balançoires bébé', '1 bac à sable couvert', '2 portiques d\'éveil', '4 bancs parents', '1 aire souple antichoc'],
    '6-10':  ['2 toboggans grand format', '1 structure d\'escalade', '2 tourniquets', '1 mur d\'escalade bas', '4 bancs', '1 zone souple'],
    '11-15': ['1 parcours acrobatique', '2 barres de traction', '1 mur d\'escalade', '1 zone skate mini', '3 bancs', '1 filet de grimpe'],
    'tous':  ['1 structure multi-jeux', '2 toboggans', '1 mur d\'escalade', '2 balançoires', '4 bancs', '1 aire souple', '1 bac à sable'],
  },
  jardin: {
    '2-5':   ['6 carrés potagers surélevés', '1 serre pédagogique', '10 arbustes fruitiers', '3 tables d\'observation', '2 arrosoirs collectifs', '1 composteur éducatif'],
    '6-10':  ['8 carrés potagers', '1 serre pédagogique', '1 rucher pédagogique', '4 tables de travail', '1 composteur', '15 arbres variés'],
    '11-15': ['10 parcelles autonomes', '1 laboratoire extérieur', '1 système d\'irrigation', '1 rucher', '1 composteur', '20 espèces végétales'],
    'tous':  ['8 carrés potagers', '1 serre', '1 rucher pédagogique', '3 tables de travail', '1 composteur', '12 arbres fruitiers', '1 récupérateur d\'eau'],
  },
  lecture: {
    '2-5':   ['4 alcôves de lecture', '2 bibliothèques extérieures', '6 coussins géants', '3 pergolas ombragées', '1 scène de conte', '2 fontaines'],
    '6-10':  ['3 bibliothèques extérieures', '6 bancs-livres', '2 pergolas', '1 scène de lecture', '4 tables basses', '1 mur d\'expression'],
    '11-15': ['2 espaces débat', '4 bibliothèques connectées', '3 tables de travail', '2 pergolas', '1 espace projection', '6 chaises longues'],
    'tous':  ['3 bibliothèques extérieures', '1 scène polyvalente', '6 bancs-livres', '2 pergolas', '4 tables', '1 mur d\'expression', '2 fontaines'],
  },
  mixte: {
    '2-5':   ['1 toboggan', '4 carrés potagers', '2 alcôves de lecture', '3 bancs', '1 bac à sable', '1 bibliothèque extérieure', '5 arbres'],
    '6-10':  ['1 structure de jeux', '4 carrés potagers', '1 bibliothèque extérieure', '2 pergolas', '3 tables', '1 mur d\'escalade', '8 arbres'],
    '11-15': ['1 parcours sportif', '1 espace potager', '2 espaces lecture', '1 mur d\'expression', '3 tables', '1 pergola', '10 arbres'],
    'tous':  ['1 structure multi-jeux', '4 carrés potagers', '2 bibliothèques', '1 scène', '4 bancs', '1 bac à sable', '10 arbres', '2 pergolas'],
  },
};

const PLANS = {
  jeux: {
    '2-5':   [['Entrée', 'Balançoires', 'Toboggan'], ['Bac sable', 'Portiques', 'Espace souple'], ['Bancs', 'Rangements', 'Sortie']],
    '6-10':  [['Entrée', 'Escalade', 'Toboggan'], ['Zone souple', 'Tourniquets', 'Jeux libres'], ['Bancs', 'Rangements', 'Sortie']],
    '11-15': [['Entrée', 'Barres traction', 'Escalade'], ['Skate mini', 'Parcours', 'Filet grimpe'], ['Bancs', 'Rangements', 'Sortie']],
    'tous':  [['Entrée', 'Jeux 2-5 ans', 'Toboggan'], ['Zone souple', 'Multi-jeux', 'Escalade'], ['Bancs', 'Bac sable', 'Sortie']],
  },
  jardin: {
    '2-5':   [['Entrée', 'Serre', 'Observation'], ['Potagers', 'Tables éveil', 'Arrosage'], ['Compost', 'Arbustes', 'Sortie']],
    '6-10':  [['Entrée', 'Serre péda.', 'Rucher'], ['Potagers', 'Tables travail', 'Compost'], ['Irrigation', 'Arbres', 'Sortie']],
    '11-15': [['Entrée', 'Labo extérieur', 'Rucher'], ['Parcelles', 'Irrigation', 'Compost'], ['Stockage', 'Végétaux', 'Sortie']],
    'tous':  [['Entrée', 'Serre', 'Rucher'], ['Potagers', 'Tables', 'Compost'], ['Fruitiers', 'Eau récup.', 'Sortie']],
  },
  lecture: {
    '2-5':   [['Entrée', 'Pergola 1', 'Contes'], ['Alcôves', 'Coussins', 'Bibliothèque'], ['Fontaine', 'Repos', 'Sortie']],
    '6-10':  [['Entrée', 'Bibliothèque', 'Pergola'], ['Bancs-livres', 'Tables', 'Lecture libre'], ['Scène', 'Expression', 'Sortie']],
    '11-15': [['Entrée', 'Espace débat', 'Bibliothèque'], ['Tables travail', 'Projection', 'Lecture'], ['Pergola', 'Chaises', 'Sortie']],
    'tous':  [['Entrée', 'Bibliothèque', 'Scène'], ['Pergola', 'Bancs-livres', 'Tables'], ['Fontaine', 'Expression', 'Sortie']],
  },
  mixte: {
    '2-5':   [['Entrée', 'Jeux', 'Potager'], ['Toboggan', 'Centre', 'Lecture'], ['Bac sable', 'Arbres', 'Sortie']],
    '6-10':  [['Entrée', 'Escalade', 'Potager'], ['Jeux libres', 'Pelouse', 'Bibliothèque'], ['Tables', 'Arbres', 'Sortie']],
    '11-15': [['Entrée', 'Sport', 'Potager'], ['Parcours', 'Scène', 'Lecture'], ['Expression', 'Arbres', 'Sortie']],
    'tous':  [['Entrée', 'Jeux enfants', 'Potager'], ['Toboggan', 'Pelouse', 'Lecture'], ['Bancs', 'Arbres', 'Sortie']],
  },
};

const DESCRIPTIONS = {
  jeux:   'Espace de jeux sécurisé favorisant l\'activité physique et le développement moteur.',
  jardin: 'Jardin pédagogique pour initier les enfants à la nature et aux cycles du vivant.',
  lecture: 'Espace calme et verdoyant dédié à la lecture, l\'expression et la créativité.',
  mixte:  'Espace polyvalent alliant jeux, nature et culture pour tous les enfants.',
};

function genererProjet(form) {
  const surface = parseInt(form.longueur) * parseInt(form.largeur);
  const budget = parseInt(form.budget);
  const surfaceUtilisee = Math.min(98, 78 + Math.floor((surface / 100) % 18));
  // Coût réaliste : entre 70% et 95% du budget
  const ratio = 0.70 + ((surface % 7) * 0.04);
  const coutEstime = Math.round(Math.min(budget * ratio, budget * 0.95) / 100) * 100;

  const equipements = EQUIPEMENTS[form.type]?.[form.age] || EQUIPEMENTS['mixte']['tous'];
  const plan2d = PLANS[form.type]?.[form.age] || PLANS['mixte']['tous'];
  const description = DESCRIPTIONS[form.type] || DESCRIPTIONS['mixte'];

  return { surfaceUtilisee, coutEstime, equipements, plan2d, description };
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjetGenerateur() {
  const [form, setForm] = useState({
    nom: '',
    longueur: '',
    largeur: '',
    budget: '',
    type: '',
    age: '',
  });
  const [phase, setPhase] = useState('idle');
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState(null);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const canGenerate =
    form.longueur && form.largeur && form.budget && form.type && form.age;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setPhase('loading');
    setStepIndex(0);
    setResult(null);

    STEPS.forEach((_, i) => {
      setTimeout(() => setStepIndex(i), i * 700);
    });

    setTimeout(() => {
      const generated = genererProjet(form);
      setResult({ ...generated, nom: form.nom || 'Projet RePlay City', type: form.type, age: form.age });
      setPhase('result');
    }, STEPS.length * 700 + 300);
  };

  const handleReset = () => {
    setPhase('idle');
    setResult(null);
    setStepIndex(0);
  };

  return (
    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '15px', color: '#1a1a1a', margin: 0 }}>Création d'un projet</h2>
          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>Renseignez les informations pour générer votre plan IA</p>
        </div>
        {phase !== 'idle' && (
          <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}>
            <RotateCcw size={13} /> Recommencer
          </button>
        )}
      </div>

      <div style={{ padding: '1.25rem' }}>

        {/* ── PHASE IDLE / FORM ── */}
        {phase === 'idle' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Étape 1 */}
            <div>
              <SectionLabel num="1" label="Informations terrain" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FieldLabel>Nom du projet</FieldLabel>
                  <input
                    type="text"
                    placeholder="Ex: Jardin des Musiciens"
                    value={form.nom}
                    onChange={e => set('nom', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <FieldLabel>Longueur (m)</FieldLabel>
                  <input type="number" placeholder="30" value={form.longueur} onChange={e => set('longueur', e.target.value)} style={inputStyle} min="1" />
                </div>
                <div>
                  <FieldLabel>Largeur (m)</FieldLabel>
                  <input type="number" placeholder="20" value={form.largeur} onChange={e => set('largeur', e.target.value)} style={inputStyle} min="1" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FieldLabel>Budget estimatif (€)</FieldLabel>
                  <input type="number" placeholder="20000" value={form.budget} onChange={e => set('budget', e.target.value)} style={inputStyle} min="0" />
                </div>
              </div>
            </div>

            {/* Étape 2 */}
            <div>
              <SectionLabel num="2" label="Type de projet" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                {TYPE_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => set('type', opt.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: `1.5px solid ${form.type === opt.id ? '#1a7a5e' : '#e5e7eb'}`,
                      background: form.type === opt.id ? '#e8f5f1' : '#fafafa',
                      color: form.type === opt.id ? '#1a7a5e' : '#374151',
                      fontWeight: form.type === opt.id ? 600 : 400,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span>{opt.icon}</span> {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Étape 3 */}
            <div>
              <SectionLabel num="3" label="Tranche d'âge des enfants" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                {AGE_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => set('age', opt.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: `1.5px solid ${form.age === opt.id ? '#1a7a5e' : '#e5e7eb'}`,
                      background: form.age === opt.id ? '#e8f5f1' : '#fafafa',
                      color: form.age === opt.id ? '#1a7a5e' : '#374151',
                      fontWeight: form.age === opt.id ? 600 : 400,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span>{opt.icon}</span> {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              style={{
                width: '100%', padding: '13px',
                background: canGenerate ? '#1a7a5e' : '#d1d5db',
                color: '#fff', fontWeight: 700, fontSize: '14px',
                borderRadius: '12px', border: 'none',
                cursor: canGenerate ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'background 0.2s',
                boxShadow: canGenerate ? '0 4px 14px rgba(26,122,94,0.2)' : 'none',
              }}
            >
              <Wand2 size={16} /> Générer le projet
            </button>
          </div>
        )}

        {/* ── PHASE LOADING ── */}
        {phase === 'loading' && (
          <div style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            {/* Spinner */}
            <div style={{ position: 'relative', width: '64px', height: '64px' }}>
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                border: '3px solid #e8f5f1',
                borderTopColor: '#1a7a5e',
                animation: 'spin 0.9s linear infinite',
              }} />
              <div style={{
                position: 'absolute', inset: '10px',
                borderRadius: '50%',
                border: '2px solid #e8f5f1',
                borderBottomColor: '#f59e0b',
                animation: 'spin 1.4s linear infinite reverse',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px',
              }}>✦</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: '15px', color: '#1a1a1a', margin: 0 }}>Génération IA</p>
              <p style={{ fontSize: '13px', color: '#1a7a5e', marginTop: '6px', fontWeight: 500 }}>
                {STEPS[stepIndex]}
              </p>
            </div>

            {/* Steps list */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {STEPS.map((step, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 12px', borderRadius: '8px',
                  background: i === stepIndex ? '#e8f5f1' : i < stepIndex ? '#f9fafb' : 'transparent',
                  transition: 'background 0.3s',
                }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    background: i < stepIndex ? '#1a7a5e' : i === stepIndex ? '#e8f5f1' : '#f3f4f6',
                    border: i === stepIndex ? '2px solid #1a7a5e' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {i < stepIndex ? <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>
                      : i === stepIndex ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a7a5e', animation: 'pulse 1s ease-in-out infinite' }} />
                      : null}
                    <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }`}</style>
                  </div>
                  <span style={{ fontSize: '12px', color: i <= stepIndex ? '#374151' : '#9ca3af', fontWeight: i === stepIndex ? 500 : 400 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PHASE RESULT ── */}
        {phase === 'result' && result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Title */}
            <div style={{ padding: '10px 14px', background: '#e8f5f1', borderRadius: '10px', borderLeft: '3px solid #1a7a5e' }}>
              <p style={{ fontWeight: 700, fontSize: '14px', color: '#1a7a5e', margin: 0 }}>{result.nom}</p>
              <p style={{ fontSize: '12px', color: '#607D8B', marginTop: '3px' }}>{result.description}</p>
            </div>

            {/* Split: Plan 2D + Infos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

              {/* Plan 2D */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                  <p style={{ fontWeight: 600, fontSize: '12px', color: '#374151', margin: 0 }}>📐 Plan 2D</p>
                </div>
                <div style={{ padding: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: '4px', height: '180px' }}>
                    {result.plan2d?.map((row, ri) => (
                      <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                        {row.map((cell, ci) => (
                          <div key={ci} style={{
                            background: CELL_COLORS[(ri * 3 + ci) % CELL_COLORS.length],
                            borderRadius: '6px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '4px 2px',
                            fontSize: '9px', fontWeight: 600, color: '#fff',
                            textAlign: 'center', lineHeight: 1.2,
                          }}>
                            {cell}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                    <span style={{ fontSize: '10px', color: '#9ca3af', background: '#f9fafb', padding: '3px 10px', borderRadius: '999px' }}>
                      {form.longueur}m × {form.largeur}m
                    </span>
                  </div>
                </div>
              </div>

              {/* Infos */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Métriques */}
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px' }}>
                  <Metric label="Surface utilisée" value={`${result.surfaceUtilisee} %`} color="#1a7a5e" />
                  <div style={{ height: '1px', background: '#f0f0f0', margin: '8px 0' }} />
                  <Metric label="Coût estimé" value={`${result.coutEstime?.toLocaleString('fr-FR')} €`} color="#f59e0b" />
                </div>

                {/* Équipements */}
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px', flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '12px', color: '#374151', margin: '0 0 8px 0' }}>Équipements</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {result.equipements?.map((eq, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <CheckCircle2 size={13} color="#1a7a5e" />
                        <span style={{ fontSize: '11px', color: '#4b5563' }}>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Nouveau projet */}
            <button
              onClick={handleReset}
              style={{
                width: '100%', padding: '11px',
                background: 'white', color: '#1a7a5e',
                fontWeight: 600, fontSize: '13px',
                borderRadius: '12px', border: '1.5px solid #1a7a5e',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '7px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e8f5f1'}
              onMouseLeave={e => e.currentTarget.style.background = 'white'}
            >
              <RotateCcw size={14} /> Créer un nouveau projet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Helpers ──

const CELL_COLORS = ['#1a7a5e', '#2d9e7a', '#3db88c', '#f59e0b', '#e07b00', '#4caf86', '#155f49', '#6dbf9b', '#f7c25e'];

const inputStyle = {
  width: '100%', padding: '9px 12px',
  borderRadius: '10px', border: '1.5px solid #e5e7eb',
  fontSize: '13px', color: '#1a1a1a',
  outline: 'none', boxSizing: 'border-box',
  background: '#fafafa',
  transition: 'border-color 0.15s',
};

function SectionLabel({ num, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#1a7a5e', color: '#fff', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {num}
      </div>
      <span style={{ fontWeight: 600, fontSize: '13px', color: '#374151' }}>{label}</span>
    </div>
  );
}

function FieldLabel({ children }) {
  return <p style={{ fontSize: '11px', fontWeight: 500, color: '#6b7280', marginBottom: '5px' }}>{children}</p>;
}

function Metric({ label, value, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '11px', color: '#6b7280' }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: '14px', color }}>{value}</span>
    </div>
  );
}