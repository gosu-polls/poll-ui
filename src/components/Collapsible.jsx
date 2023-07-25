// import React, {useState, useRef} from 'react';
import React, {useState} from 'react';
import "./css/Collapsible.css";

const Collapsible = (props) => {
    const [open, setOpen] = useState(false);
    // const contentRef = useRef();
    // if (contentRef.current) 
    //     console.log(contentRef.current.scrollHeight);

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
            {/* <div className="content-parent"> */}
                {/* ref={contentRef.current}  */}
                {/* style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }} */}
                {/* <div className="content">{props.children}</div> */}
            {/* </div> */}
        </div>
      );
  };
export {Collapsible};