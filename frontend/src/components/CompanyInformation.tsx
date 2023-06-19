import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Form, Radio, Space, Switch, Table, Tag } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { ExpandableConfig, TableRowSelection } from 'antd/es/table/interface';
import { DataType, data } from '../CompanyList';
import { Link } from 'react-router-dom';



const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: 'CompanyName',
    dataIndex: 'CompanyName',
    align: 'center',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'tags',
    key: 'tags',
    align: 'center',
    filters: [
      {
        text: 'Success',
        value: 'success',
      },
      {
        text: 'Error',
        value: 'error',
      },
      {
        text: 'Warning',
        value: 'warning',
      },
    ],
    onFilter: (value, record) => record.tags.indexOf(value as string) === 0,
    render: (tags: string) => (
      <>
        {tags === 'success' && (
          <Tag color="success" key={tags}>
            {tags}
          </Tag>
        )}
        {tags === 'warning' && (
          <Tag color="warning" key={tags}>
            {tags}
          </Tag>
        )}
        {tags === 'error' && (
          <Tag color="error" key={tags}>
            {tags}
          </Tag>
        )}
      </>
    ),
  },
  {
    title: 'Last maintainance date',
    align: 'center',
    dataIndex: 'maintainence',
    sorter: (a, b) => new Date(a.maintainence).valueOf() - new Date(b.maintainence).valueOf()
  },
  {
    title: 'Contact',
    align: 'center',
    dataIndex: 'contact',
    // sorter: (a, b) => a.age - b.age,
  },
];


const defaultTitle = () => 'Here is title';

const App: React.FC = () => {
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>('large');
  const [showHeader, setShowHeader] = useState(true);
  const [rowSelection, setRowSelection] = useState<TableRowSelection<DataType> | undefined>({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>();

 
  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  const tableProps: TableProps<DataType> = {
    bordered,
    loading,
    size,
    showHeader,
    rowSelection,
    scroll,
    tableLayout,
  };

  return (
    
    <>
    <div style={{textAlign:'left', marginBottom:'20px',}}><Link to="/addCompany"><Button><b>Click to Add company list +</b></Button></Link></div>
        <Table
        {...tableProps}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
      />
    </>
  );
};

export default App;