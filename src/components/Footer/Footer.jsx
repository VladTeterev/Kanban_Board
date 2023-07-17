import "./Footer.css";

const Footer = ({ boardsData }) => {
  // Сумма активных задач
  const numberOfActiveTasks = () => {
    let sumItems =
      boardsData[0].items.length +
      boardsData[1].items.length +
      boardsData[2].items.length;
    if (sumItems) {
      return sumItems;
    } else {
      return 0;
    }
  };
  return (
    <footer className="footer">
      <span>Active tasks: {numberOfActiveTasks()}</span>
      <span>Finished tasks: {boardsData[3].items.length}</span>
      <span>Kanban board by Vlad, 2023</span>
    </footer>
  );
};

export default Footer;
