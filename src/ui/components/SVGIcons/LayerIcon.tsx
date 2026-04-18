import type { SVGProps } from "react";

const LayerIcon = ({
    stroke = "#000000",
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="none"
        strokeWidth={1.5}
        {...props}
    >
        <path
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1.5 3.9c0-.84 0-1.26.163-1.581a1.5 1.5 0 0 1 .656-.656c.32-.163.74-.163 1.581-.163h5.7c.84 0 1.26 0 1.581.163a1.5 1.5 0 0 1 .655.656c.164.32.164.74.164 1.581v5.7c0 .84 0 1.26-.164 1.581a1.5 1.5 0 0 1-.655.655c-.32.164-.74.164-1.581.164H3.9c-.84 0-1.26 0-1.581-.164a1.5 1.5 0 0 1-.656-.655c-.163-.32-.163-.74-.163-1.581V3.9Z"
        />
        <path
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 8.4c0-.84 0-1.26.163-1.581a1.5 1.5 0 0 1 .656-.656C7.139 6 7.559 6 8.4 6h5.7c.84 0 1.26 0 1.581.163a1.5 1.5 0 0 1 .656.656c.163.32.163.74.163 1.581v5.7c0 .84 0 1.26-.163 1.581a1.5 1.5 0 0 1-.656.656c-.32.163-.74.163-1.581.163H8.4c-.84 0-1.26 0-1.581-.163a1.5 1.5 0 0 1-.656-.656C6 15.361 6 14.941 6 14.1V8.4Z"
        />
    </svg>
);
export default LayerIcon;
