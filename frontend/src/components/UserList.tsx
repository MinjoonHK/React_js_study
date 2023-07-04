import React, { useEffect, useState } from "react";
import { Button, Dropdown, MenuProps, Space, Table, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DataType, data } from "../data/UserList";
import { Link } from "react-router-dom";

const columns: ColumnsType<DataType> = [
  {
    title: "User Name",
    dataIndex: "FirstName",
    align: "center",
  },
  {
    title: "Role",
    dataIndex: "Role",
    align: "center",
  },
  {
    title: "Company",
    dataIndex: "Company",
    align: "center",
  },
  {
    title: "Contact",
    dataIndex: "PhoneNumber",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "Email",
    align: "center",
  },
  {
    title: "Joined Date",
    dataIndex: "Created_at",
    align: "center",
    sorter: (a, b) =>
      new Date(a.Created_at).valueOf() - new Date(b.Created_at).valueOf(),
  },
  {
    title: "Status",
    key: "isActive",
    dataIndex: "isActive",
    align: "center",
    render: (_, { isActive }) => (
      <>
        {isActive === "Active" && (
          <Tag color="success" key={isActive}>
            {isActive}
          </Tag>
        )}
      </>
    ),
  },
];

const userDropdown: MenuProps["items"] = [
  {
    label: (
      <div style={{ fontWeight: "bold", textDecoration: "none" }}>
        Activate Selected User
      </div>
    ),
    key: "0",
  },
  {
    label: (
      <div style={{ fontWeight: "bold", textDecoration: "none" }}>
        Deactivate Selected User
      </div>
    ),
    key: "1",
  },
];

const UserList: React.FC = () => {
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bordered, setBordered] = useState(false);
  const [size, setSize] = useState<SizeType>("large");
  const [showHeader, setShowHeader] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [tableLayout, setTableLayout] = useState();
  const [ellipsis, setEllipsis] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await data();
        setDataList(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  const tableProps: TableProps<DataType> = {
    bordered,
    loading,
    size,
    showHeader,
    tableLayout,
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <Button>
          <b>Activate Selected User</b>
        </Button>
        <span style={{ marginLeft: "15px" }}>
          <Button>
            <b>Deactivate Selected User</b>
          </Button>
        </span>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        {...tableProps}
        columns={tableColumns}
        dataSource={dataList}
      />
    </>
  );
};

export default UserList;
