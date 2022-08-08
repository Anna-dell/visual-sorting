import { useDispatch } from 'react-redux';
import { setSpeed } from '../../../redux/slice/visualSortingSlice';
import styles from './vsAccelerator.module.css';

interface VSAcceleratorProps {
    disable: boolean;
}

function VSAccelerator ({ disable }: VSAcceleratorProps) {
    const dispatch = useDispatch();

    const handleSpeed = (evt: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSpeed(Number(evt.target.value)));
    };

    return (
        <div className={`${styles.acceleratorContainer} ${disable ? styles.disable : ''}`}>
            <form>
                <div className={styles.sliderTitle}>Select Speed</div>
                <div className={styles.speedSlider} onChange={handleSpeed}>
                    <input
                        type='radio'
                        name='speed'
                        id='slow'
                        value={1000}
                        disabled={disable}
                    />
                    <label htmlFor='slow' current-speed='Slow'></label>
                    <input
                        type='radio'
                        name='speed'
                        id='medium'
                        value={100}
                        defaultChecked
                        disabled={disable}
                    />
                    <label htmlFor='medium' current-speed='Medium'></label>
                    <input
                        type='radio'
                        name='speed'
                        id='fast'
                        value={10}
                        disabled={disable}
                    />
                    <label htmlFor='fast' current-speed='Fast'></label>
                    <div className={styles.sliderPosition}></div>
                </div>
            </form>
        </div>
    )
}
export default VSAccelerator;