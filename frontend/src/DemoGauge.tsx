import { Gauge, GaugeConfig} from '@ant-design/plots';

const DemoGauge = () => {
  const config : GaugeConfig = {
    percent: 0.75,
    range: {
      color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    statistic: {
      title: {
        offsetY: -100,
        style: {
          fontSize: '36px',
          color: '#4B535E',
        },
        formatter: () => '70%',
      },
      content: {
        offsetY: 50,
        style: {
          fontSize: '24px',
          lineHeight: '44px',
          color: '#4B535E',
        },
        formatter: () => 'Speed Gauge',
      },
    },
  };
  return <Gauge {...config} />;
};

export default DemoGauge;
