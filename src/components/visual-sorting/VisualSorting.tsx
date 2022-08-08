import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { setSortType } from '../../redux/slice/visualSortingSlice';
import VisualSortingHeader from '../main/header/VisualSortingHeader';
import SortingRoom from '../main/sorting-room/SortingRoom';
import useSound from 'use-sound';
import sound1 from '../../assets/musics/Album02.mp3';
import sound2 from '../../assets/musics/Album05.mp3';
import styles from './visualSorting.module.css';

const sortTypeOptions = [
    'Bubble Sort',
    'Selection Sort',
    'Insertion Sort',
];

function VisualSorting () {
    const dispatch = useDispatch();
    const [originalArr, setOriginalArr] = useState<number[]>([]);
    const [disableMode, setDisableMode] = useState(false);
    const [sortedArrElIdx, setSortedArrElIdx] = useState(-7);
    const algorithm = useSelector((state: RootState) => state.visualSortingReducer.sortType);
    const speed = useSelector((state: RootState) => state.visualSortingReducer.speed);
    const soundIsEnable =useSelector((state: RootState) => state.visualSortingReducer.soundIsEnable);
    const ARRSIZE = useSelector((state: RootState) => state.visualSortingReducer.arrSize);
    const [playFirst] = useSound(sound1, {volume: soundIsEnable ? 0.15 : 0});
    const [playSecond] = useSound(sound2, {volume: soundIsEnable ? 0.05 : 0});
    const [elem, setElem] = useState(-7);
    const [iIndex, setIIndex] = useState(-7);
    const [jIndex, setJIndex] = useState(-7);

    const generateNewArr = () => {
        let arr : number[] = [];
        for (let i = 0; i < ARRSIZE; i++) {
            arr.push(getRandomValues(20, 400));
        }

        setOriginalArr(arr);
    };

    const getRandomValues = (min: number, max: number) => {
        let randomVal = Math.floor(Math.random() * (max - min + 1) + min)
        return randomVal
    };

    useEffect(() => {
        generateNewArr();
    }, []);

    const setDelay = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    };

    const sortingCompleted = async () => {
        for (let i = 0; i < originalArr.length; i++) {
            setSortedArrElIdx(i);
            if (soundIsEnable) playFirst();
            await setDelay(speed);
        }
        setDisableMode(false);
    };

    const insertionSort = async () => {
        let currentArr = originalArr;
        let sorted = false;
        dispatch(setSortType('Insertion Sort'));

        while (!sorted) {
            sorted = true

            for (let i = 1; i < currentArr.length; i++) {
                let current = currentArr[i]
                let j = i - 1
                while (j >= 0 && currentArr[j] > current) {
                    currentArr[j + 1] = currentArr[j]
                    setOriginalArr([...currentArr]);
                    setJIndex(j);

                    await setDelay(speed);

                    j--
                    sorted = false;
                    if (soundIsEnable) playFirst();
                }
                currentArr[j + 1] = current;
                setOriginalArr([...currentArr]);
                if (soundIsEnable) playSecond();
            }
            if (sorted) sortingCompleted();
        }
    }

    const selectionSort = async () => {
        let currentArr = originalArr;
        let sorted = false;
        dispatch(setSortType('Selection Sort'));

        while (!sorted) {
            sorted = true;

            for (let i = 0; i < currentArr.length - 1; i++) {
                for (let j = i + 1; j < currentArr.length; j++) {
                    if (currentArr[i] > currentArr[j]) {
                        let swap1 = currentArr[i]
                        let swap2 = currentArr[j]
                        currentArr[i] = swap2
                        currentArr[j] = swap1
                        setOriginalArr([...currentArr]);

                        setIIndex(i);
                        setJIndex(j);

                        await setDelay(speed);
                        sorted = false;
                        if (soundIsEnable) playFirst();
                    }
                }
                if (soundIsEnable) playSecond();
            }
            if (sorted) sortingCompleted();
        }
    }

    const bubbleSort = async () => {
        let currentArr = originalArr;
        let sorted = false;
        dispatch(setSortType('Bubble Sort'));

        while (!sorted) {
            sorted = true

            for (let i = 0; i < currentArr.length - 1; i++) {
                for (let j = 0; j < currentArr.length - i - 1; j++) {
                    if (currentArr[j] > currentArr[j + 1]) {
                        let temp = currentArr[j]
                        currentArr[j] = currentArr[j + 1]
                        currentArr[j + 1] = temp
                        setOriginalArr([...currentArr])
                        setElem(j);
                        await setDelay(speed);
                        sorted = false
                        if (soundIsEnable) playFirst();
                    }
                }
                if (soundIsEnable) playSecond();
            }
            if (sorted) sortingCompleted();
        }
    }

    const handleSorting = () => {
        setDisableMode(true)
        switch (algorithm) {
            case 'Bubble Sort':
                bubbleSort()
                break
            case 'Selection Sort':
                selectionSort()
                break
            case 'Insertion Sort':
                insertionSort()
                break
            default:
                break
        }
    };

    return (
        <div className={styles.visualSortingContainer}>
            <VisualSortingHeader
                sortTypeOptions={sortTypeOptions}
                handleClickBtn={generateNewArr}
                handleSort={handleSorting}
                disableMode={disableMode}
            />
            <SortingRoom
                elem={elem}
                sortedArrElIdx={sortedArrElIdx}
                originalArr={originalArr}
                iIndex={iIndex}
                jIndex={jIndex}
            />
        </div>
    )
}
export default VisualSorting;