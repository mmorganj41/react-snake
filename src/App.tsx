import { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import FoodItem from './components/FoodItem/FoodItem';
import './App.css'

type Direction = 'right' | 'left' | 'up' | 'down';
export type Snake = [Number, Number][];
export type Food = [Number, Number];

interface State {
  food: Food,
  direction: Direction,
  snake: Snake,
  speed: Number,
}

function App() {
  const initialState: State = {
    food: [50,50],
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
        <div className='game'>
          <FoodItem food={state.food}/>
        </div>
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