import { useImmerReducer } from 'use-immer'
import './App.css'

type Direction = 'right' | 'left' | 'up' | 'down';
type Snake = [Number, Number][];
type Food = [Number, Number];

interface State {
  food: Food,
  direction: Direction,
  snake: Snake,
  speed: Number,
}

function App() {
  const initialState: State = {
    food: generateFood(),
    direction: 'right',
    snake: [[2,2]],
    speed: 100,
  }

  let [state, dispatch] = useImmerReducer(stateReducer, initialState);

  function generateFood(): [Number, Number] {
    let x = (Math.floor(Math.random()*98)+1);
    let y = (Math.floor(Math.random()*98)+1);
    if (x === state.snake[0][0] && y === state.snake[0][1]) {
      return generateFood();
    } else {
      return [x, y];
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className='game'></div>
      </div>
    </div>
  )
}

export default App

function stateReducer(draft, action) {
  switch (action.type) {
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}