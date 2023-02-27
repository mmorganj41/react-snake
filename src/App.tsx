import { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';

import FoodItem from './components/FoodItem/FoodItem';
import SnakeItem from './components/SnakeItem/SnakeItem';

import './App.css'

type Direction = 'right' | 'left' | 'up' | 'down';
type SnakeSegment = [number, number];
export type Snake = SnakeSegment[];
export type Food = [number, number];

interface State {
  food: Food,
  direction: Direction,
  snake: Snake,
  speed: number,
}

function App() {
  const initialState: State = {
    food: [25,25],
    direction: 'right',
    snake: [[2,2]],
    speed: 100,
  }

  let [state, dispatch] = useImmerReducer(stateReducer, initialState);

  function generateFood(): [number, number] {
    let x = (Math.floor(Math.random()*48)+1);
    let y = (Math.floor(Math.random()*48)+1);
    if (x === state.snake[0][0] && y === state.snake[0][1]) {
      return generateFood();
    } else {
      return [x, y];
    }
  }

  function moveSnake() {
    let newSnake = [...state.snake]
    let snakeHead = newSnake[0];
    let newHead: SnakeSegment;
    switch (state.direction) {
      case 'down':
        newHead = [snakeHead[0], snakeHead[1]+1];
        break;
      case 'up':
        newHead = [snakeHead[0], snakeHead[1]-1];
        break;
      case 'left':
        newHead = [snakeHead[0]-1, snakeHead[1]];
        break;
      default:
        newHead = [snakeHead[0]+1, snakeHead[1]];
    }
    
    newSnake.unshift(newHead);
    newSnake.pop();

    dispatch({
      type: 'move',
      newSnake,
    })
  }

  return (
    <div className="App">
      <div className="container">
        <div className='game'>
          <SnakeItem snake={state.snake}/>
          <FoodItem food={state.food}/>
        </div>
      </div>
    </div>
  )
}

export default App

function stateReducer(draft, action) {
  switch (action.type) {
    case 'move': {
      draft.snake = action.newSnake;
      break;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}