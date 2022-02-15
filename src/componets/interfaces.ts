export interface IBlockItem{
    id:number;
    color:string;
    order:number;
    tube:number
}

export interface ILevel{
    itemSet : IBlockItem[],
    tubecount :number,
    colorCount : number
}