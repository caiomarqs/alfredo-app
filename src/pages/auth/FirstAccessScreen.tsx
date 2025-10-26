import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Home, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
export const FirstAccessScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    apartment: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.cpf) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return false;
    }
    return true;
  };
  const validateStep2 = () => {
    if (!formData.phone || !formData.apartment) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return false;
    }
    return true;
  };
  const validateStep3 = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError('Por favor, defina uma senha');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };
  const handleNextStep = () => {
    setError('');
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    setError('');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (validateStep3()) {
      // Here you would typically send the data to your API
      console.log('Form submitted:', formData);
      navigate('/login');
    }
  };
  return <div className="min-h-screen bg-white p-6">
      <button onClick={() => step === 1 ? navigate('/login') : handlePrevStep()} className="flex items-center text-gray-600 mb-6">
        <ArrowLeft size={20} className="mr-1" />
        <span>Voltar</span>
      </button>
      <div className="max-w-sm mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Primeiro acesso</h1>
          <p className="text-gray-500 mt-2">
            {step === 1 ? 'Informe seus dados pessoais' : step === 2 ? 'Informe seus dados de contato' : 'Crie sua senha de acesso'}
          </p>
        </div>
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map(s => <div key={s} className={`w-1/3 h-1 rounded-full ${s <= step ? 'bg-[#4A90E2]' : 'bg-gray-200'} ${s < 3 ? 'mr-2' : ''}`}></div>)}
        </div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>}
        <form onSubmit={step === 3 ? handleSubmit : handleNextStep}>
          {step === 1 && <div className="space-y-4">
              <Input label="Nome completo *" name="name" placeholder="Digite seu nome completo" value={formData.name} onChange={handleChange} leftIcon={<User size={18} className="text-gray-400" />} />
              <Input label="E-mail *" name="email" type="email" placeholder="Digite seu e-mail" value={formData.email} onChange={handleChange} leftIcon={<Mail size={18} className="text-gray-400" />} />
              <Input label="CPF *" name="cpf" placeholder="Digite seu CPF" value={formData.cpf} onChange={handleChange} leftIcon={<User size={18} className="text-gray-400" />} />
            </div>}
          {step === 2 && <div className="space-y-4">
              <Input label="Telefone *" name="phone" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} leftIcon={<Phone size={18} className="text-gray-400" />} />
              <Input label="Apartamento *" name="apartment" placeholder="Ex: 101 Bloco A" value={formData.apartment} onChange={handleChange} leftIcon={<Home size={18} className="text-gray-400" />} />
            </div>}
          {step === 3 && <div className="space-y-4">
              <Input label="Senha *" name="password" type={showPassword ? 'text' : 'password'} placeholder="Digite sua senha" value={formData.password} onChange={handleChange} leftIcon={<Lock size={18} className="text-gray-400" />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>} />
              <Input label="Confirmar senha *" name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Confirme sua senha" value={formData.confirmPassword} onChange={handleChange} leftIcon={<Lock size={18} className="text-gray-400" />} />
              <p className="text-xs text-gray-500">
                A senha deve ter pelo menos 6 caracteres
              </p>
            </div>}
          <Button type={step === 3 ? 'submit' : 'button'} fullWidth className="mt-6">
            {step === 3 ? 'Finalizar cadastro' : 'Continuar'}
          </Button>
        </form>
        {step === 1 && <div className="mt-8 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-[#4A90E2] font-medium">
                Faça login
              </Link>
            </p>
          </div>}
      </div>
    </div>;
};