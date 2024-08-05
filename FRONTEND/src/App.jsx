import './App.css'
import axios from 'axios'

function App() {
  async function handleClick(e) {
    e.preventDefault()
    await axios.post('http://localhost:3000/register', {
      name: 'Fred',
      age: 25
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    console.log('Button clicked')
  }
  return (
    <>
      <div>
        <h1>SPORTS FEST</h1>
        <form>
          <input type="text" placeholder="Enter your name" />
          <button onClick={handleClick}>pay 100/-</button>
        </form>
      </div>
    </>
  )
}

export default App
