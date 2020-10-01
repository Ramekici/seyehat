import React from 'react';

interface TextNode{
    text:string
}

const Heading:React.FC<TextNode> = ({text}) => {
    return (
        <h3 className="display-5 text-info text-capitalize mx-1 mb-3"> {text} </h3>
    )
}
export default Heading;