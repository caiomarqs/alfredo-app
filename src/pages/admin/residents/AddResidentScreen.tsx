import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Home, Phone, Mail, Image, Upload, Users, Car, FileText, Key, Check, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}
export const AddResidentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    cpf: '',
    email: '',
    phone: '',
    birthDate: '',
    profileImage: null,
    // Apartment
    apartmentNumber: '',
    block: '',
    floor: '',
    residentType: 'owner',
    moveInDate: '',
    // Emergency Contacts
    emergencyContacts: [{
      name: '',
      relationship: '',
      phone: ''
    }],
    familyMembers: [{
      name: '',
      relationship: '',
      birthDate: '',
      cpf: ''
    }],
    // Vehicle
    vehicles: [{
      model: '',
      plate: '',
      color: '',
      type: 'car',
      parkingSpot: ''
    }],
    // Documents
    documents: {
      idDocument: null,
      leaseAgreement: null,
      incomeProof: null
    },
    // Access
    accessAreas: {
      pool: true,
      gym: true,
      partyRoom: true,
      bbqArea: true,
      playground: true
    },
    visitorPolicy: 'standard',
    maxVisitors: 5,
    accessCard: '',
    parkingRemote: false
  });
  const steps: Step[] = [{
    id: 1,
    title: 'Informações Pessoais',
    description: 'Dados básicos do morador',
    icon: User
  }, {
    id: 2,
    title: 'Apartamento',
    description: 'Unidade e tipo de ocupação',
    icon: Home
  }, {
    id: 3,
    title: 'Contatos e Família',
    description: 'Contatos de emergência e membros da família',
    icon: Users
  }, {
    id: 4,
    title: 'Veículos',
    description: 'Registro de veículos e vagas',
    icon: Car
  }, {
    id: 5,
    title: 'Documentos',
    description: 'Upload de documentos necessários',
    icon: FileText
  }, {
    id: 6,
    title: 'Acesso',
    description: 'Permissões e configurações de acesso',
    icon: Key
  }];
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to the backend
    console.log('Form submitted with data:', formData);
    // Redirect to the residents list with a success message
    navigate('/admin/residents', {
      state: {
        success: true
      }
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleEmergencyContactChange = (index: number, field: string, value: string) => {
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: value
    };
    setFormData({
      ...formData,
      emergencyContacts: updatedContacts
    });
  };
  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [...formData.emergencyContacts, {
        name: '',
        relationship: '',
        phone: ''
      }]
    });
  };
  const removeEmergencyContact = (index: number) => {
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts.splice(index, 1);
    setFormData({
      ...formData,
      emergencyContacts: updatedContacts
    });
  };
  const handleFamilyMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.familyMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    setFormData({
      ...formData,
      familyMembers: updatedMembers
    });
  };
  const addFamilyMember = () => {
    setFormData({
      ...formData,
      familyMembers: [...formData.familyMembers, {
        name: '',
        relationship: '',
        birthDate: '',
        cpf: ''
      }]
    });
  };
  const removeFamilyMember = (index: number) => {
    const updatedMembers = [...formData.familyMembers];
    updatedMembers.splice(index, 1);
    setFormData({
      ...formData,
      familyMembers: updatedMembers
    });
  };
  const handleVehicleChange = (index: number, field: string, value: string) => {
    const updatedVehicles = [...formData.vehicles];
    updatedVehicles[index] = {
      ...updatedVehicles[index],
      [field]: value
    };
    setFormData({
      ...formData,
      vehicles: updatedVehicles
    });
  };
  const addVehicle = () => {
    setFormData({
      ...formData,
      vehicles: [...formData.vehicles, {
        model: '',
        plate: '',
        color: '',
        type: 'car',
        parkingSpot: ''
      }]
    });
  };
  const removeVehicle = (index: number) => {
    const updatedVehicles = [...formData.vehicles];
    updatedVehicles.splice(index, 1);
    setFormData({
      ...formData,
      vehicles: updatedVehicles
    });
  };
  const handleAccessAreaChange = (area: string, checked: boolean) => {
    setFormData({
      ...formData,
      accessAreas: {
        ...formData.accessAreas,
        [area]: checked
      }
    });
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nome Completo *" name="name" value={formData.name} onChange={handleInputChange} placeholder="Digite o nome completo" />
              <Input label="CPF *" name="cpf" value={formData.cpf} onChange={handleInputChange} placeholder="000.000.000-00" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="E-mail *" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="email@exemplo.com" leftIcon={<Mail size={18} className="text-gray-400" />} />
              <Input label="Telefone *" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(00) 00000-0000" leftIcon={<Phone size={18} className="text-gray-400" />} />
            </div>
            <Input label="Data de Nascimento" name="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto do Perfil
              </label>
              <div className="mt-1 flex items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <User size={32} className="text-gray-400" />
                </div>
                <Button variant="outline" size="sm" className="ml-5" leftIcon={<Upload size={16} />}>
                  Carregar foto
                </Button>
              </div>
            </div>
          </div>;
      case 2:
        return <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input label="Número do Apartamento *" name="apartmentNumber" value={formData.apartmentNumber} onChange={handleInputChange} placeholder="Ex: 302" leftIcon={<Home size={18} className="text-gray-400" />} />
              <Input label="Bloco" name="block" value={formData.block} onChange={handleInputChange} placeholder="Ex: A" />
              <Input label="Andar" name="floor" value={formData.floor} onChange={handleInputChange} placeholder="Ex: 3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Ocupação *
              </label>
              <div className="mt-1">
                <select name="residentType" value={formData.residentType} onChange={handleInputChange} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                  <option value="owner">Proprietário</option>
                  <option value="tenant">Inquilino</option>
                  <option value="family">Familiar</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>
            <Input label="Data de Mudança *" name="moveInDate" type="date" value={formData.moveInDate} onChange={handleInputChange} />
            {formData.residentType === 'tenant' && <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Para inquilinos, é necessário anexar o
                  contrato de locação na etapa de documentos.
                </p>
              </div>}
          </div>;
      case 3:
        return <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contatos de Emergência
                </label>
                <Button size="sm" variant="outline" onClick={addEmergencyContact}>
                  Adicionar Contato
                </Button>
              </div>
              <div className="space-y-4">
                {formData.emergencyContacts.map((contact, index) => <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sm font-medium">
                        Contato de Emergência {index + 1}
                      </h3>
                      {formData.emergencyContacts.length > 1 && <button onClick={() => removeEmergencyContact(index)} className="text-red-500 hover:text-red-700">
                          <X size={18} />
                        </button>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input label="Nome" value={contact.name} onChange={e => handleEmergencyContactChange(index, 'name', e.target.value)} placeholder="Nome completo" />
                      <Input label="Parentesco/Relação" value={contact.relationship} onChange={e => handleEmergencyContactChange(index, 'relationship', e.target.value)} placeholder="Ex: Cônjuge, Filho, Amigo" />
                      <Input label="Telefone" value={contact.phone} onChange={e => handleEmergencyContactChange(index, 'phone', e.target.value)} placeholder="(00) 00000-0000" leftIcon={<Phone size={18} className="text-gray-400" />} />
                    </div>
                  </Card>)}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Membros da Família
                </label>
                <Button size="sm" variant="outline" onClick={addFamilyMember}>
                  Adicionar Membro
                </Button>
              </div>
              <div className="space-y-4">
                {formData.familyMembers.map((member, index) => <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sm font-medium">
                        Membro da Família {index + 1}
                      </h3>
                      {formData.familyMembers.length > 1 && <button onClick={() => removeFamilyMember(index)} className="text-red-500 hover:text-red-700">
                          <X size={18} />
                        </button>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input label="Nome" value={member.name} onChange={e => handleFamilyMemberChange(index, 'name', e.target.value)} placeholder="Nome completo" />
                      <Input label="Parentesco/Relação" value={member.relationship} onChange={e => handleFamilyMemberChange(index, 'relationship', e.target.value)} placeholder="Ex: Cônjuge, Filho" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Data de Nascimento" type="date" value={member.birthDate} onChange={e => handleFamilyMemberChange(index, 'birthDate', e.target.value)} />
                      <Input label="CPF" value={member.cpf} onChange={e => handleFamilyMemberChange(index, 'cpf', e.target.value)} placeholder="000.000.000-00" />
                    </div>
                  </Card>)}
              </div>
            </div>
          </div>;
      case 4:
        return <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Veículos
                </label>
                <Button size="sm" variant="outline" onClick={addVehicle}>
                  Adicionar Veículo
                </Button>
              </div>
              <div className="space-y-4">
                {formData.vehicles.map((vehicle, index) => <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sm font-medium">
                        Veículo {index + 1}
                      </h3>
                      {formData.vehicles.length > 1 && <button onClick={() => removeVehicle(index)} className="text-red-500 hover:text-red-700">
                          <X size={18} />
                        </button>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input label="Modelo" value={vehicle.model} onChange={e => handleVehicleChange(index, 'model', e.target.value)} placeholder="Ex: Honda Civic" />
                      <Input label="Placa" value={vehicle.plate} onChange={e => handleVehicleChange(index, 'plate', e.target.value)} placeholder="ABC1D23" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input label="Cor" value={vehicle.color} onChange={e => handleVehicleChange(index, 'color', e.target.value)} placeholder="Ex: Prata" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo
                        </label>
                        <select value={vehicle.type} onChange={e => handleVehicleChange(index, 'type', e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                          <option value="car">Carro</option>
                          <option value="motorcycle">Moto</option>
                          <option value="other">Outro</option>
                        </select>
                      </div>
                      <Input label="Vaga de Estacionamento" value={vehicle.parkingSpot} onChange={e => handleVehicleChange(index, 'parkingSpot', e.target.value)} placeholder="Ex: B12" />
                    </div>
                  </Card>)}
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> O registro de veículos é importante para
                controle de acesso à garagem e segurança do condomínio. Todos os
                veículos devem estar registrados para acesso.
              </p>
            </div>
          </div>;
      case 5:
        return <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documento de Identidade (RG/CNH) *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <FileText size={40} className="mx-auto text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="id-document" className="relative cursor-pointer bg-white rounded-md font-medium text-[#4A90E2] hover:text-blue-500 focus-within:outline-none">
                      <span>Carregar arquivo</span>
                      <input id="id-document" name="id-document" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF até 10MB
                  </p>
                </div>
              </div>
            </div>
            {formData.residentType === 'tenant' && <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contrato de Locação *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <FileText size={40} className="mx-auto text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="lease-agreement" className="relative cursor-pointer bg-white rounded-md font-medium text-[#4A90E2] hover:text-blue-500 focus-within:outline-none">
                        <span>Carregar arquivo</span>
                        <input id="lease-agreement" name="lease-agreement" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF até 10MB</p>
                  </div>
                </div>
              </div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comprovante de Renda
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <FileText size={40} className="mx-auto text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="income-proof" className="relative cursor-pointer bg-white rounded-md font-medium text-[#4A90E2] hover:text-blue-500 focus-within:outline-none">
                      <span>Carregar arquivo</span>
                      <input id="income-proof" name="income-proof" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF até 10MB</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                <strong>Nota:</strong> Todos os documentos são mantidos em
                sigilo e utilizados apenas para fins administrativos do
                condomínio. Os campos marcados com * são obrigatórios.
              </p>
            </div>
          </div>;
      case 6:
        return <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Áreas de Acesso Permitidas
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input id="pool" name="pool" type="checkbox" checked={formData.accessAreas.pool} onChange={e => handleAccessAreaChange('pool', e.target.checked)} className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
                  <label htmlFor="pool" className="ml-2 block text-sm text-gray-700">
                    Piscina
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="gym" name="gym" type="checkbox" checked={formData.accessAreas.gym} onChange={e => handleAccessAreaChange('gym', e.target.checked)} className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
                  <label htmlFor="gym" className="ml-2 block text-sm text-gray-700">
                    Academia
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="partyRoom" name="partyRoom" type="checkbox" checked={formData.accessAreas.partyRoom} onChange={e => handleAccessAreaChange('partyRoom', e.target.checked)} className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
                  <label htmlFor="partyRoom" className="ml-2 block text-sm text-gray-700">
                    Salão de Festas
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="bbqArea" name="bbqArea" type="checkbox" checked={formData.accessAreas.bbqArea} onChange={e => handleAccessAreaChange('bbqArea', e.target.checked)} className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
                  <label htmlFor="bbqArea" className="ml-2 block text-sm text-gray-700">
                    Churrasqueira
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="playground" name="playground" type="checkbox" checked={formData.accessAreas.playground} onChange={e => handleAccessAreaChange('playground', e.target.checked)} className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
                  <label htmlFor="playground" className="ml-2 block text-sm text-gray-700">
                    Playground
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Política de Visitantes
              </label>
              <select name="visitorPolicy" value={formData.visitorPolicy} onChange={handleInputChange} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                <option value="standard">
                  Padrão (Pré-autorização necessária)
                </option>
                <option value="open">Aberta (Sem pré-autorização)</option>
                <option value="restricted">
                  Restrita (Apenas lista específica)
                </option>
                <option value="none">Sem visitantes permitidos</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Número máximo de visitantes simultâneos" name="maxVisitors" type="number" value={formData.maxVisitors.toString()} onChange={handleInputChange} min="0" max="20" />
              <Input label="Número do Cartão de Acesso" name="accessCard" value={formData.accessCard} onChange={handleInputChange} placeholder="Ex: AC12345" />
            </div>
            <div className="flex items-center">
              <input id="parkingRemote" name="parkingRemote" type="checkbox" checked={formData.parkingRemote} onChange={e => setFormData({
              ...formData,
              parkingRemote: e.target.checked
            })} className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
              <label htmlFor="parkingRemote" className="ml-2 block text-sm text-gray-700">
                Controle remoto de estacionamento fornecido
              </label>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center">
        <button onClick={() => navigate('/admin/residents')} className="mr-4">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Adicionar Novo Morador
          </h1>
          <p className="text-gray-500 mt-1">
            Preencha as informações para registrar um novo morador
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            {steps.map(step => <div key={step.id} className={`flex flex-col items-center ${step.id < currentStep ? 'text-green-500' : step.id === currentStep ? 'text-[#4A90E2]' : 'text-gray-400'}`} style={{
            width: `${100 / steps.length}%`
          }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step.id < currentStep ? 'bg-green-100' : step.id === currentStep ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {step.id < currentStep ? <Check size={20} /> : <step.icon size={20} />}
                </div>
                <div className="text-xs font-medium text-center hidden md:block">
                  {step.title}
                </div>
              </div>)}
          </div>
          <div className="relative mt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-between">
              {steps.map(step => <div key={step.id} style={{
              width: `${100 / steps.length}%`
            }} className="flex items-center">
                  <div className={`w-full h-2 rounded ${step.id <= currentStep ? 'bg-[#4A90E2]' : 'bg-gray-200'}`}></div>
                </div>)}
            </div>
          </div>
        </div>
        {/* Step Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-800">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-500">
              {steps[currentStep - 1].description}
            </p>
          </div>
          <form onSubmit={handleSubmit}>{renderStepContent()}</form>
        </div>
        {/* Navigation Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} leftIcon={<ChevronLeft size={16} />}>
            Anterior
          </Button>
          <div>
            {currentStep < steps.length ? <Button onClick={handleNext} rightIcon={<ChevronRight size={16} />}>
                Próximo
              </Button> : <Button type="submit" onClick={handleSubmit}>
                Concluir Cadastro
              </Button>}
          </div>
        </div>
      </div>
    </div>;
};