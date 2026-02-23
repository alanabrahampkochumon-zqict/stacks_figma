import { useState, type OptionHTMLAttributes, type ReactNode } from "react";
import ChevronDown from "../../../assets/icons/chevron-down.svg?react";
import { cn } from "../../../lib/utils";
import styles from "./DropdownField.module.css";

function DropdownField(options: string[] = []) {
    const [selected, setSelected] = useState("");
    return (
        <div className={styles.base}>
            <select
                className={styles.select}
                id="fruits"
                name="fruits"
                onSelect={(evt) => setSelected(evt.target.value)}
            >
                <OptionListItem value="apple" disabled>
                    Apple
                </OptionListItem>
                <OptionListItem value="apple">Banana</OptionListItem>
                <OptionListItem value="apple">Cherry</OptionListItem>
                <ChevronDown />
            </select>
        </div>
    );
}

type OptionListItemProps = {
    children: ReactNode;
    value: string | number;
    selected?: boolean;
} & OptionHTMLAttributes<HTMLOptionElement>;

function OptionListItem({
    children,
    value,
    selected = false,
    ...props
}: OptionListItemProps) {
    return (
        <option
            className={cn(styles["list-item"], "label-medium")}
            value={value}
            selected={selected}
            {...props}
        >
            {children}
        </option>
    );
}

export default DropdownField;
