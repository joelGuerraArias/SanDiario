import React, { useState } from 'react';

interface NumberSelectionProps {
  onSelect: (number: number) => void;
  disabled: boolean;
  currentNumber: number | null;
}

export default function NumberSelection({ onSelect, disabled, currentNumber }: NumberSelectionProps) {
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(number);
    if (num >= 1 && num <= 1000) {
      onSelect(num);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Elige tu Número de la Suerte</h2>
      
      {disabled ? (
        <div className="text-center mb-4 p-4 bg-yellow-100 rounded-lg">
          <p className="text-yellow-800">Ya has seleccionado tu número para hoy.</p>
          <p className="font-bold mt-2">Vuelve mañana para elegir otro número!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ingresa un número (1-1000)</label>
            <input
              type="number"
              min="1"
              max="1000"
              required
              disabled={disabled}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            Enviar Número
          </button>
        </form>
      )}

      {currentNumber && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-blue-600">
            Tu número actual: {currentNumber}
          </p>
        </div>
      )}
    </div>
  );
}