import React from "react";
import { IconType } from 'types/props.types'


const OpenInFullIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    height={props.height ? `${props.height}` : "24"}
    viewBox="0 0 24 24"
    width={props.width ? `${props.width}` : "24"}
  >
    <rect fill="none" height="24" width="24" />
    <polygon
      fill="var(--color-text-dominant)"
      points="21,11 21,3 13,3 16.29,6.29 6.29,16.29 3,13 3,21 11,21 7.71,17.71 17.71,7.71"
    />
  </svg>
);

export default OpenInFullIcon;
