import React from 'react';
import { Ticket } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Ticket className="h-8 w-8 text-blue-600" />
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        SanDiario
      </span>
    </div>
  );
}