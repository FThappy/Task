import * as React from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";
import styles from "./Panel.module.scss";

type Props = {};

const PanelForm = (props: Props) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const typeProductRef = React.useRef<HTMLInputElement>(null);
  const productRef = React.useRef<HTMLInputElement>(null);
  const commentRef = React.useRef<HTMLTextAreaElement>(null);

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
        <form>
          <label htmlFor="Title">Title</label>
          <input ref={titleRef} type="text" id="title" name="title" />
          <label htmlFor="typeProduct">Type Product</label>
          <input
            ref={typeProductRef}
            type="text"
            id="typeProduct"
            name="typeProduct"
          />
          <label htmlFor="product">Product</label>
          <input ref={productRef} type="text" id="product" name="product" />
          <label htmlFor="comment">Comment</label>
          <textarea ref={commentRef} id="comment" name="comment" />
        </form>
      </Panel>
    </div>
  );
};

export default PanelForm;
