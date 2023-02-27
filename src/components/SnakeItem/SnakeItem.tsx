import './SnakeItem.css';
import { Snake } from '../../App';

interface Props {
    snake: Snake,
}

export default function SnakeItem(props: Props) {
    let {snake} = props;
    const snakeComponent = snake.map((e) => (<div 
            className='Snake' 
            style={{
                left: `${Number(e[0]) * 2}%`,
                top: `${Number(e[1]) * 2}%`,
            }}
        />));

    return (<>{snakeComponent}</>);
}