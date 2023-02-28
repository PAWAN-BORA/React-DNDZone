import React, { useState } from 'react';
import DNDZone from '../components/DNDZone';
import { ComponentStory} from '@storybook/react';

export default {
  title:"DND",
  component:DNDZone,
  argTypes:{
    dragClass:{
      control:false,
    },
    dropClass:{
      control:false,
    },
    
  }
}
let cusStyle = {width:"100px", height:"100px", background:"gray", display:'flex', alignItems:'center', justifyContent:'center', color:"#ffffff", cursor:"move"}

const Template:ComponentStory<typeof DNDZone> = (args) => {
  return(
    <DNDZone {...args}>
      <div style={cusStyle} className="drag">Drag Me!</div>
    </DNDZone>
  )
}
export const Drag = Template.bind({});
Drag.args = {
  dragClass:"drag",
  revert:true
}
export const MultipleDrag:ComponentStory<typeof DNDZone> = (args)=>{
  return(
    <DNDZone {...args}>
      <div style={{display:'grid', gridTemplateColumns:"1fr 1fr 1fr 1fr", columnGap:'8px'}}>
        <div style={{...cusStyle, backgroundColor:"red"}} className="drag">Drag 1!</div>
        <div style={{...cusStyle, backgroundColor:"green"}} className="drag">Drag 2!</div>
        <div style={{...cusStyle, backgroundColor:"blue"}} className="drag">Drag 3!</div>
        <div style={{...cusStyle, backgroundColor:"purple"}} className="drag">Drag 4!</div>
      </div>
    </DNDZone>
  )
}
MultipleDrag.args = {
  dragClass:"drag",
  revert:true
}

export const DragAndDrop:ComponentStory<typeof DNDZone> = (args)=>{

  const [dropBoxStyle, setDropBoxStyle] = useState({
    width:"100px",
    height:"100px",
    background:"gray",
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    color:"#ffffff",
    boxShadow:"",
  });
  const [dropText, setDropText] = useState("Drop Here!")
  function onDragEnter(dragItem:HTMLElement, dropItem:HTMLElement){
    console.log("entered")
    setDropBoxStyle((prev)=>{
      return {...prev, boxShadow:"0px 0px 8px black"}
    })
  }
  function onDragLeave(dragItem:HTMLElement, dropItem:HTMLElement){
    console.log("leave")
    setDropBoxStyle((prev)=>{
      return {...prev,  boxShadow:""}
    })
  }
  function onDrop(dragItem:HTMLElement, dropItem:HTMLElement){
    console.log("drop")
    setDropBoxStyle((prev)=>{
      return {...prev, boxShadow:"", background:"yellow", color:"black"}
    });
    setDropText("Dropped!")
  }
  return(
    <DNDZone {...args} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
      <div style={{display:'grid', gridTemplateColumns:"1fr 1fr 1fr 1fr", columnGap:'8px'}}>
        <div style={cusStyle} className="drag">Drag me!</div>
        <div style={dropBoxStyle} className="drop">{dropText}</div>
      </div>
    </DNDZone>
  )
}
DragAndDrop.args = {
  dragClass:"drag",
  dropClass:"drop",
  revert:true
}

let dropCusStyle = {width:"150px", height:"150px", background:"gray", display:'flex', alignItems:'center', justifyContent:'center', color:"#ffffff", padding:"4px", textAlign:"center" as const}

export const MultipleDragAndDrop:ComponentStory<typeof DNDZone> = (args)=>{

  function onDragEnter(dragItem:HTMLElement, dropItem:HTMLElement){
   
    dropItem.style.boxShadow = "0px 0px 8px black";
  }
  function onDragLeave(dragItem:HTMLElement, dropItem:HTMLElement){
    dropItem.style.boxShadow = "";
  }
  function onDrop(dragItem:HTMLElement, dropItem:HTMLElement){
    let dragText = dragItem.getAttribute("data-name");
    let dropText = dropItem.getAttribute("data-name");
    dropItem.style.boxShadow = "";
    dropItem.style.background = "yellow";
    dropItem.style.color = "black";
    dropItem.innerHTML = `${dragText} is droped over ${dropText}`;
  }
  return(
    <DNDZone {...args} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
      <div style={{display:'grid', gridTemplateColumns:"1fr 1fr 1fr 1fr", columnGap:'4px'}}>
        <div style={{...cusStyle, backgroundColor:"red"}} data-name="Drag 1" className="drag">Drag 1!</div>
        <div style={{...cusStyle, backgroundColor:"green"}} data-name="Drag 2" className="drag">Drag 2!</div>
        <div style={{...cusStyle, backgroundColor:"blue"}} data-name="Drag 3" className="drag">Drag 3!</div>
        <div style={{...cusStyle, backgroundColor:"purple"}} data-name="Drag 4" className="drag">Drag 4!</div>
      </div>
      <div style={{marginTop:"24px", display:'grid', gridTemplateColumns:"1fr 1fr 1fr 1fr", columnGap:'4px'}}>
        <div style={dropCusStyle} data-name="Drop 1" className="drop">drop 1!</div>
        <div style={dropCusStyle} data-name="Drop 2" className="drop">drop 2!</div>
        <div style={dropCusStyle} data-name="Drop 3" className="drop">drop 3!</div>
        <div style={dropCusStyle} data-name="Drop 4" className="drop">drop 4!</div>
      </div>
    </DNDZone>
  )
}
MultipleDragAndDrop.args = {
  dragClass:"drag",
  dropClass:"drop",
  revert:true
}
// MultipleDragAndDrop.parameters = {
//   controls:{ include: ['dropClass', 'revert'] } 
// }