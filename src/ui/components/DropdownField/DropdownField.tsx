import Check from "@src/assets/icons/check.svg?react";
import ChevronDown from "@src/assets/icons/chevron-down.svg?react";
import { cn } from "@src/lib/utils";
import { useState, type LiHTMLAttributes, type ReactNode } from "react";
import styles from "./DropdownField.module.css";

export type DropdownFieldProps = {
    options?: string[];
};

function DropdownField({ options }: DropdownFieldProps) {
    const [selected, setSelected] = useState((options && options[0]) || "");
    const [inputText, setInputText] = useState("");
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
                        placeholder={selected}
                        className="label-medium"
                        value={inputText}
                        onChange={(event) => setInputText(event.target.value)}
                    />
                    <ChevronDown />
                </div>
            </div>

            <ul className={styles.dropdown}>
                {options?.map((option) => (
                    <OptionListItem
                        value={option}
                        selected={selected === option}
                        onClick={() => setSelected(option)}
                    >
                        {option}
                    </OptionListItem>
                ))}
                {/* <OptionListItem value="Option 1">Opt 1</OptionListItem>
                <OptionListItem value="Option 1">Opt 1</OptionListItem>
                <OptionListItem value="Option 1">Opt 1</OptionListItem> */}
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
