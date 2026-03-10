import { useState } from "react";
import OptionSelector from "../OptionSelector/OptionSelector";
import styles from "./Header.module.css";

function Header() {
    const options = ["Stack Mode", "Canvas"]; // TODO: Hoist to constants file
    const [selected, setSelected] = useState(options[0]);
    return (
        <header className={styles.base}>
            <h2>TODO:Typography</h2>
            <OptionSelector
                options={options}
                selected={selected}
                onSelectChange={setSelected}
            />
            <p>TODO:ICONBUTTON</p>
        </header>
    );
}

export default Header;
