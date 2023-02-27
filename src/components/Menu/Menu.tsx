import './Menu.css';

interface Props {
    score: number,
    highScore: number,
}

export default function Menu(props: Props) {
    let {score, highScore} = props;

    return (<div className='Menu'>

        <h2>Press any key to start</h2>
        <p>Use 'wasd' or the arrow keys to move around.</p>        
        <div className='score'>
            <ul>
                <li>
                    <strong>Score:</strong> {score}
                </li>
                <li>
                    <strong>Highscore:</strong> {highScore}
                </li>
            </ul>
        </div>
    </div>)
}