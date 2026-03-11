import { cn } from "@src/lib/utils";
import { type ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

type IconButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

function IconButton({ children, className, ...props }: IconButtonProps) {
    return (
        <button className={cn(styles.base, className)} {...props}>
            {children}
        </button>
    );
}

export default IconButton;
