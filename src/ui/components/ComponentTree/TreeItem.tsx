import ChevronRight from "@src/assets/icons/chevron-right.svg?react";
import type { TokenNode } from "@src/common/data/TokenNode";
import { cn } from "@src/lib/utils";
import type { HTMLAttributes } from "react";
import styles from "./TreeItem.module.css";

type TreeItemProps = {
    item: TokenNode;
} & HTMLAttributes<HTMLLIElement>;

function TreeItem({ item, className, children: _, ...props }: TreeItemProps) {
    let content = <></>;
    if (item.value?.entityType === "group") {
        content = (
            <>
                <ChevronRight
                    className={cn(
                        styles["group-icon"],
                        item.value.expanded && styles["group-icon-expanded"],
                    )}
                    height={14}
                    width={14}
                />
                <span>{item.name}</span>
            </>
        );
    } else
        switch (typeof item) {
            case "string":
                break;
        }

    return (
        <li {...props} className={cn(styles.base, "label-small", className)}>
            {content}
        </li>
    );
}

export default TreeItem;
