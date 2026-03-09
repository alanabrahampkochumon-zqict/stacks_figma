import Check from "@src/assets/icons/check.svg?react";
import ChevronDown from "@src/assets/icons/chevron-down.svg?react";
import Close from "@src/assets/icons/close.svg?react";
import { cn } from "@src/lib/utils";
import { type LiHTMLAttributes, type ReactNode } from "react";
import styles from "./DropdownField.module.css";

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
        <div className={styles.base}>
            <div className={styles.column}>
                <label htmlFor="design-system" className="label-medium">
                    Design System
                </label>
                <div className={styles["search-input"]}>
                    <input
                        list="design-system"
                        name="design-system"
                        id="design-system"
                        placeholder={(options && options[0]) || "Design System"}
                        className="label-medium"
                        value={inputText}
                        onChange={(event) => setInputText(event.target.value)}
                    />
                    {/* TODO: Use animation for conditional rendering */}
                    {inputText.length ? (
                        <Close onClick={() => setInputText("")} />
                    ) : (
                        <ChevronDown />
                    )}
                </div>
            </div>

            <ul className={styles.dropdown}>
                {options
                    ?.filter((option) =>
                        option
                            .toLowerCase()
                            .startsWith(inputText.toLowerCase()),
                    )
                    ?.map((option) => (
                        <OptionListItem
                            value={option}
                            selected={inputText === option}
                            onClick={() => {
                                setInputText(option);
                            }}
                        >
                            {option}
                        </OptionListItem>
                    ))}
            </ul>
        </div>
    );
}

type OptionListItemProps = {
    children: ReactNode;
    value: string | number;
    selected?: boolean;
    disabled?: boolean;
} & LiHTMLAttributes<HTMLLIElement>;

function OptionListItem({
    children,
    value,
    selected = false,
    disabled = false,
    ...props
}: OptionListItemProps) {
    return (
        <li
            className={cn(
                styles["list-item"],
                "label-medium",
                disabled && styles["list-item-disabled"],
                selected && styles["list-item-selected"],
            )}
            value={value}
            {...props}
            aria-disabled={disabled}
        >
            {children}
            {selected && <Check className={styles["check-icon"]} />}
        </li>
    );
}

export default DropdownField;
