import { useState, type LiHTMLAttributes, type ReactNode } from "react";
import Check from "../../../assets/icons/check.svg?react";
import { cn } from "../../../lib/utils";
import styles from "./DropdownField.module.css";

export type DropdownFieldProps = {
    options?: string[];
};

function DropdownField({ options }: DropdownFieldProps) {
    const [selected, setSelected] = useState((options && options[0]) || "");
    return (
        <div className={styles.base}>
            <input list="browsers" name="browser" id="browser" />

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
            )}
            value={value}
            {...props}
        >
            {children}
            {/* {selected && <ChevronDown />}  TODO: Replace with check icon */}
            {selected && <Check />}
        </li>
    );
}

export default DropdownField;
