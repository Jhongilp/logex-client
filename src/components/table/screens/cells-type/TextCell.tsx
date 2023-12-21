import React, { FC } from "react";

const TextCell: FC<{ text: string }> = ({ text }) => {
  return <span>{text}</span>;
};

export default TextCell;
