import DemoColumn from "./DemoColumn";
import DemoGauge from "./DemoGauge";
import DemoLine from "./DemoLine";
import styles from "../css/Dashboard.module.css";
import Search from "antd/es/input/Search";
import { Input } from "antd";

function EnergyPerformance() {
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  return (
    <div>
      <div style={{ margin: "20px 0" }}>
        <Search
          placeholder="input Company Name"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={onSearch}
        />
      </div>
      <div className={styles.wrapper}>
        <div>
          <DemoLine />
        </div>
        <div>
          <DemoLine />
        </div>
        <div>
          <DemoLine />
        </div>
        <div>
          <DemoLine />
        </div>
        <div>
          <DemoColumn />
        </div>
        <div>
          <DemoGauge />
        </div>
      </div>
    </div>
  );
}

export default EnergyPerformance;
