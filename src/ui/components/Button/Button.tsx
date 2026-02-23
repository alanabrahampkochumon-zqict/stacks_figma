import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
    | "Primary"
    | "Secondary"
    | "Inverted"
    | "Ghost-Danger";

const buttonVariants = cva(styles.base, {
    variants: {
        variant: {
            primary: styles.primary,
            secondary: styles.secondary,
            inverted: styles.inverted,
        },
        defaultVariants: {
            variant: "primary",
        },
    },
});
type ButtonProps = {
    iconStart?: ReactNode;
    iconEnd?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>;

function Button({
    iconStart,
    iconEnd,
    variant,
    className,

    ...props
}: ButtonProps) {
    return (
        <button className={buttonVariants({ variant, className })} {...props} />
    );
}

export default Button;
