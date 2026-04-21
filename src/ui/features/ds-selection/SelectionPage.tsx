import ArrowRight from "@src/assets/icons/arrow-right.svg?react";
import illustration from "@src/assets/illustration_start.png";
import allDesignSystemPresets from "@src/common/presets/AllPresets";
import Button from "@src/ui/components/Button/Button";
import ComboBox from "@src/ui/components/ComboBox/ComboBox";
import DropdownField from "@src/ui/components/DropdownField/DropdownField";
import { useState } from "react";
import styles from "./SelectionPage.module.css";
import { ComboBoxItem } from "@src/ui/components/ReactAria/ComboBox/ComboBox";

function SelectionPage() {
    console.log(styles);
    const [inputText, setInputText] = useState("");
    const options = allDesignSystemPresets.map((ds) => ds.name);
    return (
        <div className={styles.container}>
            <div className={styles["logo-container"]}>
                <img className={styles.logo} src={illustration} alt="Logo" />
            </div>
            <div className={styles.content}>
                <ComboBox
                    label="Favorite Animal"
                    placeholder="Select an animal"
                >
                    <ComboBoxItem>Aardvark</ComboBoxItem>
                    <ComboBoxItem>Cat</ComboBoxItem>
                    <ComboBoxItem>Dog</ComboBoxItem>
                    <ComboBoxItem>Kangaroo</ComboBoxItem>
                    <ComboBoxItem>Panda</ComboBoxItem>
                    <ComboBoxItem>Snake</ComboBoxItem>
                </ComboBox>
                {/* <SelectDemo
                    options={options}
                    defaultOption={options[0]}
                    onOptionChange={(option) => console.log(option)}
                    trigger={
                        <>
                            <div className={styles["search-input"]}>
                                <input
                                    list="design-system"
                                    name="design-system"
                                    id="design-system"
                                    placeholder={
                                        (options && options[0]) ||
                                        "Select a design system"
                                    }
                                    className="label-medium"
                                    value={inputText}
                                    onChange={(event) =>
                                        setInputText(event.target.value)
                                    }
                                />
                                {inputText.length ? (
                                    <XIcon onClick={() => setInputText("")} />
                                ) : (
                                    <ChevronDown />
                                )}
                            </div>
                        </>
                    }
                /> */}
                <ComboBox options={options} />
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
