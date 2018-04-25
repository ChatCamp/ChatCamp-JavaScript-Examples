import React, { Component } from 'react'
import { Image, Button, Card, Divider, Header} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
class FlightCard extends Component {

  handleCardClick(product, e) {
    console.log("hello", e, product)
    window.open(JSON.parse(product.image_url)[0], "_blank");
  }

  componentDidMount() {
  }

  render () {
    let {product} = this.props;
    product = product.actionContents
    let boundItemClick = this.handleCardClick.bind(this, product)
    console.log("product", product)
    let finalValue = null
    let value = []
    if(product){
      for(let i in product){
        let actions = []
        for(let j in product[i].contents){
          actions.push(<div dangerouslySetInnerHTML={{ __html: product[i].contents[j].heading}}></div>)
          if(product[i].contents[j].actions.length > 0){
            for(let k in product[i].contents[j].actions){
              actions.push(<Button size="mini" color="red">{product[i].contents[j].actions[k]}</Button>)
            }
          }
        }
        value.push(<Card key={i} onClick={boundItemClick}>
          <Image src={(product[i].image_url)} />
          <Card.Content>
            <Card.Header dangerouslySetInnerHTML={{ __html: product[i].title}}>
            </Card.Header>
            {/* <Card.Meta>
              <span className='date'>

              </span>
            </Card.Meta> */}
            <Card.Description>
              <Divider />
              {/* <div dangerouslySetInnerHTML={{ __html: product[i].contents[0].heading}}></div>
              <br/>
              <span className='journey-heading'>
                Delhi - Mumbai | 1st April 2018
              </span>
              <br/>
              <Button size="mini" primary>6:30PM</Button>
              <Button size="mini" primary>8:30PM</Button>
              <br/>
              <br/>
              <span className='journey-heading'>
               Mumbai - Delhi | 4th April 2018
              </span>
              <br/>
              <Button size="mini" primary>5:30AM</Button>
              <Button size="mini" primary>9:30AM</Button> */}
              {actions}
            </Card.Description>
          </Card.Content>
          <Card.Content className={"confirm-button"} textAlign="center" extra >
            {product[i].actions[0]}
          </Card.Content>
        </Card>)
      }
      finalValue = <Card.Group>{value}</Card.Group>
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

export default connect(mapStateToProps, mapDispatchToProps)(FlightCard)
