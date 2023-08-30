// import React, {useState, useRef} from 'react';
import React, {useState} from 'react';
import "./../css/Collapsible.css";

const Collapsible = (props) => {
    const [open, setOpen] = useState(false);

    const handleExpandCollapse = () => {
        setOpen(!open);
      };
      return (
        <div>
            {/* {console.log(props)} */}
            <div>
                <button className={props.tag + 'Container'} onClick={handleExpandCollapse}>{props.label}</button>
            </div>
            <div className={open ? props.tag + 'ContentShow' : props.tag + 'ContentParent'}>
                <div className={props.tag + 'Content'}> 
                    {props.children} 
                </div>
            </div>
        </div>
      );
  };
export {Collapsible};