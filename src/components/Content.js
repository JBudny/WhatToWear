// module "Content.js"
import React, {Component} from 'react'

class Content extends Component {
render() {
  return (
    <div className="Content" style={{
      height: '90%',
      width: '100%'
    }}>
      {this.props.content}
    </div>)
}
}

export default Content;
