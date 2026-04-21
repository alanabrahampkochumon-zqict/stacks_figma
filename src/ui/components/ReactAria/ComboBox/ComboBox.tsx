import { cn } from "@src/lib/utils";
import { ChevronDown } from "lucide-react";
import {
    ComboBox as AriaComboBox,
    type ComboBoxProps as AriaComboBoxProps,
    ComboBoxValue,
    Input,
    type ListBoxItemProps,
    type ListBoxProps,
    type ValidationResult,
} from "react-aria-components/ComboBox";
import { Description, FieldButton, FieldError, Label } from "../Form/Form";
import { DropdownItem, DropdownListBox } from "../ListBox/ListBox";
import { Popover } from "../Popover/Popover";
import styles from "./Combobox.module.css";

export interface ComboBoxProps<
    T extends object,
    M extends "single" | "multiple",
> extends Omit<AriaComboBoxProps<T, M>, "children"> {
    label?: string;
    description?: string | null;
    errorMessage?: string | ((validation: ValidationResult) => string);
    children: React.ReactNode | ((item: T) => React.ReactNode);
    placeholder?: string;
}

export function ComboBox<
    T extends object,
    M extends "single" | "multiple" = "single",
>({
    label,
    description,
    errorMessage,
    children,
    placeholder,
    ...props
}: ComboBoxProps<T, M>) {
    return (
        <AriaComboBox {...props}>
            <Label>{label}</Label>
            <div className={cn(styles["combobox-field"], "body-medium")}>
                <Input
                    className={styles["react-aria-input"]}
                    placeholder={placeholder}
                />
                <FieldButton className={styles["combobox-select"]}>
                    <ChevronDown className={styles["chevron-icon"]} />
                </FieldButton>
            </div>
            {props.selectionMode === "multiple" && (
                <ComboBoxValue placeholder="No items selected" />
            )}
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
            <Popover hideArrow className={styles["combobox-popover"]}>
                <ComboBoxListBox>{children}</ComboBoxListBox>
            </Popover>
        </AriaComboBox>
    );
}

export function ComboBoxListBox<T extends object>(props: ListBoxProps<T>) {
    return <DropdownListBox {...props} />;
}

export function ComboBoxItem(props: ListBoxItemProps) {
    return <DropdownItem {...props} />;
}
