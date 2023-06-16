import DemoColumn from "./DemoColumn";
import DemoGauge from "./DemoGauge";
import DemoLine from "./DemoLine";
import styles from '../css/Dashboard.module.css'

function EnergyPerformance(){
    return(
    <div>
    <div className={styles.wrapper}>
            <div><DemoLine/></div>
            <div><DemoLine/></div>
            <div><DemoLine/></div>
            <div><DemoLine/></div>
            <div><DemoColumn/></div>
          <div><DemoGauge/></div>
          </div>
    </div>
    )
}


export default EnergyPerformance;