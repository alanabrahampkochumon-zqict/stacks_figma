import Check from "@src/assets/icons/check.svg?react";
import { cn } from "@src/lib/utils";
import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";
import styles from "./OptionList.module.scss";

type RootProps = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function Root({ children, className, ...props }: RootProps) {
    return (
        <div className={cn(styles.root, className)} {...props}>
            {children}
        </div>
    );
}

type TriggerProps = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function Trigger({ children, ...props }: TriggerProps) {
    return (
        <div className={styles.trigger} {...props}>
            {children}
        </div>
    );
}

type OptionsProps = {
    options: string[];
    selection: string;
    onSelectionChange: (selection: string) => void;
    filter?: (option: string) => boolean;
} & HTMLAttributes<HTMLUListElement>;

// TODO: Scrolling one line option name
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
                styles.listItem,
                "label-medium",
                disabled && styles.listItemDisabled,
                selected && styles.listItemSelected,
            )}
            value={value}
            {...props}
            aria-disabled={disabled}
        >
            {children}
            {selected && <Check className={styles.checkIcon} />}
        </li>
    );
}

export const OptionList = { Root, Trigger, Options };
