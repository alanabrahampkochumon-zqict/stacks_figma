import { cn } from "@src/lib/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Select as RadixSelect } from "radix-ui";
import { forwardRef, type ReactNode } from "react";
import styles from "./Select.module.scss";

type SelectProps = {
    label?: string;
    searchable?: boolean;
    defaultOption?: string;
    placeholder?: string;
    options: string[];
    onOptionChange: (option: string) => void;
    trigger: ReactNode;
};

const Select = ({ label, onOptionChange, options, trigger }: SelectProps) => {
    return (
        <RadixSelect.Root>
            <RadixSelect.Trigger
                className={cn(styles.trigger, "body-medium")}
                aria-label={label}
            >
                {trigger}
            </RadixSelect.Trigger>
            <RadixSelect.Portal>
                <RadixSelect.Content
                    className={styles["select-content"]}
                    position="popper"
                    side="bottom"
                    style={{ width: "var(--radix-select-trigger-width)" }}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                >
                    <RadixSelect.Viewport className="RadixSelectViewport">
                        {options.map((option) => (
                            <RadixSelectItem
                                value={option}
                                onClick={() => {
                                    onOptionChange(option);
                                }}
                            >
                                {option}
                            </RadixSelectItem>
                        ))}
                    </RadixSelect.Viewport>
                    <RadixSelect.ScrollDownButton className="RadixSelectScrollButton">
                        <ChevronDownIcon />
                    </RadixSelect.ScrollDownButton>
                </RadixSelect.Content>
            </RadixSelect.Portal>
        </RadixSelect.Root>
    );
};

const RadixSelectItem = forwardRef(
    (
        { children, className, ...props }: RadixSelect.SelectItemProps,
        forwardedRef: React.Ref<HTMLDivElement> | undefined,
    ) => {
        return (
            <RadixSelect.Item
                className={cn("RadixSelectItem", className)}
                {...props}
                ref={forwardedRef}
            >
                <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="RadixSelectItemIndicator">
                    <CheckIcon />
                </RadixSelect.ItemIndicator>
            </RadixSelect.Item>
        );
    },
);

export default Select;
