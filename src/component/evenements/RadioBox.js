import React, { useState } from "react";
import { Collapse, Radio } from "antd";
import SearchIcon from "@material-ui/icons/Search";
const { Panel } = Collapse;

const RadioBox = (props) => {
  const [Value, setValue] = useState(0);

  const renderRadioBox = () =>
    props.Start_date &&
    props.Start_date.map((value) => (
      <span key={value._id}>
        <Radio array={value.array} value={`${value._id}`}>
          {value.name}
        </Radio>
        <br />
        <br />
      </span>
    ));
  const handleChange = (e) => {
    setValue(e.target.value);

    props.refrechDate(e.target.array);
    props.handlefiltres(e.target.value);
  };
  const handleChangeDate = (e) => {
    props.refrechDate([
      new Date(e.target.value.replace(/-0+/g, "-")).getTime(),
      new Date(e.target.value.replace(/-0+/g, "-")).getTime(),
    ]);
  };
  return (
    <div style={{ marginTop: 30 }}>
      <Collapse style={{ minWidth: 150 }} defaultActiveKey={["0", "1"]}>
        <Panel disabled={true} forceRender={false} header="Date" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
          <br />
          <span style={{ display: "flex" }}>
            <input
              style={{ width: "85%", marginTop: 10 }}
              onChange={handleChangeDate}
              type="date"
            />
            <SearchIcon
              style={{
                cursor: "pointer",
                color: "red",
                marginTop: 15,
                marginLeft: 8,
              }}
              onClick={props.serach}
            />
          </span>
        </Panel>
      </Collapse>
    </div>
  );
};

export default RadioBox;
