import React, { useState } from 'react';
import { User } from '../types';
import ImageUpload from './ImageUpload';
import Logo from './Logo';

interface RegistrationProps {
  onRegister: (user: Omit<User, 'id'>) => void;
}

const Registration = ({ onRegister }: RegistrationProps) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    photoUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.photoUrl) {
      alert('Por favor selecciona una foto');
      return;
    }
    onRegister({ ...formData, number: null });
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            required
            placeholder="Ingresa tu correo electrónico"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            required
            placeholder="Ingresa tu nombre"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            value={formData.firstName}
            onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            required
            placeholder="Ingresa tu apellido"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            value={formData.lastName}
            onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto de Perfil
          </label>
          <ImageUpload
            onImageSelect={(imageUrl) => setFormData(prev => ({ ...prev, photoUrl: imageUrl }))}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registration;