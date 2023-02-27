import './SnakeItem.css';
import { Snake, Direction } from '../../App';

interface Props {
    snake: Snake,
    speed: number,
    direction: Direction,
}

const rotationDirectionDictionary = {
    'left': '180deg',
    'right': '0deg',
    'up': '270deg',
    'down': '90deg',
}

export default function SnakeItem(props: Props) {
    let {snake, speed, direction} = props;
    const snakeComponent = snake.map((e, i) => (<div 
            className={`Snake ${!i && 'Head'}` }
            key={i}
            style={{
                left: `${e[0] * 2}%`,
                top: `${e[1] * 2}%`,
                transition: `${speed}ms linear`,
                transform: `${!i && `rotate(${rotationDirectionDictionary[direction]})`}` 
            }}
        />));

    return (<>{snakeComponent}</>);
}