import {Food} from '../../App';
import {useEffect, useState} from 'react';
import './FoodItem.css';

interface Props {
    food: Food,
}

const foodImages = [
    ['mouse_images/mouse1.png', 'mouse_images/mouse2.png', 'mouse_images/mouse1.png', 'mouse_images/mouse3.png', ],
    ['mouse_images/mouse4.png', 'mouse_images/mouse5.png', 'mouse_images/mouse4.png', 'mouse_images/mouse6.png', ],
    ['mouse_images/mouse7.png', 'mouse_images/mouse8.png', 'mouse_images/mouse7.png', 'mouse_images/mouse9.png', ],
    ['mouse_images/mouse10.png', 'mouse_images/mouse11.png', 'mouse_images/mouse10.png', 'mouse_images/mouse11.png', ],
];

export default function FoodItem(props: Props) {
    let {food} = props;

    const [image, setImage] = useState([0, 0]);

    useEffect(() => {
        


        return () => {

        }
    }, [food])

    return (<img className='Food'
            src={foodImages[image[0]][image[1]]} 
            style={{
                left: `${food[0] * 2}%`,
                top: `${food[1] * 2}%`,
            }}
            />)
}