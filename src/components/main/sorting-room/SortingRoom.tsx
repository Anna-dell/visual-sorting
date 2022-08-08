import styles from './sortingRoom.module.css';

interface SortingRoomProps {
    originalArr: number[];
    elem: number;
    sortedArrElIdx: number;
    iIndex: number;
    jIndex: number;
}

function SortingRoom ({ originalArr, elem, sortedArrElIdx, iIndex, jIndex }: SortingRoomProps) {
    return (
        <div className={styles.sortingRoom}>
            {
                originalArr.map((item, idx) => {
                    return (
                        <div
                            className={`
                                ${styles.item} 
                                ${idx === elem || idx === iIndex || idx === jIndex + 1 ? styles.item1 : styles.item} 
                                ${idx === elem + 1 || idx === jIndex ? styles.item2 : styles.item}
                                ${idx <= sortedArrElIdx ? styles.sortingCompleted : ''}
                            `}
                            id={idx.toString()}
                            key={idx} style={{height: item}}
                        ></div>
                    )
                })
            }
        </div>
    )
}
export default SortingRoom;