import { TokenNode } from "@src/common/data/TokenNode";
import type { TokenSet } from "@src/common/data/TokenSet";
import { cn } from "@src/lib/utils";
import { TYPE_PANGRAM } from "@src/ui/utils/Constants";
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
    const [selectedTypeStyle, setselectedTypeStyle] = useState<
        TokenNode | undefined
    >(undefined);

    return <aside className={cn(styles.typographyPanel, className)}></aside>;
}

export default TypographyPanel;
