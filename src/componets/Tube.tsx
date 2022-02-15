import React from "react";
import { checkAll } from "../styles/utils";
import { Block }  from "./Block";
import { IBlockItem } from "./interfaces";

interface IProps{
  id:string;
  items:IBlockItem[];
  dropHandler : (e:React.DragEvent<HTMLDivElement>) => void;
}

export const Tube: React.FunctionComponent<IProps> = ({ items,id,dropHandler }) => {
  const allowDrop = (e:React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

const isSorted =items.length === 4 && items.every(checkAll);

const blocks = items
  .sort((s,i) => s.order - i.order)
  .map((i, index, arr) => 
        <Block key={i.id} 
        blockData={i} 
        draggable={!isSorted && (arr.length - 1 === index)}
      />);
return( 
        <div 
        id={`tube${id}`} 
        className={`tube ${isSorted ? "sorted":""}`} 
        onDragOver={allowDrop} 
        onDrop={dropHandler}>
            {blocks}
        </div>
      );
};

export default Tube
