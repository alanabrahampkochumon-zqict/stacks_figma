import MenuIcon from "@src/assets/icons/menu.svg?react";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import IconButton from "../IconButton/IconButton";
import OptionSelector from "../OptionSelector/OptionSelector";
import styles from "./Header.module.css";

function Header() {
    const options = ["Stack Mode", "Canvas"]; // TODO: Hoist to constants file
    const [selected, setSelected] = useState(options[0]);

    const categoryOptions = ["Typography", "Color", "Font-Family"];
    const [currentCategory, setCurrentCategory] = useState(categoryOptions[0]);

    return (
        <header className={styles.base}>
            <Dropdown
                options={categoryOptions}
                currentOption={currentCategory}
                onOptionChange={setCurrentCategory}
            />
            <OptionSelector
                options={options}
                selected={selected}
                onSelectChange={setSelected}
            />
            <IconButton
                className={styles["menu-button"]}
                aria-description="menu"
            >
                <MenuIcon />
            </IconButton>
        </header>
    );
}

export default Header;
