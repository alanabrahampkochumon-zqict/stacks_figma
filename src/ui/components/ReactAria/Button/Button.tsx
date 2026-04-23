import { cn } from "@src/lib/utils";
import { Circle } from "lucide-react";
import {
    Button as RACButton,
    type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import styles from "./Button.module.css";

interface ButtonProps extends RACButtonProps {
    /**
     * The visual style of the button (Vanilla CSS implementation specific).
     * @default 'primary'
     */
    variant?: "primary" | "secondary" | "quiet" | "unstyled";
}

export function Button(props: ButtonProps) {
    return (
        <RACButton
            {...props}
            className={cn(styles["button-base"])}
            data-variant={props.variant || "primary"}
        >
            {composeRenderProps(props.children, (children, { isPending }) => (
                <>
                    {!isPending && children}
                    {isPending && <Circle />} {/** TODO: Update to progress */}
                </>
            ))}
        </RACButton>
    );
}
