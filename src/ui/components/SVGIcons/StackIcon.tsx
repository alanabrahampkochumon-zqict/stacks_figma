import type { SVGProps } from "react";

const StackIcon = ({
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
            d="M1.167 7 6.79 9.812a.634.634 0 0 0 .155.065.292.292 0 0 0 .108 0 .634.634 0 0 0 .155-.065L12.833 7M1.167 9.917l5.624 2.812a.631.631 0 0 0 .155.065.29.29 0 0 0 .108 0 .631.631 0 0 0 .155-.065l5.624-2.812M1.167 4.083 6.79 1.271c.077-.038.115-.057.155-.065a.292.292 0 0 1 .108 0c.04.008.078.027.155.065l5.624 2.812L7.21 6.896a.634.634 0 0 1-.155.065.292.292 0 0 1-.108 0c-.04-.008-.078-.027-.155-.065L1.167 4.083Z"
        />
    </svg>
);
export default StackIcon;
