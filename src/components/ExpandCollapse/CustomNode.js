import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

import "./treeStyles.css";

export default memo(({ data, isConnectable }) => {
  const [hide, setHide] = useState(true);
  return (
    <>
      <div className="treeNode">
        <div
          className="node"
          onClick={() => {
            const newValue = !hide;
            setHide(newValue);
            data.handleClick({ id: data.key, shouldHide: hide });
          }}
        >
          <div className="node-heading">{data.label}</div>
        </div>
      </div>
      <Handle
        type="target"
        id="a"
        isConnectable={isConnectable}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
        style={{ background: "#555" }}
      />
    </>
  );
});
