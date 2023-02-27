import './SnakeItem.css';
import { Snake } from '../../App';

interface Props {
    snake: Snake,
    speed: number,
}

export default function SnakeItem(props: Props) {
    let {snake, speed} = props;
    const snakeComponent = snake.map((e, i) => (<div 
            className={`Snake ${i || 'Head'}` }
            key={i}
            style={{
                left: `${e[0] * 2}%`,
                top: `${e[1] * 2}%`,
                transition: `${speed}ms linear`,
            }}
        />));

    return (<>{snakeComponent}</>);
}