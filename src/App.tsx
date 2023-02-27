import { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';

import FoodItem from './components/FoodItem/FoodItem';
import SnakeItem from './components/SnakeItem/SnakeItem';

import './App.css'
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';

export type Direction = 'right' | 'left' | 'up' | 'down';
type SnakeSegment = [number, number];
export type Snake = SnakeSegment[];
export type Food = [number, number];

interface State {
  game: boolean,
  food: Food,
  direction: Direction,
  snake: Snake,
  speed: number,
  highScore: number,
}

const movementDictionary = {
  'right': 'left',
  'left': 'right',
  'up': 'down',
  'down': 'up',
}  

const initialState: State = {
  game: true,
  food: [25,25],
  direction: 'right',
  snake: [[2,2]],
  speed: 100,
  highScore: 0,
}

export default function App() {
  let [state, dispatch] = useImmerReducer(stateReducer, initialState);

  useEffect(() => {
    document.addEventListener('keydown', controls);

    return () => {
      document.removeEventListener('keydown', controls);
    }
  }, []);
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, state.speed);
    return () => {
      clearInterval(gameInterval);
    };
  }, [state.speed]);

  function controls(e: KeyboardEvent): void {
    switch(e.key) {
      case 's' || "ArrowDown": 
        dispatch({
          type: 'control',
          direction: 'down'
        })
        break;
      case 'w' || 'ArrowUp':
        dispatch({
          type: 'control',
          direction: 'up'
        })
        break;
      case 'a' || 'ArrowLeft':
        dispatch({
          type: 'control',
          direction: 'left'
        })
        break;
      case 'd' || 'ArrowRight':
        dispatch({
          type: 'control',
          direction: 'right'
        })
        break;
    }
  }

  function moveSnake() {
    dispatch({
      type: 'move',
    })
  }

  return (
    <>
    <Header />
    <div className="App">
      <div className="container">
        {state.game ?
        <div className='game'>
          <SnakeItem snake={state.snake} speed={state.speed} direction={state.direction}/>
          <FoodItem food={state.food}/>
        </div> :
        <Menu score={state.snake.length-1} highScore={state.highScore}/>
        }
      </div>
    </div>
    </>
  )
}

type Action = {
  type: 'move';
} | {
  type: 'control';
  direction: Direction;
}

function stateReducer(draft: State, action: Action) {
  switch (action.type) {
    case 'move': {
      if (!draft.game) return;
      let snakeHead = draft.snake[0];
      let newHead: SnakeSegment;
      switch (draft.direction) {
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
      draft.snake.pop();
      draft.snake.unshift(newHead);
      if (touchedFood(newHead, draft.food)) {
        draft.food = generateFood();
        growSnake(draft.snake);
        increaseSpeed();
      }
      if (checkCollison(draft.snake)) draft.game = false;
      break;
    }
    case 'control': {
      if (!draft.game) return;
      if (!(draft.direction === action.direction || movementDictionary[draft.direction] === action.direction)) {
        draft.direction = action.direction;
      }
      break;
    }
  }

  function checkCollison(snake:Snake) {
    let newSnake = [...snake];
    let head = newSnake.shift();

    if (!head) return true;

    let [headX, headY] = head;

    if (headX < 0 || headX >= 50 || headY < 0 || headY >= 50 ) {
      return true;
    } else if (newSnake.some(([x, y]) => x === headX && y === headY)) {
      return true;
    } else {
      return false;
    }
  }
  
  function touchedFood(head: SnakeSegment, food: Food) {
    let [headX, headY] = head;
    let [foodX, foodY] = food;

    if (headX === foodX && headY === foodY) {
      return true;
    }
    return false;
  } 

  function generateFood(): [number, number] {
    let x = (Math.floor(Math.random()*48)+1);
    let y = (Math.floor(Math.random()*48)+1);
    if (x === draft.snake[0][0] && y === draft.snake[0][1]) {
      return generateFood();
    } else {
      return [x, y];
    }
  }

  function growSnake(snake: Snake) {
    snake.push([NaN, NaN]);
  }

  function increaseSpeed() {
    if (draft.speed > 31) {
      draft.speed -= 3;
    }
  }
}

