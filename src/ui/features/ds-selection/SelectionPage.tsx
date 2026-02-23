import ArrowRight from "../../../assets/icons/arrow-right.svg?react";
import illustration from "../../../assets/illustration_start.png";
import Button from "../../components/Button/Button";
import DropdownField from "../../components/DropdownField/DropdownField";
import styles from "./SelectionPage.module.css";

function SelectionPage() {
    // TODO: Fix disabled state
    return (
        <div className={styles.container}>
            <div className={styles["logo-container"]}>
                <img className={styles.logo} src={illustration} alt="Logo" />
            </div>
            <div className={styles.content}>
                <DropdownField options={["Design System 1", "Design System 2"]}>
                    Dropdown Field
                </DropdownField>
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
