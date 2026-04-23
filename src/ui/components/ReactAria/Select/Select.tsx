import { ChevronDown } from "lucide-react";
import {
    Select as AriaSelect,
    type SelectProps as AriaSelectProps,
    type ListBoxItemProps,
    type ListBoxProps,
    SelectValue,
    type ValidationResult,
} from "react-aria-components/Select";
import { Button } from "../Button/Button";
import { Description, FieldError, Label } from "../Form/Form";
import { DropdownItem, DropdownListBox } from "../ListBox/ListBox";
import { Popover } from "../Popover/Popover";
import styles from "./Select.module.css";
export interface SelectProps<
    T extends object,
    M extends "single" | "multiple",
> extends Omit<AriaSelectProps<T, M>, "children"> {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    items?: Iterable<T>;
    children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<
    T extends object,
    M extends "single" | "multiple" = "single",
>({
    label,
    description,
    errorMessage,
    children,
    items,
    ...props
}: SelectProps<T, M>) {
    return (
        <AriaSelect {...props}>
            {label && <Label>{label}</Label>}
            <Button variant="unstyled" className={styles.trigger}>
                <SelectValue />
                <ChevronDown />
            </Button>
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
            <Popover hideArrow>
                <SelectListBox items={items}>{children}</SelectListBox>
            </Popover>
        </AriaSelect>
    );
}

export function SelectListBox<T extends object>(props: ListBoxProps<T>) {
    return <DropdownListBox {...props} />;
}

export function SelectItem(props: ListBoxItemProps) {
    return <DropdownItem {...props} />;
}
