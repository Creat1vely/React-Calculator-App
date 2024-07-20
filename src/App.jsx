function App() {
  return (
    // calculator app container
    <div className='calculator'>

      {/* calculator output section */}
      <div className="output">
        <div className="preview-value">
          25
        </div>

        <div className="main-value">
          2500
        </div>
      </div>

      {/* calculator buttons */}
      <button className="big-button">AC</button>
      <button className="normal-button">DEL</button>
      <button className="normal-button">/</button>
      <button className="normal-button">1</button>
      <button className="normal-button">2</button>
      <button className="normal-button">3</button>
      <button className="normal-button">*</button>
      <button className="normal-button">4</button>
      <button className="normal-button">5</button>
      <button className="normal-button">6</button>
      <button className="normal-button">+</button>
      <button className="normal-button">7</button>
      <button className="normal-button">8</button>
      <button className="normal-button">9</button>
      <button className="normal-button">-</button>
      <button className="normal-button">.</button>
      <button className="normal-button">0</button>
      <button className="big-button">=</button>
    </div>
  )
}

export default App
