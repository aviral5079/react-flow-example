import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";

import "../../index.css";

import data from "./data";

const nodeTypes = {
  customNode: CustomNode,
};

const adjList = {};
const CustomNodeFlow = () => {
  const [clicked, setClicked] = useState({ id: null, shouldHide: false });

  const handleClick = ({ id, shouldHide }) => {
    // console.log(id, shouldHide);
    setClicked({ id: id, shouldHide: shouldHide });
  };

  const helper = (number) => {
    const base = "A".charCodeAt(0);
    let result = "";

    while (number > 0) {
      const remainder = (number - 1) % 26;
      result = String.fromCharCode(base + remainder) + result;
      number = Math.floor((number - 1) / 26);
    }

    return result;
  };

  const initialNodes = [
    {
      id: "0",
      type: "customNode",
      position: { x: 5000, y: 20 },
      data: { label: data.title, key: "0", handleClick: handleClick },
      style: {
        width: 200,
        height: 70,
      },
    },
  ];

  adjList["0"] = [];

  const initialEdges = [];
  let xIndex = 230;
  let xI = 10;

  for (let index = 0; index < data.chapters.length; index++) {
    const chapter = data.chapters[index];
    let id = String(index + 1);
    initialNodes.push({
      id: String(index + 1),
      type: "customNode",
      position: { x: xIndex, y: 340 },
      data: { label: chapter.title, key: id, handleClick: handleClick },
      style: {
        width: 200,
        height: 70,
      },
    });

    initialEdges.push({
      id: "e0-" + String(index + 1),
      source: "0",
      target: id,
      sourceHandle: "b",
      targetHandle: "a",
    });

    adjList["0"].push(id);
    adjList[`${index + 1}`] = [];

    let count = 1;
    for (const key of Object.keys(chapter.content)) {
      let temp = helper(count++);
      let id = String(index + 1) + temp;
      initialNodes.push({
        id: id,
        type: "output",
        position: { x: xI, y: 660 },
        data: { label: key, key: id },
        style: {
          width: 200,
        },
      });

      let edge_id = `e${index + 1}-${id}`;

      initialEdges.push({
        id: edge_id,
        source: String(index + 1),
        target: String(index + 1) + temp,
        sourceHandle: "b",
      });

      adjList[`${index + 1}`].push(id);

      xI += 240;
    }

    if (index !== data.chapters.length - 1) {
      const len1 = Object.keys(data.chapters[index].content).length * 240;
      const len2 = Object.keys(data.chapters[index + 1].content).length * 240;
      const inc = len1 / 2 + 20 + len2 / 2;
      xIndex += inc;
    }
    xI += 20;
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  useEffect(() => {
    // console.log(adjList);
    const startingVertex = clicked.id;
    const nodesList = [];
    const edgesList = [];
    const visited = {};
    const queue = [startingVertex];

    visited[startingVertex] = true;

    while (queue.length) {
      const currentVertex = queue.shift();
      nodesList.push(currentVertex);

      adjList[currentVertex]?.forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
          const edge = `e${currentVertex}-${neighbor}`;
          edgesList.push(edge);
        }
      });
    }

    nodesList.shift();
    // console.log(nodesList);
    // console.log(edgesList);

    setNodes((nds) =>
      nds.map((node) => {
        if (nodesList.includes(node.id)) {
          // console.log(`hide ${node.id}`);
          node.hidden = clicked.shouldHide;
        }

        return node;
      })
    );

    setEdges((eds) =>
      eds.map((edge) => {
        if (edgesList.includes(edge.id)) {
          // console.log(`hide ${edge.id}`);
          edge.hidden = clicked.shouldHide;
        }

        return edge;
      })
    );
  }, [clicked]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
