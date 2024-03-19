import React from "react";

const FauxLinkButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({...props}) => {
  return (<button className={'font-medium text-cyan-600 hover:underline dark:text-cyan-500'} {...props}/>);
}

export {FauxLinkButton};