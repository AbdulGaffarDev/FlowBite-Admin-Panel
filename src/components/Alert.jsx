import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Alert({ heading, message, alertType }) {
  const [timeRemaining, setTimeRemaining] = useState(4);
  const [show, setShow] = useState(true);
  const themeState = useSelector(state => state.ui.theme);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const closeTimer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  },[]);

  if (!show) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className={`w-96 rounded-lg shadow-xl relative overflow-hidden text-center
                  ${themeState === 'dark' ? 'bg-blue-950 shadow shadow-gray-100' : 'bg-white'}
        `}>
        {/* Progress bar that decreases over time */}
        <div 
          className={`h-1 transition-all duration-1000 ease-linear 
                    ${alertType === 'danger' ? 'bg-red-600' : 'bg-blue-700'}`
                }
          style={{ width: `${(timeRemaining / 3) * 100}%` }}
        ></div>
        
        <div className='p-5'>
          <h1 className={`font-bold text-2xl mb-2
            ${alertType === 'danger' ? 'text-red-600': 'text-blue-700'}`
            }>
            {heading}
          </h1>
          <p className={`${themeState==='dark' ? 'text-white' : 'text-gray-700'}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Alert;