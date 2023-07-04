const ARR = [
  {
    id: 3,
    title: "In Progress",
    items: [
      { id: 3, title: "User page – performance issues" },
      { id: 4, title: "Main page – performance issues" },
    ],
  },
  {
    id: 4,
    title: "Finished",
    items: [{ id: 4, title: "Main page – performance issues" }],
  },
];

const IDISHNICK = 3;

const TEST = (ARR) => {
  ARR.map((desk) => {
    if (desk.id === 3) {
      items.filter((item) => item.id !== IDISHNICK);
    }
  });
};

console.log(ARR);