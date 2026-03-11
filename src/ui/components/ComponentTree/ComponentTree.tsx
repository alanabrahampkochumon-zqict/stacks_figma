import type { Group } from "@src/common/data/Group";
import type { Token } from "@src/common/data/Token";
import { cn } from "@src/lib/utils";
import type { OlHTMLAttributes } from "react";
import styles from "./ComponentTree.module.css";
import TreeItem from "./TreeItem";

type ComponentTreeProps = {} & OlHTMLAttributes<HTMLOListElement>;

function ComponentTree({ className, children, ...props }: ComponentTreeProps) {
    const items: (Group | Token)[] = [
        {
            name: "test",
            expanded: false,
            entityType: "group",
        } as Group,
        {
            name: "test 2",
            expanded: true,
        } as Group,
    ];
    return (
        <ol role="list" {...props} className={cn(styles.root, className)}>
            {items.map((item) => (
                <TreeItem item={item} />
            ))}
        </ol>
    );
}

export default ComponentTree;
