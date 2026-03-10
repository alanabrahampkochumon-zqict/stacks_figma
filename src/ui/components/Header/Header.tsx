import OptionSelector from "../OptionSelector/OptionSelector";
import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.base}>
            <h2>TODO:Typography</h2>
            <OptionSelector />
            <p>TODO:ICONBUTTON</p>
        </header>
    );
}

export default Header;
