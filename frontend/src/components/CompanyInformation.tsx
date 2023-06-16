import React from 'react';
import { Space, Table, Tag } from 'antd';
import { networkInterfaces } from 'os';

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  CompanyName: string;
  lastName: string;
  address: string;
  tags: string[];
  maintainence: Date;
}

const data: DataType[] = [
  {
    key: '1',
    CompanyName: 'John',
    lastName: 'Brown',
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    maintainence: new Date('12/JUN/2023'),
  },
  {
    key: '2',
    CompanyName: 'Jim',
    lastName: 'Green',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
    maintainence: new Date('15/JUN/2023'),
  },
  {
    key: '3',
    CompanyName: 'Joe',
    lastName: 'Black',
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    maintainence: new Date('1/JUN/2023'),
  },
];

const companyInformation: React.FC = () => (
  <Table dataSource={data}>
    <Column title="Company Name" dataIndex="CompanyName" key="CompanyName" />
    <Column title="Address" dataIndex="address" key="address" />
    
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_: any, record: DataType) => (
        <Space size="middle">
          <a>Invite {record.lastName}</a>
          <a>Delete</a>
        </Space>
      )}
    />
    <Column title="Last Maintanence Date" dataIndex="maintainence" key="maintainence" />
  </Table>

);

export default companyInformation;
