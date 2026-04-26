import ChevronDown from "@src/assets/icons/chevron-down.svg?react";
import Close from "@src/assets/icons/close.svg?react";
import { OptionList } from "../OptionList/OptionList";
import styles from "./DropdownField.module.scss";

export type DropdownFieldProps = {
    inputText: string;
    setInputText: (value: string) => void;
    options?: string[];
};

function DropdownField({
    options,
    inputText,
    setInputText,
}: DropdownFieldProps) {
    // const [selected, setSelected] = useState((options && options[0]) || "");
    // TODO: Fix font weight and font family
    return (
        <OptionList.Root className={styles.base}>
            <div className={styles.column}>
                <label htmlFor="design-system" className="label-medium">
                    {" "}
                    {/** TODO: Move out */}
                    Design System
                </label>
                <OptionList.Trigger>
                    <div className={styles.searchInput}>
                        <input
                            list="design-system"
                            name="design-system"
                            id="design-system"
                            placeholder={
                                (options && options[0]) || "Design System"
                            }
                            className="label-medium"
                            value={inputText}
                            onChange={(event) =>
                                setInputText(event.target.value)
                            }
                        />
                        {/* TODO: Use animation for conditional rendering */}
                        {inputText.length ? (
                            <Close onClick={() => setInputText("")} />
                        ) : (
                            <ChevronDown />
                        )}
                    </div>
                </OptionList.Trigger>
            </div>
            {options && (
                <OptionList.Options
                    options={options}
                    selection={inputText}
                    onSelectionChange={setInputText}
                    filter={(option) =>
                        option.toLowerCase().startsWith(inputText.toLowerCase())
                    }
                />
            )}
        </OptionList.Root>
    );
}

export default DropdownField;
