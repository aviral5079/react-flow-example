import data from "./data";

const helper = (number) => {
  const base = "A".charCodeAt(0) - 1;
  let result = "";

  while (number > 0) {
    const remainder = (number - 1) % 26;
    result = String.fromCharCode(base + remainder) + result;
    number = Math.floor((number - 1) / 26);
  }

  return result;
};

const nodes = [
  {
    id: "0",
    position: { x: 10, y: 20 },
    data: { label: data.title },
    type: "input",
    style: {
      width: 200,
    },
  },
];

const edges = [];
let xIndex = 10;
let yIndex = 300;

for (let index = 0; index < data.chapters.length; index++) {
  const chapter = data.chapters[index];
  let id = String(index + 1);
  nodes.push({
    id: String(index + 1),
    type: "customNode",
    position: { x: xIndex, y: yIndex },
    data: { label: chapter.title, key: id },
    style: {
      width: 200,
      height: 70,
    },
  });

  edges.push({
    id: "e0-" + String(index),
    source: "0",
    target: String(index + 1),
    targetHandle: "a",
  });

  let count = 1;
  for (const key of Object.keys(chapter.content)) {
    let temp = helper(count++);
    let id = String(index + 1) + temp;
    nodes.push({
      id: id,
      type: "output",
      position: { x: xIndex, y: yIndex + 200 },
      data: { label: key, key: id },
      style: {
        width: 200,
      },
    });

    edges.push({
      id: `e${index + 1}- ${String(index + 1) + helper(count)}`,
      source: String(index + 1),
      target: String(index + 1) + temp,
      sourceHandle: "b",
    });
  }

  xIndex += 240;
}

export const initialNodes = nodes;

export const initialEdges = edges;
