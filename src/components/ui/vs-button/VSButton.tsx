import styles from './vsButton.module.css'

interface VSButtonProps {
    text: string;
    type: string;
    onClick: () => void;
    disable?: boolean;
}

function VSButton ({ text, type, onClick, disable }: VSButtonProps) {
    return (
        <button
            className={`${type === 'sorting' ? styles.sortBtn : styles.newArrBtn} ${disable ? styles.disable : ''}`}
            onClick={onClick}
            disabled={disable}
        >
            {text}
        </button>
    )
}
export default VSButton;