// module "Content.js"
import React from 'react'

const Content = ({content}) => {
  return (
    <div className="Content" style={{
      height: '90%',
      width: '100%'
    }}>
      {content}
    </div>)
}

export default Content;
