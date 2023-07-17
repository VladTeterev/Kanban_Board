import Backlog from "../Boards/Backlog/Backlog";
import OtherBoard from "../Boards/OtherBoards/OtherBoards";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./MainHomePage.css";

const MainHomePage = ({
  boardsData,
  addTaskBacklog,
  changeCardStage,
  getOpenTask,
}) => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="board-container">
          <Backlog
            key={boardsData[0].id}
            boardData={boardsData[0]}
            addTask={addTaskBacklog}
            getOpenTask={getOpenTask}
          />
          <OtherBoard
            boardData={boardsData[1]}
            prevBoardData={boardsData[0]}
            addTask={changeCardStage}
            getOpenTask={getOpenTask}
          />
          <OtherBoard
            boardData={boardsData[2]}
            prevBoardData={boardsData[1]}
            addTask={changeCardStage}
            getOpenTask={getOpenTask}
          />
          <OtherBoard
            boardData={boardsData[3]}
            prevBoardData={boardsData[2]}
            addTask={changeCardStage}
            getOpenTask={getOpenTask}
          />
        </div>
      </main>
      <Footer boardsData={boardsData} />
    </>
  );
};

export default MainHomePage;
