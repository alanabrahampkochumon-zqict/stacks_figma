import type { SVGProps } from "react";

const StackIcon = ({
    stroke = "#000000",
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        strokeWidth={1.5}
        fill="none"
        {...props}
    >
        <path
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m1.5 9 7.232 3.616c.098.049.147.074.199.083a.374.374 0 0 0 .138 0c.052-.01.1-.034.2-.083L16.5 9m-15 3.75 7.232 3.616c.098.049.147.074.199.083a.374.374 0 0 0 .138 0c.052-.01.1-.034.2-.083L16.5 12.75m-15-7.5 7.232-3.616c.098-.049.147-.074.199-.083a.375.375 0 0 1 .138 0c.052.01.1.034.2.083L16.5 5.25 9.268 8.866a.815.815 0 0 1-.199.083.375.375 0 0 1-.138 0 .815.815 0 0 1-.2-.083L1.5 5.25Z"
        />
    </svg>
);
export default StackIcon;
