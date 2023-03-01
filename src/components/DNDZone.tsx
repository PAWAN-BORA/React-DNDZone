import React, { createRef, HTMLAttributes } from "react";
import styles from './style.module.css';
import Rectangle from "./Rectangle";
interface Props {
  children?:React.ReactNode,
  /**
   * className of elements that need to be dragged!
   */
	dragClass:string,
   /**
   * className of elements on which the drag element is dropped!
   */
	dropClass:string
   /**
   * If this value is set to false, the drag item will not revert to its initial position upon being dropped. 
   */
	revert?:boolean,
  /**
   * This function will execute when the drag item is dropped onto the drop item. 
   */
  onDrop?:((dragItem:HTMLElement, drapItem:HTMLElement)=>void)|null,
  /**
   * This function will execute when the drag item enters over the drop item. 
   */
  onDragEnter?:((dragItem:HTMLElement, drapItem:HTMLElement)=>void)|null,
  /**
   * This function will execute when the drag item is no longer over the drop item. 
   */
  onDragLeave?:((dragItem:HTMLElement, drapItem:HTMLElement)=>void)|null,
   /**
   * This specifies the initial z-index value of the drag item when it is being dragged
   */
  dragZIndex:number
}
interface dragItem {
  ele:HTMLElement,
  isDraggable:boolean,
  initialPos:{x:number, y:number},
  resetPos:{left:number, top:number}
  cleanUp:Function,
  dropEle?:HTMLElement|null
}
interface dropItem {
  ele:HTMLElement,

}

export default class DNDZone extends React.Component<Props> {
  private container;
  private dragElements:dragItem[] = [];
  private dropElements:dropItem[] = [];
  private startZIndex:number;
  public static defaultProps = {
    revert:true,
    onDrop:null,
    onDragEnter:null,
    onDragLeave:null,
    dragZIndex:1000,
  }
  constructor(props:Props){
    super(props);
    this.container = createRef<HTMLDivElement>();
    this.startZIndex = this.props.dragZIndex;
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  mouseDown(e:MouseEvent, item:dragItem): void{
    e.stopPropagation();
		e.preventDefault();
    item.isDraggable = true;
    const eleObj = window.getComputedStyle(item.ele);
		let left = eleObj.getPropertyValue('left').split('px')[0];
		let top = eleObj.getPropertyValue('top').split('px')[0];
    item.initialPos.x = e.pageX-Number(left);
    item.initialPos.y = e.pageY-Number(top);
    this.startZIndex++;
    item.ele.style.zIndex = this.startZIndex.toString();
    item.ele.classList.remove(styles.revert);
		// if(this.props.revert){
		// }
  }
  mouseMove(e:MouseEvent): void{
    e.stopPropagation();
		e.preventDefault();
   
    for(let item of this.dragElements){
      if(item.isDraggable){
        item.ele.style.left = `${e.pageX-item.initialPos.x}px`;
        item.ele.style.top = `${e.pageY-item.initialPos.y}px`;
        if(this.props.onDragEnter!=null ){
					
          const dropEle = this.getDropEle(item);
          if(dropEle!==null){
            if(item.dropEle==null || dropEle.ele!==item.dropEle){
              this.props.onDragEnter(item.ele, dropEle.ele)
            }
            if(this.props.onDragLeave!=null && item.dropEle!=null && dropEle.ele!==item.dropEle){
              this.props.onDragLeave(item.ele, item.dropEle)
            }
            item.dropEle = dropEle.ele;
          } else if(item.dropEle!=null){
            if(this.props.onDragLeave!=null){
              this.props.onDragLeave(item.ele, item.dropEle)
            }
            item.dropEle = null;
          }
        }
      }
    }
  }
  mouseUp(e:MouseEvent): void{
    e.stopPropagation();
		e.preventDefault();
   
    for(let item of this.dragElements){
			if(item.isDraggable){
        if(this.props.onDrop!=null){
          if(item.dropEle!=null){
            this.props.onDrop(item.ele, item.dropEle)
          }
        }
        item.isDraggable = false;
				if(this.props.revert)this.reset(item);
			}
    }
  }
  getDropEle(item:dropItem){
    if(this.dropElements==null)return null;
		for(let drop of this.dropElements){
      let bound = drop.ele.getBoundingClientRect();
      let itemBound = item.ele.getBoundingClientRect();
      let rect = new Rectangle(bound.left, bound.top, bound.width, bound.height);
      let centerX = itemBound.left+itemBound.width/2;
      let centerY = itemBound.top+itemBound.height/2;
      if(rect.contains(centerX, centerY)){
        return drop;
      }
		}
    return null;
  }
  reset(item:dragItem){
		item.ele.style.left = `${item.resetPos.left}px`;
		item.ele.style.top = `${item.resetPos.top}px`;
		item.ele.classList.add(styles.revert);
   
	}
  componentDidMount(): void {
    if(this.container.current==null)return;
    let dragItems = this.container.current.getElementsByClassName(this.props.dragClass) as HTMLCollectionOf<HTMLDivElement>;
    let dragEle:dragItem[] = [];
    for(let item of dragItems){
      const localMouseDown = (e:MouseEvent)=>{
        this.mouseDown(e, ele);
      }
      const eleObj = window.getComputedStyle(item);
      if(eleObj.getPropertyValue('position')!=='absolute' && eleObj.getPropertyValue('position')!=='fixed' && eleObj.getPropertyValue('position')!=='relative'){
        item.style.position = 'relative';
      } 
      const left = eleObj.getPropertyValue('left').split('px')[0];
      const top = eleObj.getPropertyValue('top').split('px')[0];
      let bound = item.getBoundingClientRect();
      item.style.width = `${bound.width}px`;
      item.style.height = `${bound.height}px`;
      let ele = {
        ele:item,
        isDraggable:false,
        initialPos:{x:0, y:0},
        resetPos:{left:Number(left), top:Number(top)},
        cleanUp:()=>{item.removeEventListener('mousedown', localMouseDown)}
      };
      dragEle.push(ele);
      item.addEventListener('mousedown', localMouseDown);
    };
    this.dragElements = dragEle;

    let dropItems = this.container.current.getElementsByClassName(this.props.dropClass) as HTMLCollectionOf<HTMLElement>;
    let dropEle:dropItem[] = [];
    for(let item of dropItems){
      let ele = {
        ele:item,
      };
      dropEle.push(ele);
    };
    
    this.dropElements = dropEle;
    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mouseup', this.mouseUp)
  }
  componentWillUnmount(): void {
    if(this.dragElements==null)return;
      for(let item of this.dragElements){
        item.cleanUp();
      }
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp)
  }
  render(): React.ReactNode {

    return(
    <span ref={this.container}>
      {this.props.children}
    </span>
    )
  }
}
