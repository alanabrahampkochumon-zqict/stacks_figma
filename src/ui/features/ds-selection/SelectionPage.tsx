import ArrowRight from "@src/assets/icons/arrow-right.svg?react";
import illustration from "@src/assets/illustration_start.png";
import allDesignSystemPresets from "@src/common/presets/AllPresets";
import Button from "@src/ui/components/Button/Button";
import DropdownField from "@src/ui/components/DropdownField/DropdownField";
import { useState } from "react";
import styles from "./SelectionPage.module.css";

function SelectionPage() {
    const [inputText, setInputText] = useState("");
    return (
        <div className={styles.container}>
            <div className={styles["logo-container"]}>
                <img className={styles.logo} src={illustration} alt="Logo" />
            </div>
            <div className={styles.content}>
                <DropdownField
                    options={allDesignSystemPresets.map((ds) => ds.name)}
                    inputText={inputText}
                    setInputText={setInputText}
                />
                <div className={styles["button-container"]}>
                    <Button variant="primary">
                        <span>Get started</span>
                        <ArrowRight />
                    </Button>
                    <Button variant="secondary">Create from scratch</Button>
                </div>
            </div>
        </div>
    );
}

export default SelectionPage;
