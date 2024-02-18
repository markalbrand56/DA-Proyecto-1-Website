import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './TuringTape.css'

const TuringTape = ({ steps, result }) => {
  const [currentStep, setCurrentStep] = useState(0); //guarda el paso actual
  const [tapeContent, setTapeContent] = useState([]); //guarda el contenido de la cinta
  const [headPosition, setHeadPosition] = useState(0); //guarda la posicion de la cabeza

  //cada vez que cambia el paso actual
  useEffect(() => {
    if (steps && steps.length > 0 && currentStep < steps.length) { //si hay pasos y el paso actual es menor a la cantidad de pasos
      const step = steps[currentStep]; //guardamos el paso actual
      //ej Paso actual: State: qAccept, Tape: 100001_, Head Position: 6

      // extraemos la información de la cinta y la posicion de la cabeza
      const { tape, position } = parseStep(step);
      setTapeContent(tape);

      setHeadPosition(position);
      console.log("tape",tape)
      console.log("position",position)
    }
  }, [currentStep, steps]);

  const parseStep = (step) => {
    // Logica para extraer la información de la cinta, la posicion de la cabeza y el estado
    const tapeMatch = step.match(/Tape: ([0-z]+)/);
    const positionMatch = step.match(/Head Position: (\d+)/);
    const stateMatch = step.match(/State: (\w+)/);
    return {
      tape: tapeMatch ? tapeMatch[1].split('') : [],
      position: positionMatch ? parseInt(positionMatch[1], 10) : 0,
      state: stateMatch ? stateMatch[1] : ''
    };
  };

  const onNextStep = () => {
    if (currentStep < steps.length - 1) { 
      setCurrentStep(currentStep + 1); //aumentamos el paso actual
    }
  };

  const onReload = () => {
    window.location.reload(); //recargamos la pagina
  }

  return (
    <div className="turing-tape flex flex-col">
      <div className="tape flex flex-col w-full justify-center items-center">
        {console.log("tapeContent",tapeContent)}
        <span className='font-bold text-2xl p-4 text-white'>Estado: {parseStep(steps[currentStep]).state}</span>
        <div className="flex">
        {tapeContent.map((symbol, index) => (
          <div key={index} className={`tape-cell ${index === headPosition ? 'head' : ''}`}> 
            {symbol}
          </div>
        ))}
        </div>
      </div>
      <div className="result ">
        <span className='font-bold text-3xl text-white'>Resultado: </span>
        <span className='font-bold text-3xl text-white'>
        {
        currentStep === steps.length - 1 ? (result ? 'Accepted' : 'Rejected') : '...'
        }
        </span>
      </div>
      <div className='relative bottom-0 w-1/2 flex justify-center mt-8'>
        <button className='h-10 text-white bg-transparent rounded-full m-4 p-0 ' onClick={onNextStep}>
          <div className=''>
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow-right-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-310.000000, -1089.000000)" fill="#ffffff"> <path d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 L332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z" id="arrow-right-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
          </div>
        </button>
        <button className='h-10  text-white bg-transparent rounded-full m-4 p-0 ' onClick={onReload}>
            <div className='' onClick={onReload}>
            <svg fill="#ffffff" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,12A11,11,0,0,1,17.882,2.7l1.411-1.41A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707l1.128-1.128A8.994,8.994,0,0,0,3,12a1,1,0,0,1-2,0Zm21-1a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9,8.9,8.9,0,0,1-4.42-1.166l1.127-1.127A1,1,0,0,0,8,17H4a1,1,0,0,0-1,1v4a1,1,0,0,0,.617.924A.987.987,0,0,0,4,23a1,1,0,0,0,.707-.293L6.118,21.3A10.891,10.891,0,0,0,12,23,11.013,11.013,0,0,0,23,12,1,1,0,0,0,22,11Z"></path></g></svg>
            </div>
        </button>
      </div>
    </div>
  );
};

TuringTape.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    result: PropTypes.bool.isRequired
    };



export default TuringTape;
