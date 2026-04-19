// import MenuIcon from "@src/assets/icons/menu.svg?react";
import { cn } from "@src/lib/utils";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import IconButton from "../IconButton/IconButton";
import OptionSelector from "../OptionSelector/OptionSelector";
import LayerIcon from "../SVGIcons/LayerIcon";
import LayoutIcon from "../SVGIcons/LayoutIcon";
import StackIcon from "../SVGIcons/StackIcon";
import styles from "./Header.module.css";

type HeaderParams = {
    showBackground?: Boolean;
};

function Header({ showBackground = true }: HeaderParams) {
    const options: OptionSelectOption[] = [
        {
            icon: <StackIcon stroke="var(--clr-content-tertiary)" />,
            label: "Stack",
        },
        {
            icon: <LayoutIcon stroke="var(--clr-content-tertiary)" />,
            label: "Table",
        },
        {
            icon: <LayerIcon stroke="var(--clr-content-tertiary)" />,
            label: "Canvas",
        },
    ]; // TODO: Hoist to constants file
    const [selected, setSelected] = useState(options[0].label);

    const categoryOptions = ["Typography", "Color", "Font-Family"];
    const [currentCategory, setCurrentCategory] = useState(categoryOptions[0]);

    return (
        <header
            className={cn(styles.base, showBackground && styles.background)}
        >
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
                <MenuIcon className="" size={20} />
            </IconButton>
        </header>
    );
}

export default Header;
