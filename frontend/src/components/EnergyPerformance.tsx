import { ColumnsType } from "antd/es/table";
import DemoColumn from "./DemoColumn";
import DemoGauge from "./DemoGauge";
import DemoLine from "./DemoLine";
import { Input, Space, Table, Tag } from "antd";
import axios from "axios";
import { useState } from "react";

interface table {
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string;
}

function EnergyPerformance() {
  const { Search } = Input;
  const [searchCompany, setSearchCompnay] = useState("");
  const onSearch = (value: string) => setSearchCompnay(value);

  const columns: ColumnsType<table> = [
    {
      title: "Serial Number",
      dataIndex: "name",
      key: "key",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
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

  const data: table[] = [
    {
      key: 1,
      name: "ABC",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "OK",
    },
    {
      key: 2,
      name: "CDE",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "WARNING",
    },
    {
      key: 3,
      name: "EFG",
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
        {searchCompany ? (
          <div>Overall Performace of {searchCompany}</div>
        ) : (
          <div>Please Search Company</div>
        )}
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
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
  );
}

export default EnergyPerformance;
