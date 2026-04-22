import { cn } from "@src/lib/utils";
import { Check } from "lucide-react";
import {
    ListBox as AriaListBox,
    ListBoxItem as AriaListBoxItem,
    ListBoxSection as AriaListBoxSection,
    Header,
    type ListBoxItemProps,
    type ListBoxProps,
    type ListBoxSectionProps,
} from "react-aria-components/ListBox";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { Text } from "../Content/Content";
import styles from "./ListBox.module.css";

export function ListBox<T extends object>({
    children,
    ...props
}: ListBoxProps<T>) {
    return <AriaListBox {...props}>{children}</AriaListBox>;
}

export function ListBoxItem(props: ListBoxItemProps) {
    let textValue =
        props.textValue ||
        (typeof props.children === "string" ? props.children : undefined);
    return (
        <AriaListBoxItem {...props} textValue={textValue}>
            {composeRenderProps(props.children, (children) =>
                typeof children === "string" ? (
                    <Text slot="label">{children}</Text>
                ) : (
                    children
                ),
            )}
        </AriaListBoxItem>
    );
}

export function ListBoxSection<T extends object>(
    props: ListBoxSectionProps<T>,
) {
    return <AriaListBoxSection {...props} />;
}

export function DropdownListBox<T extends object>(props: ListBoxProps<T>) {
    return <AriaListBox {...props} className={styles["dropdown-listbox"]} />;
}

export function DropdownItem(props: ListBoxItemProps) {
    let textValue =
        props.textValue ||
        (typeof props.children === "string" ? props.children : undefined);
    return (
        <ListBoxItem
            {...props}
            textValue={textValue}
            className={styles["dropdown-item"]}
        >
            {composeRenderProps(props.children, (children, { isSelected }) => (
                <>
                    {typeof children === "string" ? (
                        <Text slot="label" className={cn("body-medium")}>
                            {children}
                        </Text>
                    ) : (
                        children
                    )}
                    {isSelected && <Check className={styles["check-icon"]} />}
                </>
            ))}
        </ListBoxItem>
    );
}

export { Header, Text };
