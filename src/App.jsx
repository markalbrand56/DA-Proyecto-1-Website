import React, { useState } from 'react'
import TuringTape from './components/TuringTape'
import './App.css'

function App() {

  /* const steps = [
    'State: s1, Tape: 1001B, Head Position: 1',
    'State: s1, Tape: 1001B, Head Position: 2',
    'State: s1, Tape: 1001B, Head Position: 3',
    'State: s1, Tape: 1001B, Head Position: 4',
    'State: s2, Tape: 1001B, Head Position: 3',
    'State: s2, Tape: 1000B, Head Position: 2',
    'State: s3, Tape: 1010B, Head Position: 1',
    'State: s3, Tape: 1010B, Head Position: 0',
    'State: s3, Tape: 1010B, Head Position: -1',
    'State: sh, Tape: 1010B, Head Position: 0'
  ] */

  const [showMachine, setShowMachine] = useState(false) //controla si se muestra la maquina
  const [showAnswer, setShowAnswer] = useState(false) //controla si se muestra la respuesta
  const [turingData, setTuringData] = useState(null); //guarda la data de la maquina con la respuesta
  const [machineData, setMachineData] = useState(""); //guarda la data de la maquina
  const [loading, setLoading] = useState(false); //controla el loading
  const [string , setString] = useState(''); //guarda la cadena

  const API_URL = 'https://d-algoritmos-markalbrand56.koyeb.app'

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/turingMachine/${string}`); //hacemos el fetch a la api con la cadena
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTuringData(data); //guardamos la data de la maquina
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMachine = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/json`); //hacemos el fetch a la api para mostrar la maquina
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMachineData(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const onClickshowAnswer = async () => { //al dar click en el boton run mostramos la respuesta
    setShowAnswer(true);
    setShowMachine(false);
    fetchData();
  }

  const onChangeString = (e) => {
    setString(e.target.value);
  }

  const onClickshowMachine = async () => { //al dar click en el boton de la maquina mostramos la maquina y su configuracion
    fetchMachine();
    setShowMachine(!showMachine);
    setShowAnswer(false);
  }



  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray-100">
      <div className='flex flex-col w-3/4 justify-start items-center'>
        <img src="/images/logo.png" alt="Logo-1" border="0" className='w-1/2 h-1/2 object-cover'/>
        <span className='text-2xl font-bold text-black'>Secuencia de Fibonacci</span>
      </div>
      {!showMachine && !showAnswer && (<form className='flex flex-col w-1/2 h-1/2 justify-start items-center bg-gray-100'>
            <label htmlFor="tape" className='text-black'>Cadena</label>
            <input type="text" id="tape" name="tape" className='w-1/2 bg-black p-2 rounded-md' onChange={onChangeString}></input>
            <button className='w-1/2 text-white bg-blue-500 my-8 rounded-md p-2 hover:bg-blue-700' onClick={onClickshowAnswer}>Run</button>
      </form>)}
      <button className='h-10 w-10 text-white bg-blue-500 rounded-full fixed bottom-0 right-0 m-4 p-2 hover:bg-blue-700' onClick={onClickshowMachine}>
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z" fill="#ffffff"></path> </g></svg>
      </button>
      {showMachine && !showAnswer && (
        <div className='machine flex flex-col h-1/2 justify-start items-center bg-gray-600 rounded-md p-4'>
          <h2 className='text-white text-2xl font-bold'>Máquina de Turing</h2>
        <ul className='flex flex-col py-4 justify-center items-center bg-gray-600 rounded-md'>
          <li className='text-white text-left w-full'><span className='text-white text-l font-bold'>blank_symbol:</span> {machineData.blank_symbol}</li>
          <li className='text-white w-full'><span className='text-white text-l font-bold'>initial_state:</span> {machineData.initial_state}</li>
          <li className='text-white w-full'><span className='text-white text-l font-bold'>final_states:</span> {machineData.final_states}</li>
          <li className='text-white w-full'><span className='text-white text-l font-bold'>states:</span> {machineData.states }</li>
          <li className='text-white w-full'><span className='text-white text-l font-bold'>symbols:</span> {machineData.symbols }</li>
          <li className='text-white w-full'><span className='text-white text-l font-bold'>transitions:</span> {machineData.transitions}</li>
        </ul>
        </div>
      )}
      {
        showAnswer && !showMachine && (
          <div className='machine flex flex-col h-1/2 justify-center items-center bg-blue-600 rounded-md min-w-[700px] px-6'>
          {loading && <p>Cargando...</p>}
          {turingData && <TuringTape steps={turingData.resultado} result={turingData.aceptado} />}
          </div>
        )
      }

    </div>
  )
}

export default App
