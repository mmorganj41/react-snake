import {Food} from '../../App';
import './FoodItem.css';

interface Props {
    food: Food,
}

export default function FoodItem(props: Props) {
    let {food} = props;

    return (<div className='Food' 
            style={{
                left: `${Number(food[0]) * 2}%`,
                top: `${Number(food[1]) * 2}%`,
            }}
            />)
}