import { SVGProps } from "react";

export function ReturnBtn(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      <g
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M.5 9.5h9a4 4 0 0 0 0-8h-3"></path>
        <path d="m3.5 6.5l-3 3l3 3"></path>
      </g>
    </svg>
  );
}
