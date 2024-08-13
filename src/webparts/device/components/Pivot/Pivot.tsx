import * as React from 'react';
import styles from './Pivot.module.scss';
import { UserProps } from '../dto/UserProps';


type Props = {
   tabName : string;
   setTabName : React.Dispatch<React.SetStateAction<string>>;
   user? : UserProps;
}

const Pivot = (props: Props) => {
    const { tabName , setTabName } = props;
  return (
    <div className={styles.layout}>
        <button className={`${styles.btnTabbar} ${tabName ==='Home' && styles.btnActiveTabbar}`} onClick={() => setTabName('Home')}>Home</button>
        <button className={`${styles.btnTabbar} ${tabName ==='My Request' && styles.btnActiveTabbar}`} onClick={() => setTabName('My Request')}>My Request</button>
    </div>
  )
}

export default Pivot