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
      <button>DEL</button>
      <button>/</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="big-button">=</button>
    </div>
  )
}

export default App
