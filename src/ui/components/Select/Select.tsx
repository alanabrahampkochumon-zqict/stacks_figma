import { cn } from "@src/lib/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Select as RadixSelect } from "radix-ui";
import { forwardRef, useState } from "react";
import styles from "./Select.module.css";

type SelectProps = {
    label?: string;
    searchable?: boolean;
    defaultOption?: string;
    placeholder?: string;
    options: string[];
    onOptionChange: (option: string) => void;
};

const Select = ({
    label,
    defaultOption,
    onOptionChange,
    options,
    searchable = true,
}: SelectProps) => {
    const [currentInput, setCurrentInput] = useState();
    return (
        <RadixSelect.Root>
            <RadixSelect.Trigger
                className={cn(styles.trigger, "body-medium")}
                aria-label={label}
            >
                <RadixSelect.Value placeholder="RadixSelect a fruit…" />
                <RadixSelect.Icon className="RadixSelectIcon">
                    <ChevronDownIcon className={styles["chevron-down"]} />
                </RadixSelect.Icon>
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
                        <RadixSelect.Group>
                            <RadixSelect.Label className="RadixSelectLabel">
                                Fruits
                            </RadixSelect.Label>
                            <RadixSelectItem value="apple">
                                Apple
                            </RadixSelectItem>
                            <RadixSelectItem value="banana">
                                Banana
                            </RadixSelectItem>
                            <RadixSelectItem value="blueberry">
                                Blueberry
                            </RadixSelectItem>
                            <RadixSelectItem value="grapes">
                                Grapes
                            </RadixSelectItem>
                            <RadixSelectItem value="pineapple">
                                Pineapple
                            </RadixSelectItem>
                        </RadixSelect.Group>
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
