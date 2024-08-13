import * as React from "react";
import * as pnp from "sp-pnp-js";
import styles from "./Table.module.scss";
import { IIconProps, CommandBarButton } from "@fluentui/react";
import EditPanelForm from "../EditPanel/EditPanel";
import { DataProps } from "../dto/DataProps";
import FieldName from "./FieldName";
import { UserProps } from "../dto/UserProps";

type Props = {
  data: DataProps[];
  setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
  user: UserProps;
};

const deleteIcon: IIconProps = { iconName: "Delete" };

const Table = (props: Props) => {
  const { data, setData, user } = props;

  console.log(user.Role);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pnp.sp.web.lists
          .getByTitle("Ticket")
          .items.get();
        setData(response);
      } catch (error) {
        console.error("Error fetching columns: ", error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (e: any, ID: number) => {
    e.preventDefault();
    try {
      await pnp.sp.web.lists.getByTitle("Ticket").items.getById(ID).delete();
      setData(data.filter((item) => item.ID !== ID));
      alert("success");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  const updateData = (
    ID: number,
    comment?: string,
    title?: string,
    typeProduct?: string,
    product?: string,
    status?: string
  ) => {
    setData((data) => {
      const newData = data.map((item) => {
        if (item.ID === ID) {
          item.Status = status ?? item.Status;
          item.Comment = comment ?? item.Comment;
          item.Title = title ?? item.Title;
          item.TypeProduct = typeProduct ?? item.TypeProduct;
          item.Product = product ?? item.Product;
        }
        return item;
      });
      return [...newData];
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>TypeProduct</th>
            <th>Product</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Create By</th>
            <th>Update By</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.ID}</td>
                <td>{item.Title}</td>
                <td>{item.TypeProduct}</td>
                <td>{item.Product}</td>
                <td>{item.Comment}</td>
                <td>
                  <p
                    className={
                      styles[`status${item.Status}` as keyof typeof styles]
                    }
                  >
                    {item.Status}
                  </p>
                </td>
                <td>
                  <FieldName ID={item.AuthorId} />
                </td>
                <td>
                  <FieldName ID={item.EditorId} />
                </td>
                <td>
                  {user && (
                    <>
                      {(user.Role !== "Employee" || item.Status === "New") && (
                        <EditPanelForm
                          user={user}
                          data={item}
                          updateData={updateData}
                        />
                      )}
                      {/* Hiển thị CommandBarButton chỉ khi Role không phải là "Employee" */}
                      {user.Role !== "Employee" && (
                        <CommandBarButton
                          iconProps={deleteIcon}
                          className={`${styles.commandBarButton} ${styles.commandBarButtonDelete}`}
                          onClick={(e) => handleDelete(e, item.ID)}
                        />
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>
                <div className={styles.loaderContainer}><div className={styles.loader}></div></div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
