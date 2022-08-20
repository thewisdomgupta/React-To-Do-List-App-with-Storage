import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const getLocalItem = () =>{
    let list = localStorage.getItem("lists");
    if(list){
      return JSON.parse(list);
    }
    else{
      return [];
    }
  }
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(getLocalItem);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  function addItem(){
    if(!newItem){
      alert("Please Enter a task");
      return;
    }

    const item={
      id: Math.floor(Math.random()*1000),
      value: newItem,
    }

    setItems(oldList => [...oldList, item]);
    setNewItem("");
  }

  function deleteItem(id){
    const newArray = items.filter((item)=>item.id!==id);
    setItems(newArray);
  }

  function deleteAll(){
    alert("Are you sure to delete all tasks")
    setItems([]);
  }

  function editItem(id, newText){
    const currentItem = items.filter((item)=>item.id===id);

    const newItem = {
      id: currentItem.id,
      value: newText,
    }

    deleteItem(id);
    setItems((oldList)=>[...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }


  useEffect(()=>{
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  console.log(newItem);
  return (
    <React.Fragment>
      <h1 className="header" align="center">To Do List App</h1>
      <div align="center">
        <input type="text"
        placeholder='Add a task'
        value={newItem}
        onChange={(e)=> setNewItem(e.target.value)}
        />
      </div>
      <div align="center">
        <button className="btn" onClick={() => addItem()}>Add Task</button>
      </div>
      <ol>
        <div align="center">
          {items.map((item)=>{
            return(
              <div>
                <li className="listing" key={item.id} onClick={() =>setShowEdit(item.id)}>{item.value} <button className="remove" onClick={()=>deleteItem(item.id)}>⊗ Remove Task</button></li>
                {showEdit === item.id ? (
                  <div>
                    <input type="text"
                    value={updatedText}
                    onChange={(e)=> setUpdatedText(e.target.value)}
                    />
                    <button className="update" onClick={() => editItem(item.id, updatedText)}>Update Task</button>
                  </div>
                ): null}
              </div>
            )
          })}
        </div>
      </ol>
      <div align="center">
        <button className="deleteAll" onClick={()=> deleteAll()}>Delete All</button>
      </div>
    </React.Fragment>
  );
}

export default App;
