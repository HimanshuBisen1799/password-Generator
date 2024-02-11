import React, { useState, useCallback, useEffect, useRef } from 'react';

import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charr, setChar] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    if (numberAllow) str += '0123456789';
    if (charr) str += '!@#$%^&*()<>?';
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllow, charr]);

  const copyPassClip = () => {
    navigator.clipboard.writeText(password);
  };

  const passwordRef = useRef(null);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charr, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-orange-500 bg-gray-700'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 bg-red-200 text-green-999 rounded-lg mr-4'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPassClip} className=' copy-button outline-none bg-blue-700 text-white py-3 px-5 rounded-2xl onh'>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              value={length}
              min={6}
              max={16}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(parseInt(e.target.value));
              }}
            />
            <label htmlFor=''> Length: {length}</label>
          </div>
         <div>
         <div className='flex  items-center gap-x-1'>
            <input
              type='checkbox'
              checked={numberAllow}
              id='numberInput'
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              checked={charr}
              onChange={() => {
                setChar((prev) => !prev);
              }}
              id='characterInput'
            />
            <label htmlFor='characterInput'>Character</label>
          </div>
         </div>
        </div>
      </div>
    </>
  );
}

export default App;
