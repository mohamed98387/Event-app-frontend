import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

const CheckBox = (props) => {
  const [Checked, setChecked] = useState([]);
  const handleChange = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handlefiltres(newChecked);
  };
  const renderCheckBox = () =>
    props.Type_event &&
    props.Type_event.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleChange(value._id)}
          type="checkbox"
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span style={{ marginRight: 20 }}> {value.value} </span>
        <br />
        <br />
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse style={{ minWidth: 150 }} defaultActiveKey={["0", "1"]}>
        <Panel
          disabled={true}
          forceRender={false}
          header="Type d'événement"
          key="1"
        >
          {renderCheckBox()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CheckBox;
