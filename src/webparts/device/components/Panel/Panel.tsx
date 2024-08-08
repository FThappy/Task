import * as React from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";
import styles from './Panel.module.scss';

type Props = {};

const PanelForm = (props: Props) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  return (
    <div>
      <button className={`${styles.btnNewReq}`} onClick={openPanel}>New Request</button>
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
            <input type="text" id="title" name="title"/>
            <label htmlFor="typeProduct">Type Product</label>
            <input type="text" id="typeProduct" name="typeProduct"/>
            <label htmlFor="product">Product</label>
            <input type="text" id="product" name="product"/>
            <label htmlFor="comment">Comment</label>
            <textarea id="comment" name="comment"></textarea>
        </form>
      </Panel>
    </div>
  );
};

export default PanelForm;
