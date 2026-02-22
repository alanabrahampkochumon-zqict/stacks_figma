import ArrowRight from "../../../assets/icons/arrow-right.svg?react";
import illustration from "../../../assets/illustration_start.png";
import Button from "../../components/Button";
import styles from "./SelectionPage.module.css";

function SelectionPage() {
    // TODO: Fix disabled state
    return (
        <div className={styles.container}>
            <div className={styles["logo-container"]}>
                <img className={styles.logo} src={illustration} alt="Logo" />
            </div>
            <div className={styles.content}>
                <div>TODO: Textfield replace</div>
                <div className={styles["button-container"]}>
                    <Button variant="primary" disabled>
                        <span>Get started</span>
                        <ArrowRight />
                        {/* <img
                            src={ArrowRight}
                            alt=""
                            height={20}
                            width={20}
                            style={{ fill: "red" }}
                        /> */}
                    </Button>
                    <Button variant="secondary">Create from scratch</Button>
                </div>
            </div>
        </div>
    );
}

export default SelectionPage;
