import React from "react";
import { Select, Button, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Data, Explanation, Problem, Model, Task, Method } from "../types";

const { Option } = Select;
const options = { Data, Explanation, Problem, Model, Task, Method };

function handleChange(value) {
  console.log(value);
}

function CustomOption(data) {
  const dataOptions = Object.values(data).map((item) => (
    <Select value={item}>{item}</Select>
  ));
  return dataOptions;
}

function CreateSelect() {
  const placeholder = ["Type of Data","Type of Problem","Type of Model to be Explained",
  "Type of Task","Type of Explanation","Method used to explain"]
  const select = Object.values(options).map((item, index) => (
    <Col span={4}>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder={placeholder[index]}
        defaultValue={[]}
        onChange={handleChange}
        optionLabelProp="label"
      >
        {CustomOption(item)}
      </Select>
    </Col>
  ));
  return select;
}

function CreateSelect2() {
  const select = (
    <Col span={8}>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Choose filter"
        defaultValue={[]}
        onChange={handleChange}
        optionLabelProp="label"
      >
        {CustomOption(Data)}
      </Select>
    </Col>
  );
  return select;
}

export default CreateSelect;
