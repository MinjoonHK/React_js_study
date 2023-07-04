import { ColumnsType } from "antd/es/table";
import DemoColumn from "./DemoColumn";
import DemoGauge from "./DemoGauge";
import DemoLine from "./DemoLine";
import { Input, Space, Select, Table, Tag, Button } from "antd";
import { DataType, data } from "../data/SiteList";
import { useEffect, useState } from "react";

interface table {
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string;
}

const columns: ColumnsType<table> = [
  {
    title: "Serial Number",
    dataIndex: "name",
    key: "key",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Average Daily Power Generation (KWH)",
    dataIndex: "age",
    key: "age",
    align: "center",
  },
  {
    title: "Min / Max Power Generation",
    dataIndex: "age",
    key: "age",
    align: "center",
  },
  {
    title: "Total Daily Generation (KWH)",
    dataIndex: "address",
    key: "address",
    align: "center",
  },
  {
    title: "AC voltage (Vac)",
    dataIndex: "address",
    key: "address",
    align: "center",
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    align: "center",
    render: (_, { tags }) => (
      <>
        {tags === "OK" && (
          <Tag color="success" key={tags}>
            {tags}
          </Tag>
        )}
        {tags === "WARNING" && (
          <Tag color="warning" key={tags}>
            {tags}
          </Tag>
        )}
        {tags === "ERROR" && (
          <Tag color="error" key={tags}>
            {tags}
          </Tag>
        )}
      </>
    ),
  },
];

function DailyEnergyPerformance() {
  const [searchCompany, setSearchCompnay] = useState("");
  const [nameList, setNameList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const onChange = (value: string) => setSearchCompnay(value);
  const options = nameList.map((name) => ({
    value: name,
    label: name,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await data();
        const locations = result.map((item) => item.Location);
        setNameList(locations);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  function changeState() {
    setSearchCompnay("");
  }
  return (
    <div>
      {searchCompany ? (
        <div>
          <div style={{ width: "100%", textAlign: "left" }}>
            <Button onClick={changeState}>Back to search</Button>
          </div>
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>
            Daily Energy Performance at {searchCompany}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "4%",
            }}
          ></div>
          <Table columns={columns} pagination={false} />
          <div>
            {/* <div>
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
        </div> */}
          </div>
        </div>
      ) : (
        <Select
          showSearch
          style={{ width: "500px" }}
          placeholder="Select or Search Site Name"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={options}
        />
      )}
    </div>
  );
}

export default DailyEnergyPerformance;
