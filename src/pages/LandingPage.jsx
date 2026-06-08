import { useNavigate } from 'react-router-dom';
import { Brain, Calculator, GitCompare, Leaf, ArrowRight, LayoutDashboard } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main style={{
      minHeight: '100vh', background: '#ffffff', color: '#263238',
      display: 'flex', flexDirection: 'column', fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* LOGO - coin haut gauche */}
      <div style={{ padding: '1.25rem 2rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: '#1a7a5e', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>RC</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.01em' }}>
            <span style={{ color: '#1a7a5e' }}>RePlay</span>
            <span style={{ color: '#263238' }}> City</span>
          </span>
        </div>
      </div>

      {/* HERO */}
      <div style={{
        background: 'linear-gradient(135deg, #e8f5f1 0%, #e4f0f7 60%, #f8fbff 100%)',
        flex: 1, display: 'flex', flexDirection: 'column',
      }}>

        {/* Texte centré */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '3rem', paddingBottom: '1rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '540px', padding: '0 1.5rem' }}>

            <h1 style={{
              fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', margin: 0,
            }}>
              <span style={{ color: '#1a7a5e' }}>Transformons les espaces oubliés</span>
              {' '}en lieux d'avenir pour nos enfants.
            </h1>

            <p style={{
              color: '#607D8B', lineHeight: 1.7, marginTop: '1rem',
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
            }}>
              RePlay City utilise l'intelligence artificielle pour concevoir
              des espaces éducatifs, ludiques et durables dans les villes.
            </p>

            {/* CTA - 2 boutons */}
            <div style={{ marginTop: '1.75rem', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/connexion')}
                style={{
                  background: '#1a7a5e', color: '#fff', fontWeight: 700, fontSize: '14px',
                  padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(26,122,94,0.25)',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#155f49'}
                onMouseLeave={e => e.currentTarget.style.background = '#1a7a5e'}
              >
                Se connecter <ArrowRight size={15} />
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  background: 'white', color: '#1a7a5e', fontWeight: 600, fontSize: '14px',
                  padding: '12px 28px', borderRadius: '12px',
                  border: '1.5px solid #1a7a5e', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#e8f5f1'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}
              >
                <LayoutDashboard size={15} /> Accéder au tableau de bord
              </button>
            </div>

            <p style={{ fontSize: '11px', color: '#9BB', marginTop: '10px' }}>
              * Accès direct temporaire - sans connexion requise
            </p>
          </div>
        </div>

        {/* Images before / after */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          marginTop: '0.25rem', overflow: 'hidden', gap: '1.5rem', padding: '0 2rem',
        }}>

          {/* Terrain vacant */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ position: 'relative', width: '90%', maxWidth: '440px', aspectRatio: '1', background: 'transparent' }}>
              <img
                src="/images/vacant.png"
                alt="Terrain vacant"
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'grayscale(100%)', mixBlendMode: 'multiply', display: 'block', opacity: 0.90 }}
              />
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(228,242,247,0.5) 65%, rgba(228,242,247,0.9) 100%)',
              }} />
              <div style={{
                position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(255,255,255,0.88)', borderRadius: '999px', padding: '5px 16px',
                fontSize: '11px', fontWeight: 600, color: '#607D8B', whiteSpace: 'nowrap',
              }}>
                Avant - terrain vacant
              </div>
            </div>
          </div>

          {/* Flèche */}
          <div style={{ flexShrink: 0, alignSelf: 'center', marginBottom: '3.5rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="54" viewBox="0 0 70 54" fill="none">
              <path d="M4 46 C20 46, 30 8, 64 20" stroke="#1a7a5e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M64 20 L54 14 L57 26 Z" fill="#1a7a5e" />
            </svg>
          </div>

          {/* Projet généré */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ position: 'relative', width: '90%', maxWidth: '520px', aspectRatio: '1' }}>
              <img
                src="/images/nouveau.png"
                alt="Projet généré par IA"
                style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)',
                background: '#1a7a5e', borderRadius: '999px', padding: '5px 16px',
                fontSize: '11px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap',
              }}>
                ✦ Après - projet IA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ background: '#f0f4f2', padding: '3rem 0' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem', padding: '0 4rem',
        }}>
          <Feature icon={<Brain size={20} />} title="Conception intelligente" text="L'IA propose des aménagements adaptés à vos besoins et au contexte local." />
          <Feature icon={<Calculator size={20} />} title="Estimation budgétaire" text="Obtenez une estimation des coûts et des équipements nécessaires." />
          <Feature icon={<GitCompare size={20} />} title="Comparaison de projets" text="Comparez plusieurs propositions et choisissez la meilleure option." />
          <Feature icon={<Leaf size={20} />} title="Durable & éducatif" text="Des espaces pensés pour l'apprentissage et la planète." />
        </div>
      </section>

    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '12px',
        background: '#e8f5f1', color: '#1a7a5e',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <h3 style={{ fontWeight: 700, fontSize: '13px', color: '#263238', margin: 0 }}>{title}</h3>
      <p style={{ color: '#607D8B', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  );
}