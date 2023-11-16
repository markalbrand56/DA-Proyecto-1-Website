import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './TuringTape.css'

const TuringTape = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tapeContent, setTapeContent] = useState([]);
  const [headPosition, setHeadPosition] = useState(0);

  useEffect(() => {
    if (steps && steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      // Extract information from the step string
      const { tape, position } = parseStep(step);
      setTapeContent(tape);
      setHeadPosition(position);
    }
  }, [currentStep, steps]);

  const parseStep = (step) => {
    // Implement logic to parse the step string and extract tape content and head position
    // Example: 'State: s1, Tape: 1001B, Head Position: 1'
    const tapeMatch = step.match(/Tape: ([0-1B]+)/);
    const positionMatch = step.match(/Head Position: (\d+)/);
    return {
      tape: tapeMatch ? tapeMatch[1].split('') : [],
      position: positionMatch ? parseInt(positionMatch[1], 10) : 0
    };
  };

  const onNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="turing-tape">
      <div className="tape">
        {tapeContent.map((symbol, index) => (
          <div key={index} className={`tape-cell ${index === headPosition ? 'head' : ''}`}>
            {symbol}
          </div>
        ))}
      </div>
      <button className='h-10 w-full text-white bg-transparent rounded-full m-4 p-0' onClick={onNextStep}>
        <div className='relative top-60 left-5'>
        <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow-right-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-310.000000, -1089.000000)" fill="#ffffff"> <path d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 L332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z" id="arrow-right-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
            </div>
      </button>
    </div>
  );
};

TuringTape.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired
    };



export default TuringTape;
