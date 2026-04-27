import type { TokenNode } from "@src/common/data/TokenNode";
import type { TokenSet } from "@src/common/data/TokenSet";
import { cn } from "@src/lib/utils";
import { TYPE_PANGRAM } from "@src/ui/utils/Constants";
import { motion } from "motion/react";
import { useState } from "react";
import styles from "./TypographyPanel.module.scss";

type TypographyPanelProps = {
    tokenSet: TokenSet;
    placeholderText?: String;
    className?: String;
};

function TypographyPanel({
    tokenSet,
    placeholderText = TYPE_PANGRAM,
    className,
}: TypographyPanelProps) {
    // TODO: Change conditional to !tokenSet ||
    if (tokenSet && tokenSet.type !== "typography")
        return <p>Invalid tokenset passed into typography panel.</p>;
    const [selectedTypeStyle, setselectedTypeStyle] = useState<
        TokenNode | undefined
    >(undefined);

    return (
        <aside className={cn(styles.typographyPanel, className)}>
            <motion.div
                initial={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p>{placeholderText}</p>
            </motion.div>
        </aside>
    );
}

export default TypographyPanel;
