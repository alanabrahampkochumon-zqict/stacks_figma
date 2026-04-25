import AlignLeftIcon from "@src/assets/icons/align-left.svg?react";
import ChevronRightIcon from "@src/assets/icons/chevron-right.svg?react";
import HashTagIcon from "@src/assets/icons/hashtag.svg?react";
import ToggleIcon from "@src/assets/icons/toggle.svg?react";
import type { TokenNode } from "@src/common/data/TokenNode";
import { cn } from "@src/lib/utils";
import type { HTMLAttributes, JSX } from "react";
import styles from "./TreeItem.module.scss";

type TreeItemProps = {
    item: TokenNode;
} & HTMLAttributes<HTMLLIElement>;

function TreeItem({ item, className, children: _, ...props }: TreeItemProps) {
    let content = <></>;
    if (item.value?.entityType === "group") {
        content = (
            <>
                <ChevronRightIcon
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
    } else content = getTreeItem(item) || <></>;

    return (
        <li {...props} className={cn(styles.base, "label-small", className)}>
            {content}
        </li>
    );
}

function getTreeItem({ name, value }: TokenNode): JSX.Element | undefined {
    if (value?.entityType === "token") {
        switch (value.type) {
            case "string":
                return (
                    <>
                        <AlignLeftIcon
                            className={styles["group-icon"]}
                            height={18}
                            width={18}
                        />
                        <span>{name}</span>
                    </>
                );
            case "number":
                return (
                    <>
                        <HashTagIcon
                            className={styles["group-icon"]}
                            height={14}
                            width={14}
                        />
                        <span>{name}</span>
                    </>
                );
            case "boolean":
                return (
                    <>
                        <ToggleIcon
                            className={styles["group-icon"]}
                            height={16}
                            width={16}
                        />
                        <span>{name}</span>
                    </>
                );
            case "color":
                return (
                    <>
                        <span
                            className={styles["color-icon"]}
                            style={{
                                backgroundColor: Object.values(
                                    value.valueByMode,
                                )[0],
                            }}
                        ></span>
                        <span>{name}</span>
                    </>
                );
            case "typography":
                return <></>;
            case "sizing":
                return <></>;
            case "spacing":
                return <></>;
            case "animation":
                return <></>;
            case "corner-radius":
                return <></>;
            case "box-shadow":
                return <></>;
            case "gradient":
                return <></>;
        }
    }
}

export default TreeItem;
