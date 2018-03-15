import React, { Component } from 'react'
import { Modal, Button, Image, Header, Icon, List, Dropdown, Grid, Segment, Card } from 'semantic-ui-react'
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
class MessageActionCard extends Component {

  handleCardClick(product, e) {
    console.log("hello", e, product)
    window.open(JSON.parse(product.ImageURL)[0], "_blank");
  }

  componentDidMount() {
  }

  render () {
    let {product} = this.props;
    let boundItemClick = this.handleCardClick.bind(this, product)
    let finalValue = null
    if(product){
      finalValue = <Card onClick={boundItemClick}>
        <Image src={JSON.parse(product.ImageURL)[0]} />
        <Card.Content>
          <Card.Header>
            {product.Name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Code: {product.Code}
            </span>
          </Card.Meta>
          <Card.Description>
            {product.LongDescription}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='rupee' />{product.ShippingCost}  Shipping Cost
          </a>
        </Card.Content>
      </Card>
    }
    return (
      <div>
        {finalValue}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) //binds all the actions with dispatcher and returns them
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageActionCard)
