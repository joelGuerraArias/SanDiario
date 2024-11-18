import React from 'react';
import { User } from '../types';
import { UserCircle, Mail, Calendar } from 'lucide-react';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

export default function Profile({ user, onLogout }: ProfileProps) {
  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <img 
          src={user.photoUrl} 
          alt="Foto de perfil" 
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
        />
        <h2 className="text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-gray-600">
          <Mail className="w-5 h-5" />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>
            {user.lastNumberSelectedDate 
              ? `Último número seleccionado: ${new Date(user.lastNumberSelectedDate).toLocaleDateString()}`
              : 'No has seleccionado ningún número'}
          </span>
        </div>

        <div className="pt-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Número actual:</h3>
            <p className="text-2xl font-bold text-blue-600">
              {user.number ?? 'No seleccionado'}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full mt-6 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}