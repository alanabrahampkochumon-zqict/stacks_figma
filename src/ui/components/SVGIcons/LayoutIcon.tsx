import type { SVGProps } from "react";

const LayoutIcon = ({
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
            d="M2.25 6.75h13.5m-9 0v9m-.9-13.5h6.3c1.26 0 1.89 0 2.371.245.424.216.768.56.984.984.245.48.245 1.11.245 2.371v6.3c0 1.26 0 1.89-.245 2.371-.216.424-.56.768-.984.984-.48.245-1.11.245-2.371.245h-6.3c-1.26 0-1.89 0-2.371-.245a2.25 2.25 0 0 1-.984-.984c-.245-.48-.245-1.11-.245-2.371v-6.3c0-1.26 0-1.89.245-2.371a2.25 2.25 0 0 1 .984-.984c.48-.245 1.11-.245 2.371-.245Z"
        />
    </svg>
);
export default LayoutIcon;
