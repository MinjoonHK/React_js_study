import Table, { ColumnsType } from "antd/es/table";
import DemoColumn from "./DemoColumn";
import DemoGauge from "./DemoGauge";
import DemoLine from "./DemoLine";
import { Input, Tag } from "antd";

interface table {
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string;
}

function MonthlyEnergyPerformance() {
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const columns: ColumnsType<table> = [
    {
      title: "Serial Number",
      dataIndex: "key",
      key: "key",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Average Monthly Power Generation (KWH)",
      dataIndex: "age",
      key: "age",
      align: "center",
    },
    {
      title: "Total Power Generation (KWH)",
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
    {
      title: "AC voltage (Vac)",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
  ];

  const data: table[] = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "OK",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "WARNING",
    },
    {
      key: 3,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: "ERROR",
    },
  ];
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          marginTop: "0.5%",
          marginBottom: "2%",
        }}
      >
        <Search
          placeholder="input Company Name"
          style={{ width: "350px" }}
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={onSearch}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "20px",
          marginBottom: "4%",
        }}
      >
        Monthly Energy Performance Company Name
      </div>
      <Table columns={columns} dataSource={data} />
      <div>
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

export default MonthlyEnergyPerformance;
