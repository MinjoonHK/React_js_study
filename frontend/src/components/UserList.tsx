import React, { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DataType, data } from "../data/UserList";
import axios from "axios";
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
    filters: [
      {
        text: "User",
        value: "User",
      },
      {
        text: "Admin",
        value: "Admin",
      },
    ],

    onFilter: (value: string, record) => record.Role.indexOf(value) === 0,
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
    filters: [
      {
        text: "Active",
        value: "Active",
      },
      {
        text: "Deactivated",
        value: "Deactivated",
      },
    ],

    onFilter: (value: string, record) => record.isActive.indexOf(value) === 0,
    render: (_, { isActive }) => (
      <>
        {isActive === "Active" && (
          <Tag color="success" key={isActive}>
            {isActive}
          </Tag>
        )}
        {isActive === "Deactivated" && (
          <Tag color="error" key={isActive}>
            {isActive}
          </Tag>
        )}
      </>
    ),
  },
];

const UserList: React.FC = () => {
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [size, setSize] = useState<SizeType>("large");
  const [bordered, setBordered] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
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

  const DeactivateUser = async () => {
    try {
      const res = await axios.post("/dashboard/deactivateuser", {
        params: { DeactivateUserList: selectedRowKeys },
      });
      if (res.status == 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ActivateUser = async () => {
    try {
      const res = await axios.post("/dashboard/activateuser", {
        params: { ActivateUserList: selectedRowKeys },
      });
      if (res.status == 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
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
        <Button onClick={ActivateUser}>
          <b>Activate Selected User</b>
        </Button>
        <span style={{ marginLeft: "15px" }}>
          <Button onClick={DeactivateUser}>
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
