import "./App.css";
import React, { Component, useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function App() {
  const [addData, setVal] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedData, showData] = useState(0);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  
  useEffect(()=>{
    getData()
  }, [])
  async function getData(){
    await fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then((result) => {
      setIsLoaded(true);
      setItems(result);
      // console.log(result)
    },
    (error) => {
      setIsLoaded(true);
      setError(error);
    })
  }
  const handleChange = (e, editor) => {
    const data = editor.getData();
    setVal(data);
  };
  console.log('items', items)
  return (
    <div className="App">
      <h2>Hello World</h2>
      {/* {items.length>1 && <h1>{items[1].title}</h1> } */}
      {items.length > 0 && <CKEditor
      editor={ ClassicEditor }
      data={`<h1>${items[1]?.title}</h1><p>${items[1]?.description}</p>`}
      onReady={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
      } }
      onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( { event, editor, data } );
      } }
      onBlur={ ( event, editor ) => {
          console.log( 'Blur.', editor );
      } }
      onFocus={ ( event, editor ) => {
          console.log( 'Focus.', editor );
      } }
  />}
     
      {/* <button
        onClick={() => {
          showData(!addedData);
        }}
      >
        {addedData ? "Hide Data" : "Show Data"}
      </button>
      <div>{addData ? addData : ""}</div> */}
    </div>
  );
}

export default App;
