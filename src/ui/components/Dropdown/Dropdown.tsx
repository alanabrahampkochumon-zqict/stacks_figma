import ChevronDown from "@src/assets/icons/chevron-down.svg?react";
import { cn } from "@src/lib/utils";
import type { HTMLAttributes } from "react";
import { OptionList } from "../OptionList/OptionList";
import styles from "./Dropdown.module.css";

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
        <OptionList.Root {...props}>
            <OptionList.Trigger>
                <button className={cn(styles.dropdown, "heading-h6")}>
                    Typogprahy
                    <ChevronDown />
                </button>
            </OptionList.Trigger>
            <OptionList.Options
                options={options}
                onSelectionChange={onOptionChange}
                selection={currentOption}
            />
        </OptionList.Root>
    );
}

export default Dropdown;
