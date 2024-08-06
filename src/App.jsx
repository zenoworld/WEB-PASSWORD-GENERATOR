import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  //useref hook
  const passwordRef = useRef(null)
  const passwordCopy = useCallback(() => {
     passwordRef.current?.select(); // FOR THE COPY EFFECT
    passwordRef.current?.setSelectionRange(0,20); //TO SPECIFY THE RANGE OF THE COPY
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>

      <div className='w-full max-w-md mx-auto text-orange-500 rounded-lg px-4 py-4 my-8 bg-gray-700'>
        <h1 className='text-center text-white my-3'>PASSWORD GENERATOR</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} placeholder='Password ' readOnly className='w-full outline-none px-3 py-1'
            ref={passwordRef}></input>

          <button className='bg-red-500 text-white px-4 ' onClick={passwordCopy}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input className='cursor-pointer'
              type='range'
              min={6}
              max={100}
              value={length}
              onChange={(e) => { setLength(e.target.value) }} />
            <label>Length : {length}</label>
          </div>

          <div className='flex item-center gap-x-1'>
            <label>Numbers</label>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            />
          </div>

          <div className='flex item-center gap-x-1'>
            <label>Characters : </label>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => { setCharAllowed((prev) => !prev) }}
            />
          </div>


        </div>
      </div>
    </>
  )
}

export default App
