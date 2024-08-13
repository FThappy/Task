import * as React from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";
import styles from "./EditPanel.module.scss";
import * as pnp from "sp-pnp-js";
import { CommandBarButton, IIconProps } from "@fluentui/react";
import { DataProps } from "../dto/DataProps";
import { UserProps } from "../dto/UserProps";

type Props = {
  data: DataProps;
  updateData: (
    ID: number,
    comment: string,
    title?: string,
    typeProduct?: string,
    product?: string,
    status?: string
  ) => void;
  user: UserProps;
};

const editIcon: IIconProps = { iconName: "Edit" };

const EditPanelForm = (props: Props) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  const { data, updateData, user } = props;
  const [comment, setComment] = React.useState<string>(data.Comment);
  const [title, setTitle] = React.useState<string>(data.Title);
  const [typeProduct, setTypeProduct] = React.useState<string>(
    data.TypeProduct
  );
  const [product, setProduct] = React.useState<string>(data.Product);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    status: string
  ) => {
    e.preventDefault();
    try {
      if (!user || (user.Role === "Employee" && data.Status === "New")) {
        alert("You don't have permission to edit this request");
        return;
      }
      await pnp.sp.web.lists
        .getByTitle("Ticket")
        .items.getById(data.ID)
        .update({ Comment: comment, Status: status });
      updateData(data.ID, comment, undefined, undefined, undefined, status);
      dismissPanel();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await pnp.sp.web.lists
        .getByTitle("Ticket")
        .items.getById(data.ID)
        .update({
          Comment: comment,
          Title: title,
          TypeProduct: typeProduct,
          Product: product,
          Status: data.Status,
        });
      updateData(data.ID, comment, title, typeProduct, product, undefined);
      dismissPanel();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <div>
      <CommandBarButton
        iconProps={editIcon}
        className={`${styles.commandBarButton} ${styles.commandBarButtonEdit}`}
        onClick={openPanel}
      />
      <Panel
        headerText="New Item"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        type={PanelType.medium}
        closeButtonAriaLabel="Close"
      >
        <p>Content goes here.</p>
        <form>
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            disabled={user.Role !== "Employee"}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="typeProduct">Type Product</label>
          <input
            type="text"
            id="typeProduct"
            name="typeProduct"
            value={typeProduct}
            disabled={user.Role !== "Employee"}
            onChange={(e) => setTypeProduct(e.target.value)}
          />
          <label htmlFor="product">Product</label>
          <input
            type="text"
            id="product"
            name="product"
            value={product}
            disabled={user.Role !== "Employee"}
            onChange={(e) => setProduct(e.target.value)}
          />
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {user && user.Role !== "Employee" ? (
            <div className="" style={{ display: "flex", width: "full" }}>
              {!(user.Role === "Manage" && data.Status === "Pending") && (
                <button
                  className={styles.btnNewReq}
                  style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSubmit(
                      e,
                      user.Role === "President" ? "Process" : "Pending"
                    )
                  }
                >
                  Accept
                </button>
              )}

              {user.Role === "Manage" && data.Status === "Pending" && (
                <button
                  className={styles.btnNewReq}
                  style={{
                    marginTop: "0.5rem",
                    marginRight: "0.5rem",
                    backgroundColor: "blue",
                  }}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSubmit(e, "Approve")
                  }
                >
                  Aprove
                </button>
              )}
              <button
                className={styles.btnNewReq}
                style={{
                  marginTop: "0.5rem",
                  marginRight: "0.5rem",
                  backgroundColor: "red",
                }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleSubmit(e, "Reject")
                }
              >
                Reject
              </button>
            </div>
          ) : (
            <button
              className={styles.btnNewReq}
              style={{
                marginTop: "0.5rem",
                marginRight: "0.5rem",
                backgroundColor: "green",
              }}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleUpdate(e)
              }
            >
              Update
            </button>
          )}
        </form>
      </Panel>
    </div>
  );
};

export default EditPanelForm;
