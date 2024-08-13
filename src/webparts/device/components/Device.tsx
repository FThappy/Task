
import * as React from 'react';
import type { IDeviceProps } from './IDeviceProps';
import styles from './Device.module.scss';
import Pivot from './Pivot/Pivot';
import * as pnp from "sp-pnp-js";
import Table from './Table/Table';
import PanelForm from './Panel/Panel';
import { DataProps } from './dto/DataProps';
import { UserProps } from './dto/UserProps';
// import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const HelloWorld: React.FC<IDeviceProps > = (props: any) => {
  const [tabName , setTabName] = React.useState<string>("Home")
  const [data, setData] = React.useState<DataProps[]>([]);
  const [user, setUser] = React.useState<UserProps[]>([])

  // const [lists, setLists] = React.useState([]);
  // const [selectedList, setSelectedList] = React.useState<string | number>();

  React.useEffect(() => {
    const fetchList = async () => {
       const user = await pnp.sp.web.currentUser.get()
       const infoUser = await pnp.sp.web.lists
       .getByTitle("User")
       .items
       .filter(`Name eq '${user.Title}'`)
       .get();
       setUser(infoUser);
    }
    fetchList();
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Support Device</h1>
      <div className={`${styles.headLayout}`}>
      {user.length > 0 &&  <PanelForm user={user[0]} data={data} setData={setData}/>}
      {user.length > 0 &&  <Pivot user={user[0]} tabName={tabName} setTabName={setTabName}/>}
      </div>
      {user.length > 0 &&       <Table user={user[0]} data={data} setData={setData}/>
    }
    </div>
  );
};

export default HelloWorld;