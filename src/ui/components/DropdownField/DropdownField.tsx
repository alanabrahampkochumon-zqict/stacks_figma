import { useState, type LiHTMLAttributes, type ReactNode } from "react";
import Check from "../../../assets/icons/check.svg?react";
import { cn } from "../../../lib/utils";
import styles from "./DropdownField.module.css";

function DropdownField(options?: string[]) {
    const [selected, setSelected] = useState("apple");
    return (
        <div className={styles.base}>
            <input list="browsers" name="browser" id="browser" />

            <ul className={styles.dropdown}>
                <OptionListItem value="apple" disabled>
                    Apple
                </OptionListItem>
                <OptionListItem value="apple" selected>
                    Banana
                </OptionListItem>
                <OptionListItem value="apple">Cherry</OptionListItem>
                <OptionListItem value="apple">Cherry</OptionListItem>
                <OptionListItem value="apple">Cherry</OptionListItem>
                <OptionListItem value="apple">Cherry</OptionListItem>
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
