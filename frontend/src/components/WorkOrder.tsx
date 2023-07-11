import React, { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { DataType, data } from "../data/WorkOrderList";
import { Link } from "react-router-dom";

const columns: ColumnsType<DataType> = [
  {
    title: "Company Name",
    dataIndex: "Company",
    align: "center",
  },
  {
    title: "Orderer",
    dataIndex: "Orderer",
    align: "center",
  },
  {
    title: "Contact",
    dataIndex: "Contact",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "Email",
    align: "center",
  },
  {
    title: "Work Order Summary",
    dataIndex: "OrderSummary",
    align: "center",
  },
  {
    title: "Start Date",
    dataIndex: "StartDate",
    align: "center",
    sorter: (a, b) =>
      new Date(a.StartDate).valueOf() - new Date(b.StartDate).valueOf(),
  },
  {
    title: "End Date",
    dataIndex: "EndDate",
    align: "center",
    sorter: (a, b) =>
      new Date(a.StartDate).valueOf() - new Date(b.StartDate).valueOf(),
  },
  {
    title: "Status",
    key: "Status",
    dataIndex: "Status",
    align: "center",
  },
  {
    key: "Status",
    align: "center",
  },
];

const WorkOrder: React.FC = () => {
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>("large");
  const [showHeader, setShowHeader] = useState(true);
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<DataType> | undefined
  >({});
  const [tableLayout, setTableLayout] = useState();
  const [ellipsis, setEllipsis] = useState(false);
  const [dataList, setDataList] = useState([]);
  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));

  const tableProps: TableProps<DataType> = {
    bordered,
    loading,
    size,
    showHeader,
    rowSelection,
    tableLayout,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await data();
        setDataList(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <Link to="/addworkorder">
          <Button>
            <b>Click to add Work Order +</b>
          </Button>
        </Link>
      </div>
      <Table {...tableProps} columns={tableColumns} dataSource={dataList} />
    </>
  );
};

export default WorkOrder;
