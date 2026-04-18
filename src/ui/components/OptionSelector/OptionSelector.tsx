import { cn } from "@src/lib/utils";
import { motion } from "framer-motion";
import type { ReactElement } from "react";
import styles from "./OptionSelector.module.css";

type OptionSelectorProps = {
    options: OptionSelectOption[];
    selected: string;
    onSelectChange: (selection: string) => void;
};

function OptionSelector({
    options,
    selected,
    onSelectChange,
}: OptionSelectorProps) {
    return (
        <motion.div layout className={styles.base}>
            {options.map(({ icon, label }) => (
                <OptionItem
                    icon={icon}
                    value={label}
                    selected={label === selected}
                    onSelected={() => onSelectChange(label)}
                />
            ))}
        </motion.div>
    );
}

type OptionItemProps = {
    icon: ReactElement<SVGSVGElement>;
    value: string;
    selected: boolean;
    onSelected: () => void;
};

function OptionItem({ icon, value, selected, onSelected }: OptionItemProps) {
    return (
        <motion.div
            layout
            className={cn(
                styles["option-item"],
                "label-medium",
                selected && styles["option-item-selected"],
            )}
            onClick={() => onSelected()}
        >
            {icon}
            {selected && value}
        </motion.div>
    );
}

export default OptionSelector;
