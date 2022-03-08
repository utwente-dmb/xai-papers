import React from "react";
import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Explanation } from "../types";

const { Option } = Select;

const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};

function handleChange(value: string[]) {
  console.log(Explanation);
}

function CustomDropDown() {
  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="Choose filter"
      defaultValue={[]}
      onChange={handleChange}
      optionLabelProp="label"
    >
      <Option value="china" label="China">
        <div className="demo-option-label-item">
          <span role="img" aria-label="China">
            🇨🇳
          </span>
          China (中国)
        </div>
      </Option>
      <Option value="usa" label="usa">
        <div className="demo-option-label-item">
          <span role="img" aria-label="USA">
            🇺🇸
          </span>
          USA (美国)
        </div>
      </Option>
      <Option value="japan" label="Japan">
        <div className="demo-option-label-item">
          <span role="img" aria-label="Japan">
            🇯🇵
          </span>
          Japan (日本)
        </div>
      </Option>
      <Option value="korea" label="Korea">
        <div className="demo-option-label-item">
          <span role="img" aria-label="Korea">
            🇰🇷
          </span>
          Korea (韩国)
        </div>
      </Option>
    </Select>
  );
}

export default CustomDropDown;
