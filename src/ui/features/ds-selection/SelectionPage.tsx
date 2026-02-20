import illustration from "../../../assets/illustration_start.png";
import styles from "./SelectionPage.module.css";
function SelectionPage() {
    return (
        <div className={styles.container}>
            <div className={styles["logo-container"]}>
                <img className={styles.logo} src={illustration} alt="Logo" />
            </div>
            <div className={styles.content}></div>
        </div>
    );
}

export default SelectionPage;
