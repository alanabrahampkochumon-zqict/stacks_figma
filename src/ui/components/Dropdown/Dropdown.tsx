import { cn } from "@src/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import type { HTMLAttributes } from "react";
import styles from "./Dropdown.module.scss";

type DropdownProps = {
    options: string[];
    currentOption: string;
    onOptionChange: (option: string) => void;
} & HTMLAttributes<HTMLDivElement>;

function Dropdown({
    options,
    currentOption,
    onOptionChange,
    className,
    ...props
}: DropdownProps) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className={cn(styles.dropdown, "heading-h6")}
                    aria-label="Customise options"
                >
                    {currentOption}
                    <ChevronDown />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={styles["dropdown-list"]}
                    sideOffset={5}
                >
                    {options.map((option) => {
                        return (
                            <DropdownMenu.Item
                                onClick={() => onOptionChange(option)}
                                className={cn(
                                    "body-small",
                                    styles["dropdown-item"],
                                )}
                            >
                                <span>{option}</span>
                                {option === currentOption && (
                                    <Check
                                        height={20}
                                        width={20}
                                        className={cn(styles["chevron-down"])}
                                    />
                                )}
                            </DropdownMenu.Item>
                        );
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

export default Dropdown;
