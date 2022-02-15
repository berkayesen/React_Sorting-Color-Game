import React from 'react'
import { IBlockItem } from './interfaces';

interface IProps {
    blockData:IBlockItem;
    draggable:boolean;
}

export const Block:React.FunctionComponent<IProps> = ({ 
    blockData,
    draggable,
    }) => {
            const dragStart=(e:React.DragEvent<HTMLDivElement>) =>
            {
                if (draggable) {
                    e.dataTransfer.setData("text",e.currentTarget.id);
                }
            };
                return (
                        <div id={blockData.id.toString()} 
                        draggable = {draggable}
                        onDragStart={dragStart} 
                        className={`block block-${blockData.color} border-white ${draggable && "draggable"}`}
                        ></div>
                    )   
};

export default Block
