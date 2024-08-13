import * as React from "react";
import * as pnp from "sp-pnp-js";

type Props = {
    ID:number
}

const FieldName = (props: Props) => {
    const { ID } = props;
    const [name, setName] = React.useState()
    React.useEffect(()=>{
        const getUser = async ()=>{
            try {
              if(ID ){
                const user = await pnp.sp.web.siteUsers.getById(ID ).get();
                setName(user.Title);
              }
            } catch (error) {
              console.error("Error fetching user: ", error);
              return "Unknown";
            }
          }
          getUser()
    },[ID])
  return (
    <p>{name}</p>
  )
}

export default FieldName