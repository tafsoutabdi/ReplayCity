import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AuthPage({ mode, onLogin }) {
  const navigate = useNavigate();
  const isLogin = mode === 'login';
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Adresse email invalide.');
      return;
    }
    if (form.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (!isLogin && form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    onLogin({
      name: form.name || form.email.split('@')[0],
      email: form.email,
      plan: 'freemium',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${form.email}`,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">RC</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isLogin ? 'Accédez à votre espace RePlay City' : 'Rejoignez RePlay City gratuitement'}
          </p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Field label="Nom complet" id="name">
              <input
                id="name"
                type="text"
                placeholder="Julie Dupont"
                value={form.name}
                onChange={update('name')}
                className="input"
              />
            </Field>
          )}

          <Field label="Email *" id="email">
            <input
              id="email"
              type="email"
              placeholder="julie@exemple.fr"
              value={form.email}
              onChange={update('email')}
              className="input"
              required
            />
          </Field>

          <Field label="Mot de passe *" id="password">
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="8 caractères minimum"
                value={form.password}
                onChange={update('password')}
                className="input pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>

          {!isLogin && (
            <Field label="Confirmer le mot de passe *" id="confirm">
              <input
                id="confirm"
                type="password"
                placeholder="Répétez le mot de passe"
                value={form.confirm}
                onChange={update('confirm')}
                className="input"
                required
              />
            </Field>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors mt-2"
          >
            {isLogin ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Pas encore de compte ?" : 'Déjà un compte ?'}{' '}
          <button
            onClick={() => navigate(isLogin ? '/inscription' : '/connexion')}
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? "S'inscrire" : 'Se connecter'}
          </button>
        </p>
      </div>

      <style>{`.input { width:100%; padding:10px 14px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; transition:border-color .15s; } .input:focus { border-color:#1a7a5e; }`}</style>
    </div>
  );
}

function Field({ label, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
