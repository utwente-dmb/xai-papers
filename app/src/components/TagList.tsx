import React from "react";
import { Tag } from "antd";

type TagProps = {
  TagData: Array<String>;
  Color:
    | "pink"
    | "red"
    | "yellow"
    | "orange"
    | "cyan"
    | "green"
    | "blue"
    | "purple"
    | "geekblue"
    | "magenta"
    | "volcano"
    | "gold"
    | "lime"
    | "success"
    | "processing"
    | "error"
    | "default"
    | "warning"
    | string
    | undefined;
};

function TagList({ TagData, Color }: TagProps): JSX.Element {
  const TagList = TagData.map((item, index) => (
    <Tag color={Color} key={index}>
      {item}
    </Tag>
  ));
  return <>{TagList}</>;
}

export default TagList;
