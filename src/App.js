import React, {useState} from "react";
import './App.css';

const App = () => {
  const [boards, setBoards] = useState([
    {id: 1, title: 'To do', className: 'board to-do',
      items: [
        {id: 1, title:'Task 1', content:'Try a kanban tool', start:'22.02.2022', deadline:'12.03.2022'}, 
        {id: 2, title:'Task 2', content:'Plan a project using kanban', start:'23.02.2022', deadline:'15.03.2022'}, 
        {id: 3, title:'Task 3', content:'Finish a kanban project', start:'24.02.2022', deadline:'22.03.2022'}
      ], 
    },
    {id: 2, title: 'In progress', className: 'board in-progress',
      items: [
        {id: 4, title:'Task 4', content:'Learn about kanban', start:'12.02.2022', deadline:'22.02.2022'}, 
        {id: 5, title:'Task 5', content:'Task in progress', start:'13.02.2022', deadline:'03.03.2022'}, 
        {id: 6, title:'Task 6', content:'Another task in progress', start:'14.02.2022', deadline:'05.03.2022'}
      ], 
    },
    {id: 3, title: 'Done', className: 'board done',
      items: [
        {id: 7, title:'Task 7', content:'Get a whiteboard', start:'02.01.2022', deadline:'01.02.2022'}, 
        {id: 8, title:'Task 8', content:'Find a sticky notes', start:'20.01.2022', deadline:'04.02.2022'}, 
        {id: 9, title:'Task 9', content:'Done task', start:'03.01.2022', deadline:'10.02.2022'}
      ],
    }
  ]); 

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragStartHandler(e, board, item){
    e.target.classList.add('is-dragged');
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  function dragLeaveHandler(e){

  };

  function dragEndHandler(e){
    e.target.classList.remove('is-dragged');
  };

  function dragOverHandler(e){
    e.preventDefault();
  };

  function dropHandler(e, board, item){
    e.preventDefault();
    e.target.classList.remove('is-dragged');
    
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    setBoards(boards.map(b => {
        if(b.id === board.id){
          return board
        }
        if(b.id === currentBoard.id){
          return currentBoard
        }
        return b
    }));
  };

  function dropCardHandler(e, board){
    if(e.target.className !== "task"){
      board.items.push(currentItem);
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);
  
      setBoards(boards.map(b => {
        if(b.id === board.id){
          return board
        }
        if(b.id === currentBoard.id){
          return currentBoard
        }
        return b
      }));
    }
  };

  function moveHandler(e, board, item){
    if(e.target.className === 'switch-next'){
      e.preventDefault();

      const thisItemIndex = board.items.indexOf(item);

      const thisBoardIndex = boards.indexOf(board);

      const nextIndex = thisBoardIndex + 1;

      let nextBoard;
      boards.map(v => {
        const vIndex = boards.indexOf(v);
        if(vIndex === nextIndex){
          nextBoard = v;
        }
        return nextBoard
      });

      let thisItem;
      board.items.map(j => {
        const jIndex = board.items.indexOf(j);
        if(jIndex === thisItemIndex){
          thisItem = j;
        }
        return thisItem
      });

      board.items.splice(thisItemIndex, 1);
      nextBoard.items.push(thisItem);

      setBoards(boards.map(b => {
        if(b.id === board.id){
          return board
        }
        return b
      }));
    };

    if(e.target.className === 'switch-prev'){
      e.preventDefault();

      const thisItemIndex = board.items.indexOf(item);

      const thisBoardIndex = boards.indexOf(board);

      const prevIndex = thisBoardIndex - 1;

      let prevBoard;
      boards.map(v => {
        const vIndex = boards.indexOf(v);
        if(vIndex === prevIndex){
          prevBoard = v;
        }
        return prevBoard
      });

      let thisItem;
      board.items.map(j => {
        const jIndex = board.items.indexOf(j);
        if(jIndex === thisItemIndex){
          thisItem = j;
        }
        return thisItem
      });

      board.items.splice(thisItemIndex, 1);
      prevBoard.items.push(thisItem);

      setBoards(boards.map(b => {
        if(b.id === board.id){
          return board
        }
        return b
      }));
    };
  };

  return (
    <div className="board-app">
      {boards.map(board =>
        <div
          onDragOver = {(e) => dragOverHandler(e)}
          onDrop = {(e) => dropCardHandler(e, board)}  
          className={board.className}
        >

          <section className="board__title"><h2>{board.title}</h2></section>

          <div className="board__content">
            {board.items.map(item =>
              <div 
                draggable = {true}
                onDragStart = {(e) => dragStartHandler(e, board, item)}
                onDragLeave = {(e) => dragLeaveHandler(e)}
                onDragEnd = {(e) => dragEndHandler(e)}
                onDragOver = {(e) => dragOverHandler(e)}
                onDrop = {(e) => dropHandler(e, board, item)}
                onMouseDown = {(e) => moveHandler(e, board, item)}
                className="task" 
              >
                
                <header className="task__heading">
                  <h3>{item.title}</h3>
                  <button className="switch-next">Move to next board</button>
                  <button className="switch-prev">Move to prev board</button>
                </header>

                <main className="task__content">
                  <p>{item.content}</p>
                </main>

                <footer className="task__dates">
                  <div className="task__dates--item task__start">
                    <p>Start</p>
                    <span>{item.start}</span>
                  </div>
                  <div className="task__dates--item task__deadline">
                    <p>Finish</p>
                    <span>{item.deadline}</span>
                  </div>
                </footer>

              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default App;