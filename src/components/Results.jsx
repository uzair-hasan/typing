import React from 'react';

const Results = ({ stats, onRestart }) => {
  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm'>
      <div className='bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full text-center'>
        <h2 className='text-3xl font-bold text-white mb-6'>Test Complete!</h2>

        <div className='grid grid-cols-2 gap-4 mb-8'>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <p className='text-sm text-gray-400'>WPM</p>
            <p className='text-3xl font-bold text-blue-400'>{stats.wpm}</p>
          </div>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <p className='text-sm text-gray-400'>Accuracy</p>
            <p className='text-3xl font-bold text-green-400'>{stats.accuracy}%</p>
          </div>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <p className='text-sm text-gray-400'>Time Taken</p>
            <p className='text-xl font-bold text-yellow-400'>{stats.timeTaken}s</p>
          </div>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <p className='text-sm text-gray-400'>Correct Words</p>
            <p className='text-xl font-bold text-purple-400'>{stats.correctWords}</p>
          </div>
        </div>

        <div className='space-y-2 mb-8 text-gray-400 text-sm'>
          <p>
            WPH: {stats.wph} | WPS: {stats.wps}
          </p>
          <p>Incorrect Words: {stats.incorrectWords}</p>
        </div>

        <button
          onClick={onRestart}
          className='w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg'>
          Restart Test
        </button>
      </div>
    </div>
  );
};

export default Results;
