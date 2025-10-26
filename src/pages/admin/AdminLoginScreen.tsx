import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
export const AdminLoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const {
    adminLogin,
    isLoading
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    try {
      await adminLogin(email, password);
    } catch (err) {
      setError('Email ou senha incorretos');
    }
  };
  return <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#4A90E2] flex items-center justify-center mb-4 mx-auto">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Alfredo Admin</h1>
          <p className="text-gray-500 mt-2">Acesso administrativo</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>}
          <Input label="E-mail" type="email" placeholder="Digite seu e-mail administrativo" value={email} onChange={e => setEmail(e.target.value)} leftIcon={<Mail size={18} className="text-gray-400" />} />
          <Input label="Senha" type={showPassword ? 'text' : 'password'} placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} leftIcon={<Lock size={18} className="text-gray-400" />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>} />
          <div className="text-right">
            <Link to="/admin/forgot-password" className="text-sm text-[#4A90E2]">
              Esqueceu sua senha?
            </Link>
          </div>
          <Button type="submit" fullWidth isLoading={isLoading}>
            Entrar como Administrador
          </Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Acesso de morador?{' '}
            <Link to="/login" className="text-[#4A90E2] font-medium">
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>
    </div>;
};