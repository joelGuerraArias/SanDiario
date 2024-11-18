import React, { useState, useEffect } from 'react';
import Registration from './components/Registration';
import NumberSelection from './components/NumberSelection';
import Countdown from './components/Countdown';
import Profile from './components/Profile';
import Logo from './components/Logo';
import { User, WinnerInfo } from './types';
import { Trophy, UserCircle } from 'lucide-react';
import { sendWelcomeEmail, sendNumberSelectionEmail } from './services/emailService';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [winner, setWinner] = useState<WinnerInfo | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const getDrawTime = () => {
    const now = new Date();
    const drawTime = new Date(now);
    drawTime.setHours(21, 0, 0, 0);
    
    if (now.getHours() >= 21) {
      drawTime.setDate(drawTime.getDate() + 1);
    }
    
    return drawTime;
  };

  const canSelectNumber = (user: User) => {
    if (!user.lastNumberSelectedDate) return true;
    const lastDate = new Date(user.lastNumberSelectedDate);
    const today = new Date();
    return lastDate.toDateString() !== today.toDateString();
  };

  useEffect(() => {
    const checkForDraw = () => {
      const now = new Date();
      if (now.getHours() === 21 && now.getMinutes() === 1 && !winner) {
        const validUsers = users.filter(user => user.number !== null);
        if (validUsers.length > 0) {
          const randomIndex = Math.floor(Math.random() * validUsers.length);
          setWinner({
            user: validUsers[randomIndex],
            drawTime: now.toLocaleString()
          });
        }
      }
    };

    const interval = setInterval(checkForDraw, 1000);
    return () => clearInterval(interval);
  }, [users, winner]);

  useEffect(() => {
    if (emailError) {
      const timer = setTimeout(() => {
        setEmailError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emailError]);

  const handleRegister = async (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: crypto.randomUUID()
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);

    const emailSent = await sendWelcomeEmail({
      to_email: newUser.email,
      to_name: `${newUser.firstName} ${newUser.lastName}`
    });

    if (!emailSent) {
      setEmailError('No se pudo enviar el correo de bienvenida. Por favor, verifica tu email más tarde.');
    }
  };

  const handleNumberSelection = async (number: number) => {
    if (currentUser && canSelectNumber(currentUser)) {
      const updatedUser = {
        ...currentUser,
        number,
        lastNumberSelectedDate: new Date().toISOString()
      };
      setUsers(prev =>
        prev.map(user =>
          user.id === currentUser.id ? updatedUser : user
        )
      );
      setCurrentUser(updatedUser);

      const emailSent = await sendNumberSelectionEmail({
        to_email: updatedUser.email,
        to_name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        number: updatedUser.number
      });

      if (!emailSent) {
        setEmailError('No se pudo enviar la confirmación del número. Por favor, verifica tu email más tarde.');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          {currentUser && (
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserCircle className="w-5 h-5" />
              <span>Mi Perfil</span>
            </button>
          )}
        </div>

        {emailError && (
          <div className="max-w-md mx-auto mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{emailError}</span>
          </div>
        )}
        
        <div className="mb-8">
          <Countdown drawTime={getDrawTime()} />
        </div>

        {winner && (
          <div className="max-w-md mx-auto mb-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl shadow-lg p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">¡Ganador Anunciado!</h2>
            <div className="text-center">
              <img src={winner.user.photoUrl} alt="Ganador" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <p className="font-bold">{winner.user.firstName} {winner.user.lastName}</p>
              <p>Número Ganador: {winner.user.number}</p>
              <p className="text-sm mt-2">Hora del Sorteo: {winner.drawTime}</p>
            </div>
          </div>
        )}

        {!currentUser && (
          <div className="max-w-md mx-auto">
            <Registration onRegister={handleRegister} />
          </div>
        )}

        {currentUser && !winner && (
          <div className="max-w-md mx-auto">
            {showProfile ? (
              <Profile user={currentUser} onLogout={handleLogout} />
            ) : (
              <>
                <div className="mb-8 text-center">
                  <img src={currentUser.photoUrl} alt="Perfil" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  <p className="font-bold text-lg">¡Bienvenido, {currentUser.firstName}!</p>
                </div>
                <NumberSelection
                  onSelect={handleNumberSelection}
                  disabled={!canSelectNumber(currentUser)}
                  currentNumber={currentUser.number}
                />
              </>
            )}
          </div>
        )}

        <div className="mt-8 max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">Participantes</h3>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-4 p-2 border-b last:border-b-0">
                  <img src={user.photoUrl} alt={user.firstName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">
                      {user.number ? `Número: ${user.number}` : 'Sin número seleccionado'}
                    </p>
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-center text-gray-500">No hay participantes aún</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-white shadow-md mt-8">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-gray-600 text-sm">
            Todos los derechos reservados, SanDiario SRL 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;