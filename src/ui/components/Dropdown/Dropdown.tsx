import ChevronDown from "@src/assets/icons/chevron-down.svg?react";
import { cn } from "@src/lib/utils";
import type { HTMLAttributes } from "react";
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
        <div className={cn(styles.base, className)} {...props}>
            <div>
                {currentOption}
                <ChevronDown />
            </div>
        </div>
    );
}

export default Dropdown;
