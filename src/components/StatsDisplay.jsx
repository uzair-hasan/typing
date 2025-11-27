import React from 'react';

const StatsDisplay = ({ wpm, wph, wps, accuracy, timeLeft }) => {
  return (
    <div className='flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md mb-6 text-white'>
      <div className='text-center'>
        <p className='text-xs text-gray-400 uppercase tracking-wider'>Time</p>
        <p className='text-2xl font-bold text-yellow-400'>
          {timeLeft !== null ? `${timeLeft}s` : 'Unlimited'}
        </p>
      </div>
      <div className='text-center'>
        <p className='text-xs text-gray-400 uppercase tracking-wider'>WPM</p>
        <p className='text-2xl font-bold text-blue-400'>{wpm}</p>
      </div>
      <div className='text-center'>
        <p className='text-xs text-gray-400 uppercase tracking-wider'>WPH</p>
        <p className='text-2xl font-bold text-purple-400'>{wph}</p>
      </div>
      <div className='text-center'>
        <p className='text-xs text-gray-400 uppercase tracking-wider'>WPS</p>
        <p className='text-2xl font-bold text-pink-400'>{wps}</p>
      </div>
      <div className='text-center'>
        <p className='text-xs text-gray-400 uppercase tracking-wider'>Accuracy</p>
        <p className='text-2xl font-bold text-green-400'>{accuracy}%</p>
      </div>
    </div>
  );
};

export default StatsDisplay;
