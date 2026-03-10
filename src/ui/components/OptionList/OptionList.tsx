import Check from "@src/assets/icons/check.svg?react";
import { cn } from "@src/lib/utils";
import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";
import styles from "./OptionList.module.css";

type RootProps = {
    children: ReactNode;
};

function Root({ children }: RootProps) {
    return <div className={styles.base}>{children}</div>;
}

type TriggerProps = {
    children: ReactNode;
};

function Trigger({ children }: TriggerProps) {
    return <div className={styles.trigger}>{children}</div>;
}

type OptionsProps = {
    options: string[];
    selection: string;
    onSelectionChange: (selection: string) => void;
    filter?: (option: string) => boolean;
} & HTMLAttributes<HTMLUListElement>;

function Options({
    options,
    selection,
    onSelectionChange,
    filter,
}: OptionsProps) {
    return (
        <ul className={styles.dropdown}>
            {options
                ?.filter((option) => (filter ? filter(option) : true))
                ?.map((option) => (
                    <OptionListItem
                        value={option}
                        selected={option === selection}
                        onClick={() => onSelectionChange(option)}
                    >
                        {option}
                    </OptionListItem>
                ))}
        </ul>
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

export const OptionList = { Root, Trigger, Options };
