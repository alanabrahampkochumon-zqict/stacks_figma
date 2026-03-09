import allDesignSystemPresets from "@src/common/presets/AllPresets";
import ArrowRight from "../../../assets/icons/arrow-right.svg?react";
import illustration from "../../../assets/illustration_start.png";
import Button from "../../components/Button/Button";
import DropdownField from "../../components/DropdownField/DropdownField";
import styles from "./SelectionPage.module.css";

function SelectionPage() {
    return (
        <div className={styles.container}>
            <div className={styles["logo-container"]}>
                <img className={styles.logo} src={illustration} alt="Logo" />
            </div>
            <div className={styles.content}>
                <DropdownField
                    options={allDesignSystemPresets.map((ds) => ds.name)}
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
