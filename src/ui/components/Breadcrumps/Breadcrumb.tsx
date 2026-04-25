import ChevronRightIcon from "@src/assets/icons/chevron-right.svg?react";
import { cn } from "@src/lib/utils";
import type { HTMLAttributes } from "react";
import styles from "./Breadcrumb.module.scss";

type BreadcrumbProps = {
    paths: string[];
    onPathClick: (path: string) => void;
} & HTMLAttributes<HTMLElement>;

function Breadcrumb({
    paths,
    onPathClick,
    className,
    ...props
}: BreadcrumbProps) {
    return (
        <nav
            aria-label="breadcrumb"
            {...props}
            className={cn(styles.nav, className)}
        >
            <ol className={styles.base}>
                {paths.map((path, index) => (
                    <li
                        onClick={() => onPathClick(path)}
                        className={cn(
                            "label-small",
                            styles.path,
                            index === paths.length - 1 && styles.pathActive,
                        )}
                    >
                        {path}
                        {index < paths.length - 1 && (
                            <ChevronRightIcon height={16} width={16} />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
