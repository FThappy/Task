
import * as React from 'react';
import type { IDeviceProps } from './IDeviceProps';
import styles from './Device.module.scss';
import Pivot from './Pivot/Pivot';
import Table from './Table/Table';
import PanelForm from './Panel/Panel';
// import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const HelloWorld: React.FC<IDeviceProps > = (props: any) => {
  const [tabName , setTabName] = React.useState<string>("Home")
  // const [lists, setLists] = React.useState([]);
  // const [selectedList, setSelectedList] = React.useState<string | number>();

  React.useEffect(() => {
    const fetchList = async () => {

    }
    fetchList();
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Support Device</h1>
      <div className={`${styles.headLayout}`}>
        <PanelForm />
        <Pivot tabName={tabName} setTabName={setTabName}/>
      </div>
      <Table />
    </div>
  );
};

export default HelloWorld;