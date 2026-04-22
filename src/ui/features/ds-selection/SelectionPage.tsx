import illustration from "@src/assets/illustration_start.png";
import allDesignSystemPresets from "@src/common/presets/AllPresets";
import Button from "@src/ui/components/Button/Button";
import {
    ComboBox,
    ComboBoxItem,
} from "@src/ui/components/ReactAria/ComboBox/ComboBox";
import { useState } from "react";
import styles from "./SelectionPage.module.css";

function SelectionPage() {
    const [inputText, setInputText] = useState("");
    const options = allDesignSystemPresets.map((ds) => ds.name);
    const [currentSelection, setCurrentSelection] = useState<
        string | undefined
    >(undefined);
    return (
        <div className={styles.container}>
            <div className={styles["logo-container"]}>
                <img className={styles.logo} src={illustration} alt="Logo" />
            </div>
            <div className={styles.content}>
                <ComboBox
                    label="Design System"
                    placeholder="Select a design system"
                    value={currentSelection}
                    onChange={(value) => setCurrentSelection(value?.toString())}
                    className={styles["design-system-combobox"]}
                >
                    {options.map((option) => (
                        <ComboBoxItem id={option}>{option}</ComboBoxItem>
                    ))}
                </ComboBox>
                <div className={styles["button-container"]}>
                    <Button variant="primary">Get started</Button>
                    <Button variant="secondary">Create from scratch</Button>
                </div>
            </div>
        </div>
    );
}

export default SelectionPage;
