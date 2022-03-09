import React from "react";
import { Select, Col, Row, DatePicker, Input } from "antd";
import { Data, Explanation, Method, Model, Problem, Task } from "../types";

const { RangePicker } = DatePicker;
const { Search } = Input;

type FilterProps = {
  placeholder: string, enumerator: Record<number, string>
}

function Filter({placeholder, enumerator}: FilterProps): JSX.Element {

  function handleChange(value: any, option: any) {
    console.log("Enum", enumerator, Object.entries(enumerator))
    console.log("Value", value, "Option", option);
  }

  return (
    <Col span={4}>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder={placeholder}
        defaultValue={[]}
        onChange={handleChange}
        optionLabelProp="label"
      >
        {Object.values(enumerator).map((item: string, index: number) => (
          <Select value={item} key={index}>{item}</Select>
        ))}
      </Select>
    </Col>
  )
}

function Filters(): JSX.Element {

  return (
    <Row justify="end" gutter={4} style={{ marginTop: 10 }}>
      <Filter placeholder="Type of Data" enumerator={Data} />
      <Filter placeholder="Type of Problem" enumerator={Problem} />
      <Filter placeholder="Type of Model to be Explained" enumerator={Model} />
      <Filter placeholder="Type of Task" enumerator={Task} />
      <Filter placeholder="Type of Explanation" enumerator={Explanation} />
      <Filter placeholder="Method used to explain" enumerator={Method} />

      <Col>
        <RangePicker></RangePicker>
      </Col>

      <Col>
        <Search placeholder="input search text" style={{ width: 200 }} />
      </Col>
    </Row>
  )

}

export default Filters;
