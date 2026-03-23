import { createGroup } from "@src/common/data/Group";
import { createToken } from "@src/common/data/Token";
import { createTokenNode, type TokenNode } from "@src/common/data/TokenNode";
import { cn } from "@src/lib/utils";
import type { OlHTMLAttributes } from "react";
import styles from "./ComponentTree.module.css";
import TreeItem from "./TreeItem";

type ComponentTreeProps = {} & OlHTMLAttributes<HTMLOListElement>;

function ComponentTree({ className, children, ...props }: ComponentTreeProps) {
    const items: TokenNode[] = [
        createTokenNode("group 1", createGroup()),
        createTokenNode("group 2", createGroup(true)),
        createTokenNode(
            "string item",
            createToken({ default: "string" }, "string"),
        ),
        createTokenNode("number item", createToken({ default: 123 }, "number")),
        createTokenNode("bool item", createToken({ default: true }, "boolean")),
        createTokenNode(
            "color item",
            createToken({ default: "#E41E7C" }, "color"),
        ),
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
