import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import VSButton from '../../ui/vs-button/VSButton';
import VSSelect from '../../ui/vs-select/VSSelect';
import VSSwitch from '../../ui/vs-switch/VSSwitch';
import VSAccelerator from '../../ui/vs-accelerator/VSAccelerator';
import styles from './visualSortingHeader.module.css';
import {setArrSize, setSoundIsEnable} from "../../../redux/slice/visualSortingSlice";
import {RootState} from "../../../redux";

interface VisualSortingHeaderProps {
    sortTypeOptions: string[];
    handleClickBtn: () => void;
    handleSort: () => void;
    disableMode: boolean;
}

function VisualSortingHeader ({ sortTypeOptions, handleClickBtn, handleSort, disableMode }: VisualSortingHeaderProps) {
    const ARRSIZE = useSelector((state: RootState) => state.visualSortingReducer.arrSize);

    const dispatch =useDispatch();
    const [soundOn, setSoundOn] = useState(false);
    
    const handleSoundChange = (checked: boolean) => {
        setSoundOn(checked);
        dispatch(setSoundIsEnable(checked));
    };

    const handleSetArrSize = (evt: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setArrSize(evt.target.value));
    }
    return (
        <div className={styles.headerContainer}>
            <div className={styles.selectArrSize}>
                <label htmlFor="arrSize">Enter number of items </label>
                <input
                    type='number'
                    id='arrSize'
                    name='arrSize'
                    className={styles.arrSize}
                    min='1'
                    max='100'
                    onChange={handleSetArrSize}
                    value={ARRSIZE}
                />
            </div>
            <VSButton
                type={'sorting'}
                onClick={handleClickBtn}
                disable={disableMode}
                text={'Generate'}
            />
            <VSSelect
                label={'Sort Type'}
                options={sortTypeOptions}
                disable={disableMode}
            />
            <VSAccelerator
                disable={disableMode}
            />
            <VSSwitch
                id={'vsSwitch'}
                name={'sound'}
                checked={soundOn}
                onChange={handleSoundChange}
                optionLabels={['On', 'Off']}
                small={false}
                disabled={disableMode}
            />
            <VSButton
                text={'Sort'}
                type={'sorting'}
                onClick={handleSort}
                disable={disableMode}
            />
        </div>
    )
}
export default VisualSortingHeader;