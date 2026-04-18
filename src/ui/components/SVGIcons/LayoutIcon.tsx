import type { SVGProps } from "react";

const SvgComponent = ({
    stroke = "#000000",
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        fill="none"
        {...props}
    >
        <path
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1.75 5.25h10.5m-7 0v7m-.7-10.5h4.9c.98 0 1.47 0 1.845.19.329.169.597.436.764.766.191.374.191.864.191 1.844v4.9c0 .98 0 1.47-.19 1.845a1.75 1.75 0 0 1-.766.764c-.374.191-.864.191-1.844.191h-4.9c-.98 0-1.47 0-1.844-.19a1.75 1.75 0 0 1-.765-.766c-.191-.374-.191-.864-.191-1.844v-4.9c0-.98 0-1.47.19-1.844a1.75 1.75 0 0 1 .766-.765c.374-.191.864-.191 1.844-.191Z"
        />
    </svg>
);
export default SvgComponent;
