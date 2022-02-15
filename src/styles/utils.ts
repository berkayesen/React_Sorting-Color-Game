import { IBlockItem } from "../componets/interfaces";

export const checkAll = (value:IBlockItem, index:number, array:IBlockItem[]) => {
    if (index === 0) {
        return true;
    } else{
        return value.color === array[index-1].color;
    }
}