import React from 'react'

export const Demo = () => {
    const dragStart = (e:React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData("text",e.currentTarget.id);
        console.info("sürükleme başladı");
    };

    const onDrop = (e:React.DragEvent<HTMLDivElement>) =>{
      console.log(e.dataTransfer.getData("text"));
    }

  return (
  <React.Fragment>
    <div 
    id='42'
    className='box' 
    draggable
    onDragStart={dragStart}
    onDragEnd={() => console.info("sürükleme sonlandı")}
    onDrop={() => console.info("bırakıldı - kutu")}
    ></div>

<div 
    id='44'
    className='box' 
    draggable
    onDragStart={dragStart}
    onDragEnd={() => console.info("sürükleme sonlandı")}
    onDrop={() => console.info("bırakıldı - kutu")}
    ></div>


    <div className='canvas'
    onDragOver={(e) => e.preventDefault()}
    onDrop = {onDrop}
    ></div>
  </React.Fragment>

  )
}

export default Demo
