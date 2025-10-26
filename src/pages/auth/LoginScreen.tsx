import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const {
    login,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      setError('CPF/Email ou senha incorretos');
    }
  };
  return <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-[#4A90E2] flex items-center justify-center mb-6 mx-auto shadow-lg">
            <span className="text-white text-3xl font-bold">A</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo ao Alfredo
          </h1>
          <p className="text-gray-500 text-lg">Faça login para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium">
              {error}
            </div>}
          <Input label="CPF ou E-mail" type="text" placeholder="Digite seu CPF ou e-mail" value={email} onChange={e => setEmail(e.target.value)} leftIcon={<Mail size={20} className="text-gray-400" />} />
          <Input label="Senha" type={showPassword ? 'text' : 'password'} placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} leftIcon={<Lock size={20} className="text-gray-400" />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>} />
          <div className="text-right">
            <Link to="/forgot-password" className="text-[#4A90E2] font-medium">
              Esqueceu sua senha?
            </Link>
          </div>
          <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
            Entrar
          </Button>
        </form>
        <div className="mt-10 text-center">
          <p className="text-gray-600">
            Primeiro acesso?{' '}
            <Link to="/first-access" className="text-[#4A90E2] font-semibold">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>;
};