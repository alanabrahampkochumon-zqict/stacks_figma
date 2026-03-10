import { cn } from "@src/lib/utils";
import styles from "./OptionSelector.module.css";

type OptionSelectorProps = {
    options: string[];
    selected: string;
    onSelectChange: (selection: string) => void;
};

function OptionSelector({
    options,
    selected,
    onSelectChange,
}: OptionSelectorProps) {
    return (
        <div className={styles.base}>
            {options.map((option) => (
                <OptionItem
                    value={option}
                    selected={option === selected}
                    onSelected={() => onSelectChange(option)}
                />
            ))}
        </div>
    );
}

type OptionItemProps = {
    value: string;
    selected: boolean;
    onSelected: () => void;
};

function OptionItem({ value, selected, onSelected }: OptionItemProps) {
    return (
        <div
            className={cn(
                styles["option-item"],
                selected && styles["option-item-selected"],
            )}
            onClick={() => onSelected()}
        >
            {value}
        </div>
    );
}

export default OptionSelector;
