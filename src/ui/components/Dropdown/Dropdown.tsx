import ChevronDown from "@src/assets/icons/chevron-down.svg?react";
import type { HTMLAttributes } from "react";
import { OptionList } from "../OptionList/OptionList";

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
        <OptionList.Root style={{ border: "1px solid red" }}>
            <OptionList.Trigger>
                Typogprahy
                <ChevronDown />
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
