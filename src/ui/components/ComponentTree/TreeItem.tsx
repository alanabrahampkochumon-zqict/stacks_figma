import ChevronRight from "@src/assets/icons/chevron-right.svg?react";
import { Group } from "@src/common/data/Group";
import type { Token } from "@src/common/data/Token";
import { cn } from "@src/lib/utils";
import type { HTMLAttributes } from "react";
import styles from "./TreeItem.module.css";

type TreeItemProps = {
    item: Token | Group;
} & HTMLAttributes<HTMLLIElement>;

function TreeItem({ item, className, children: _, ...props }: TreeItemProps) {
    let content = <></>;
    console.log(item);
    if (item instanceof Group) {
        console.log(item);
        content = (
            <>
                <ChevronRight
                    className={cn(
                        styles["group-icon"],
                        item.expanded && styles["group-icon-expanded"],
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
