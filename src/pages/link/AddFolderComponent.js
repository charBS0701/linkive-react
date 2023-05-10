import styles from './css/AddFolderComponent.module.css'

function AddFolderComponent() {
    return (
        <button className={styles.rootButton}>
            <span>폴더 추가</span>
            <span className={styles.plusSpan}>+</span>
        </button>
    )
}

export default AddFolderComponent;