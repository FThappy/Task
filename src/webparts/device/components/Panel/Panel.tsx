import * as React from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";
import styles from "./Panel.module.scss";
import * as pnp from "sp-pnp-js";
import { DataProps } from "../dto/DataProps";
import { WareHouseProps } from "../dto/WareHouse";
import { UserProps } from "../dto/UserProps";
/* eslint-disable */

type Props = {
  data: DataProps[];
  setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
  user?: UserProps;
};

const PanelForm = (props: Props) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const { setData } = props;
  const titleRef = React.useRef<HTMLInputElement>(null);
  const productRef = React.useRef<HTMLSelectElement>(null);
  const commentRef = React.useRef<HTMLTextAreaElement>(null);
  const [typeProducts, setTypeProducts] = React.useState<WareHouseProps[]>([]);
  const [typeProduct, setTypeProduct] = React.useState<string>();
  const [products, setProducts] = React.useState<WareHouseProps[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        titleRef.current?.value === " " ||
        typeProduct === " " ||
        productRef.current?.value === " "
      ) {
        alert("Điều đẩy đủ thông tin");
        return;
      }
      const dataSend = {
        Title: titleRef?.current?.value,
        TypeProduct: typeProduct,
        Product: productRef.current?.value,
        Comment: commentRef.current?.value,
      };
      const res = await pnp.sp.web.lists
        .getByTitle("Ticket")
        .items.add(dataSend);
      const dataRes = {
        ID: res.data.Id,
        Title: res.data.Title,
        TypeProduct: res.data.TypeProduct,
        Product: res.data.Product,
        Comment: res.data.Comment,
        Status: res.data.Status,
        AuthorId: res.data.AuthorId,
        EditorId: res.data.EditorId,
      };
      setData((data) => [...data, dataRes]);
      alert("success");
      dismissPanel();
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  React.useEffect(() => {
    const fetchTypeProducts = async () => {
      try {
        const items = await pnp.sp.web.lists
          .getByTitle("TypeProduct")
          .items.select("Title")
          .get();
          console.log(items)
        setTypeProducts(items);
      } catch (error) {
        console.error("Error fetching type products: ", error);
      }
    };

    fetchTypeProducts();
  }, []);
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = pnp.sp.web.lists.getByTitle("Warehouse").items;
        // Chỉ áp dụng filter khi typeProduct có giá trị
        if (typeProduct) {
          query = query.filter(`TypeProduct eq '${typeProduct}'`);
        }
        const items = await query.get();
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [typeProduct]);

  return (
    <div>
      <button className={`${styles.btnNewReq}`} onClick={openPanel}>
        New Request
      </button>
      <Panel
        headerText="New Item"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        type={PanelType.medium}
        closeButtonAriaLabel="Close"
      >
        <p>Content goes here.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Title">
            Title<span style={{ color: "red" }}>*</span>
          </label>
          <input ref={titleRef} type="text" id="title" name="title" />
          <label htmlFor="typeProduct">
            Type Product<span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="typeProduct"
            name="typeProduct"
            onChange={(e) => {
              setTypeProduct(e.target.value);
            }}
          >
            <option value="">Type Device</option>
            {typeProducts.map((item, index) => (
              <option key={index} value={item.Title}>
                {item.Title}
              </option>
            ))}
          </select>
          <label htmlFor="product">
            Product<span style={{ color: "red" }}>*</span>
          </label>
          {/* <input ref={productRef} type="text" id="product" name="product" /> */}
          <select id="product" name="product" ref={productRef}>
            <option value="">Device</option>
            {products.map((item, index) => (
              <option key={index} value={item.Title}>
                {item.Title}
              </option>
            ))}
            {products.length <= 0 && <option value="Mua Mới">Mua Mới</option>}
          </select>
          <label htmlFor="comment">Comment</label>
          <textarea ref={commentRef} id="comment" name="comment" />
          <button className={styles.btnNewReq} style={{ marginTop: "0.5rem" }}>
            Create Request
          </button>
        </form>
      </Panel>
    </div>
  );
};

export default PanelForm;
