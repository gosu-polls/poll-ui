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
            <div>
                <button className='groupsCollabsible' onClick={handleExpandCollapse}>{props.label}</button>
            </div>
            <div className={open ? "contentShow" : "contentParent"}>
                <div className='content'> 
                    {props.children} 
                </div>
            </div>
        </div>
      );
  };
export {Collapsible};