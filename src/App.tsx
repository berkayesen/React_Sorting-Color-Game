import React, { useEffect, useRef, useState } from 'react';

//import Demo from './componets/Demo';
import "./styles/site.css";
import {Tube}  from './componets/Tube';
import { IBlockItem } from './componets/interfaces';
import { levels } from './styles/level';
import { checkAll } from './styles/utils';
import reset_logo from "./assets/reset.svg";
import undo_logo from "./assets/undo.svg";
import next_logo from "./assets/next.svg";

function App() {
  //return <Demo/>
  
  const [level,setLevel] = useState<number>(0);
  
  const [isAllSorted,setIsAllSorted] = useState(false);
  
  const [elemenets, setElements] = useState<IBlockItem[]>(JSON.parse(JSON.stringify(levels[level].itemSet)));

  const moves = useRef<IBlockItem[]>([]);

  const addToMoves =(block:IBlockItem)=>{
    if (moves.current.length >= 4) {
      moves.current.shift();
    }
    moves.current.push({ ...block });
  }

  const dropHandler = (e:React.DragEvent<HTMLDivElement>) =>{
    const tubeId = Number.parseInt(e.currentTarget.id.slice(-1));
      const blockId = Number.parseInt(e.dataTransfer.getData("text"));
        const block = elemenets.filter((e) => e.id === blockId)[0];
          const tube = elemenets.filter((b)=>b.tube === tubeId).sort((s,i) => s.order - i.order);
            if (tube.length === 0 || (tube.length < 4 && tube[tube.length -1].color === block?.color)) 
            {
               addToMoves(block);
                    const nElements = elemenets.map(e => {
                      if (e.id === blockId) {
                        e.tube=tubeId;
                        e.order=tube.length + 1;
                      }
                    return e;
                    });
                        setElements(nElements);
            }
  };

  const reset = () =>{
    setElements((JSON.parse(JSON.stringify(levels[level].itemSet))));
    moves.current = [];
  };

  const undo = () =>{
      const lastMove = moves.current.pop();
      const nElements = elemenets.map((b) => {
        if (b.id === lastMove?.id) {
          return lastMove;
        }
        return b;
      });
      setElements(nElements);
  };

  let tubes=[]
  for (let i = 1; i <=levels[level].tubecount; i++) {
    tubes.push( <Tube id={i.toString()} 
    key={i} 
    items= {elemenets.filter(t=> t.tube === i)} 
    dropHandler={dropHandler} 
    
   />);
    
  }

  useEffect(()=>{
    let f:number = 0;
       for (let i = 1; i <= levels[level].tubecount; i++) {
          const tube = elemenets.filter(e => e.tube === i);
          if (tube.length === 4 && tube.every(checkAll)) {
                f+=1;
          }
        }
        if (f ===levels[level].colorCount) {
          setIsAllSorted(true);
        }
  },[elemenets])

  useEffect(()=>{
    setIsAllSorted(false);
    reset();
  }, [level])

  const nextLevel = () =>{
    setLevel(level+1);
  }

  const levelChange =(e: React.ChangeEvent<HTMLSelectElement>) =>{
    setLevel(Number.parseInt(e.currentTarget.value));
  }

  return (

    <div className="container">
      <div className="flex-box level-area">
        <span className='title'>Seviye:</span>
        <select className='level-dropdown' name="level" id="level" value={level} onChange={levelChange}>
          {
            levels.map((l,i)=>(<option key={i} value={i}>{i+1}</option>))
          }
        </select>
      </div>
      <div className="game-area">{tubes}</div>
        <div className="controls flex-box" >
          <button className='btn' onClick={reset}><img src={reset_logo} alt="" /></button>
          <button className='btn' onClick={undo} disabled={moves.current.length < 1}><img src={undo_logo} alt="" /></button>
          {
            isAllSorted && <button className='btn' onClick={nextLevel} disabled={
              level === levels.length-1
            }>{level === levels.length-1 ?<span className='title'>OYUN BİTTİ !</span> :<img src={next_logo} alt=""/>}</button>
          }
        </div>
    </div>
  );
};

export default App;
