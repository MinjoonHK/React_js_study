import { Column } from '@ant-design/plots';

const DemoColumn = () => {
  const data = [
    {
      type: 'January',
      sales: 38,
    },
    {
      type: 'February',
      sales: 52,
    },
    {
      type: 'March',
      sales: 61,
    },
    { 
      type: 'April',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'June',
      sales: 38,
    },
    {
      type:'July',
      sales: 38,
    },
    {
      type: 'August',
      sales: 38,
    },
    {
      type: 'September',
      sales: 38,
    },
    {
      type: 'October',
      sales: 38,
    },
    {
      type: 'November',
      sales: 55,
    },
    {
      type: 'December',
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return <Column {...config} />;
};

export default DemoColumn;