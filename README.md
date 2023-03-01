# Introduction

Javascript Library for drag and drop

# Installation

`npm i react-dndzone`

## Usage/Examples

```javascript

import DNDZone from 'react-dndzone'


function App(){

  function onDragEnter(dragElement, dropElement){
    ...
  }
  function onDragLeave(dragElement, dropElement){
    ...
  }
  function onDrop(dragElement, dropElement){
    ...
  }

  return(
    <DNDZone onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
        <div style={{display:'grid', gridTemplateColumns:"1fr 1fr 1fr 1fr", columnGap:'4px'}}>
        <div className="drag">Drag 1!</div>
        <div className="drag">Drag 2!</div>
        <div className="drag">Drag 3!</div>
        <div className="drag">Drag 4!</div>
        </div>
        <div style={{marginTop:"24px", display:'grid', gridTemplateColumns:"1fr 1fr 1fr 1fr", columnGap:'4px'}}>
        <div className="drop">drop 1!</div>
        <div className="drop">drop 2!</div>
        <div className="drop">drop 3!</div>
        <div className="drop">drop 4!</div>
        </div>
    </DNDZone>

  )
}
```

## Documentation

[Documentation](https://63fefea9605cb976c902b556-puwughhwqm.chromatic.com)

| Prop Name    | Description                                   | Default                    |
| :----------- | :-------------------------------------------- | :------------------------- |
| `dragClass*` | className of elements that need to be dragged!</br>`type=string` |   `-`   |
| `dropClass*` | className of elements on which the drag element is dropped!</br>`type=string` |   `-`   |
| `revert` | If this value is set to false, the drag item will not revert to its initial position upon being dropped!</br>`type=boolean` |   `true`   |
| `dragZIndex` | This specifies the initial z-index value of the drag item when it is being dragged!</br>`type=number` |   `1000`   |
| `onDrop` | This function will execute when the drag item is dropped onto the drop item!</br>`((dragItem: HTMLElement, drapItem: HTMLElement) => void) \| null` |   `-`   |
| `onDragEnter` | This function will execute when the drag item enters over the drop item!</br>`((dragItem: HTMLElement, drapItem: HTMLElement) => void) \| null` |   `-`   |
| `onDragLeave` | This function will execute when the drag item is no longer over the drop item!</br>`((dragItem: HTMLElement, drapItem: HTMLElement) => void) \| null` |   `-`   |

## License

[MIT](https://choosealicense.com/licenses/mit/)
