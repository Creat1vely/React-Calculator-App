import { useReducer } from "react";

// define calculator functions 
const CAlCULATOR_FUNCTION = {
  ADD_NUMBER: 'add-number',
  DELETE_NUMBER: "delete-number",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR_CALCULATOR: 'clear-calculator',
  PERFORM_OPERATION: "perform-operation"
}


// define numeric formatter object to help divide 
// calculator value into commas
const NumericFormatter = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0
})

// formatValue()
// takes in a numeric string value and formats it
// into a new numeric string made up of comma
// uses the pre-defined "NumericFormatter"
function formatValue( value ) {

  // check if an empty string is passed as a value
  // and return an empty string
  if ( value == "" ) {
    return ""
  }

  // split the numeric string value into two parts
  // if possible, that is, the integer part and the 
  // decimal part
  const [ integer, decimal ] = value.split(".")

  // comma-format the integer part of the string leaving
  // the decimal part out and return the formatted string
  if ( decimal == null ) {
    return NumericFormatter.format( integer )
  } else { 
    return `${ NumericFormatter.format(integer) }.${ decimal }`
  }
}


// evaluate()
// takes in the current calculator-reducer state and return it's 
// evaluated value based on the operation specified in the state
function evaluate({ currentValue, previousValue, operation }) {
  // convert state's textuals numbers into real javascript numbers
  let prevNumber = parseFloat( previousValue );
  let currentNumber = parseFloat( currentValue );

  // check if any of the numbers evaluate as NAN,
  // and return an empty string
  if ( isNaN( prevNumber ) || isNaN( currentNumber ) ) {
    return ""
  }

  let computation;
  
  // perform mathematical computation based on 
  // selected operation
  switch ( operation ) {
    case "*":
      computation = prevNumber * currentNumber;
    break;

    case "/":
      computation = prevNumber / currentNumber;
    break;

    case "+":
      computation = prevNumber + currentNumber;
    break;

    case "-":
      computation = prevNumber - currentNumber;
    break;
  }

  // return computation as string 
  return computation.toString();
}


// reducer()
// calculator's main engine
// this is the reducer function passed to the useReducer inside
// of app()
// contains action/code for all defined CALCULATOR_FNCTION, 
// handles their payloads and return the proper calculator state
function reducer( state, action ) {
  // check CALCULATOR_FNCTION and use it to
  // define which action.type to run
  switch ( action.type ) {
    // perform reducer action - if user wants to type-in/add a number
    // to the output. Perform all checks to prevent adding
    // incorrect values to the output such as: 0002 or 0...02
    case CAlCULATOR_FUNCTION.ADD_NUMBER:
      // check if an overwrite should be performed
      // and overwrite currentValue and add new digit
      if ( state.shouldOverwrite ) {
        return {
          ...state,
          currentValue: `${action.payload.digit}`,
          shouldOverwrite: false
        }
      }

      // check and verify against adding two leading zeros,
      // that means, The calculator can't have input like this "0002"
      if ( state.currentValue == 0 && action.payload.digit == 0 ) {
        return state
      }
      
      // check and verify against adding two decimal points,
      // that means, The calculator can't have input like this "0..002"
      if ( state.currentValue.includes(".") && action.payload.digit == '.' ) {
        return state
      }

      // if none of these previous checks were met, just add the digit
      // to the output directly
      return {
        ...state,
        currentValue: `${ state.currentValue || "" }${ action.payload.digit }`
      }

    // perform reducer action - if user wants to clear the calculator
    // output
    case CAlCULATOR_FUNCTION.CLEAR_CALCULATOR:
      // reset state back to default on clearing calculator
      return {
        previousValue: "",
        currentValue: "",
        operation: ""
      }

    // perform reducer action - if user wants to perform a math
    // operation( i.e. division, addition, etc ) with the calculator
    // allow user to do repeated operations ( i.e. adding two numbers,
    // then adding another number again without using the equals button )
    case CAlCULATOR_FUNCTION.CHOOSE_OPERATION:
      // check and verify against choosing an operation
      // when there are no calculator values
      if ( state.previousValue == "" && state.currentValue == "" ) {
        return state
      }

      // check and verify if the user typed in any value
      // and append operand to the user value
      if ( state.previousValue == "" ) {
        return {
          previousValue: state.currentValue,
          operation: `${ action.payload.operand }`,
          currentValue: ""
        }
      }

      // check and verify if the user previously evaluated a value
      // and change operand on choose
      if ( state.currentValue == "" ) {
        return {
          ...state,
          operation: action.payload.operand
          // 14cc7c8
          // a8c195d
        }
      }

      // check and verify if the user has entered a value,
      // chose an operand, entered another value and chose
      // an operand again( repeated operations )
      return {
        previousValue: evaluate( state ),
        shouldOverwrite: true,
        operation: `${ action.payload.operand }`,
        currentValue: ""
      }

    // perform reducer action - if user wants to remove a typed-in/added number
    // from the output. Perform all checks to do output overwrite when user just
    // finished using the equals button to perform a calculation
    case CAlCULATOR_FUNCTION.DELETE_NUMBER:
      // check if user just performed a calculation using the equal button
      // and overwrite calculator output by resetting calculator state
      if ( state.shouldOverwrite ) {
        return {
          ...state,
          currentValue: "",
          shouldOverwrite: false
        }
      }

      // check if there currently no typed-in value and return current state
      if ( state.currentValue == "" ) {
        return state
      }

      // if none of these checks are passed, just remove the last digit
      // from the current typed-in value( i.e. state.currentValue ) and return it 
      // in state
      return {
        ...state,
        currentValue: `${state.currentValue.slice( 0, ( state.currentValue.length - 1 ) )}`
      }

    // perform reducer action - if user wants to evaluate/perform
    // a math operation using the equals button on the calculator
    case CAlCULATOR_FUNCTION.PERFORM_OPERATION:
      // evaluate the current calculator, set output overwrite
      // flag to true upon next reducer action and reset other
      // calculator state values back to default
      return {
        shouldOverwrite: true,
        currentValue: `${ evaluate( state ) }`,
        previousValue: "",
        operand: "",
      }
  }
}



function App() {
  // create reducer values to formulate the entire
  // calculator engine representing different 
  // calculator actions/behaviour and central state
  const [ state, dispatch ] = useReducer( reducer, 
    { currentValue: "", previousValue: "", operation: "", shouldOverwrite: false } )


  return (
    // app's container
    <div className="app">
      {/* creatively title */}
      <h1 className="creatively-title">
        React Calculator App ( from creat1vely )
      </h1>

      {/* calculator app container */}
      <div className='calculator'>

        {/* calculator output section */}
        <div className="output">

          {/* calculator preview output */}
          <div className="preview-value">
            { formatValue( state.previousValue ) } { state.operation }
          </div>

          {/* calculator main output */}
          <div className="main-value">
            { formatValue( state.currentValue ) }
          </div>
        </div>

        {/* calculator buttons */}

        {/* calculator clear button */}
        <button className="big-button" onClick={ () => {
            dispatch( { type: CAlCULATOR_FUNCTION.CLEAR_CALCULATOR } )
          }}>AC</button>

        {/* calculator delete button */}
        <button className="normal-button" onClick={ () => {
            dispatch( { type: CAlCULATOR_FUNCTION.DELETE_NUMBER } )
          }}>DEL</button>

        {/* calculator operand button */}
        <button className="normal-button" 
          onClick={ () => {
            dispatch( { type: CAlCULATOR_FUNCTION.CHOOSE_OPERATION, payload: { operand: "/"} })
          }}>/</button>

        {/* calculator digit buttons */}
        <button className="normal-button" 
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 1 }  } ) 
            } }>1</button>
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 2 }  } ) 
            } }>2</button>
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 3 }  } ) 
            } }>3</button>

        {/* calculator operand button */}
        <button className="normal-button" 
          onClick={ () => {
            dispatch( { type: CAlCULATOR_FUNCTION.CHOOSE_OPERATION, payload: { operand: "*"} })
          }}>*</button>

        {/* calculator digit button */}
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 4 }  } ) 
            } }>4</button>
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 5 }  } ) 
            } }>5</button>
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 6 }  } ) 
            } }>6</button>

        {/* calculator operand button */}
        <button className="normal-button" 
          onClick={ () => {
            dispatch( { type: CAlCULATOR_FUNCTION.CHOOSE_OPERATION, payload: { operand: "+"} })
          }}>+</button>

        {/* calculator digit button */}
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 7 }  } ) 
            } }>7</button>
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 8 }  } ) 
            } }>8</button>
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 9 }  } ) 
            } }>9</button>
        
        {/* calculator operand button */}
        <button className="normal-button" 
          onClick={ () => {
            dispatch( { type: CAlCULATOR_FUNCTION.CHOOSE_OPERATION, payload: { operand: "-"} })
          }}>-</button>

        {/* calculator digit button */}
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload:  { digit: "." }  } ) 
            } }>.</button>
        <button className="normal-button"
          onClick={ () => { 
              dispatch( { type: CAlCULATOR_FUNCTION.ADD_NUMBER, payload: { digit: 0 }  } ) 
            } }>0</button>

        {/* calculator evaluate button */}
        <button className="big-button" onClick={ () => {
            dispatch( { type: CAlCULATOR_FUNCTION.PERFORM_OPERATION } )
          }}>=</button>
      </div>

      {/* creatively links */}
      <div className="creatively-links">
        <a href="" className="creatively-link">
          view code on github
        </a>
        <a href="" className="creatively-link">
          learn how to create this app ( youtube )
        </a>
        <a href="" className="creatively-link">
          learn web development @ creat1vely
        </a>
      </div>
    </div>
  )
}

export default App
