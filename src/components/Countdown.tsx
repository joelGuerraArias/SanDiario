import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownProps {
  drawTime: Date;
}

export default function Countdown({ drawTime }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = drawTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft('¡Hora del sorteo!');
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [drawTime]);

  return (
    <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-blue-600">
      <Clock className="w-8 h-8" />
      <span>Tiempo hasta el sorteo: {timeLeft}</span>
    </div>
  );
}