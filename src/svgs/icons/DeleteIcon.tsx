import React from "react";
import { IconType } from 'types/props.types'

const DeleteIcon = (props: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.height ? `${props.height}` : "24"}
    viewBox="0 0 24 24"
    width={props.width ? `${props.width}` : "24"}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="var(--color-text-dominant)"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </svg>
);

export default DeleteIcon;
