'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const page = () => {
  const [pswd, setPswd] = useState('');
  const [length, setLength] = useState(8)
  const [isnum, setIsnum] = useState(false);
  const [issym, setIssym] = useState(false);
  const passref = useRef(null)

  // useCallback is used to optimize the code it will perform its execution in cache memory to optimize
  const generate = useCallback(() => {
    let allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let pass = ''

    if (isnum) allowed += '0123456789'
    if (issym) allowed += '@&$!?*'

    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * allowed.length)
      pass += allowed[idx];
    }
    setPswd(pass);

  }, [length, isnum, issym, setPswd])

  const copyFunction = () => {
    // coping the pswd to the clipboard with the help of window object
    window.navigator.clipboard.writeText(pswd)

    // selecting the input field with the help of reference
    // ? is added because run select only if you have something in current not empty
    passref.current?.select()
  }

  // if any of this dependencies changes then call this function automatically
  useEffect(() => {
    generate()
  }, [length, isnum, issym, setPswd])



  return (
    <div className='w-full h-screen bg-slate-800'>
      <div className='text-5xl text-white border-b-2 w-fit mx-auto pt-24'>Password Generator</div>
      <div className='w-[45%] h-1/4 mx-auto mt-24 bg-red-200 rounded-3xl py-5 px-10'>
        <div className='flex justify-evenly'>
          <input
            className='h-18 w-[70%] border-2 border-gray-500 rounded-md pl-5 text-2xl font-semibold'
            type='text'
            placeholder='password'
            value={pswd}
            ref={passref}
            readOnly={true}
          />
          <button onClick={copyFunction} className='bg-blue-600 px-5 py-3 text-2xl text-white font-bold ml-7 rounded-full'>copy</button>
        </div>
        <div className='flex justify-evenly mt-10'>

          <div className='px-4 py-2 bg-slate-500 text-2xl rounded-2xl text-white'>
            <div className='flex items-center gap-x-4'>
              <input type='range' value={length} min='4' max='20'
                onChange={(e) => (setLength(e.target.value))} />
              <lable>Length: ({length})</lable>
            </div>
          </div>
          <button
            className={`${isnum ? 'bg-green-600' : 'bg-red-600'}
          px-4 py-2 rounded-2xl text-white text-2xl`}
            onClick={() => setIsnum(!isnum)}>Numbers</button>

          <button
            className={`${issym ? 'bg-green-600' : 'bg-red-600'}
          px-4 py-2 rounded-2xl text-white text-2xl`}
            onClick={() => setIssym(!issym)}>Symbols</button>

        </div>
      </div>
    </div>
  )
}

export default page