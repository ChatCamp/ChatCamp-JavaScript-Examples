import React, { Component } from 'react'
import { Modal, Button, Icon, Dropdown, Grid, Segment } from 'semantic-ui-react'
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
class MessageAction extends Component {

  state = {
    products: [
      {
            "$id": "2",
            "ProductID": 44,
            "Name": "Streaker Fitbit",
            "Code": "SF001",
            "ImageURL": "[\"http://streaklabs.in/UserImages/FitBit.jpg\"]",
            "ShortDescription": "Streaker Fitbit",
            "LongDescription": "Streaker Fitbit",
            "CategoryID": 45,
            "ShippingCost": 0,
            "Status": 1,
            "BrandID": 40
        },
        {
            "$id": "3",
            "ProductID": 43,
            "Name": "Streaker Weighing Scale",
            "Code": "SW001",
            "ImageURL": "[\"http://streaklabs.in/UserImages/WeightingScale.jpg\"]",
            "ShortDescription": "Streaker Weighing Scale",
            "LongDescription": "Streaker Weighing Scale",
            "CategoryID": 44,
            "ShippingCost": 0,
            "Status": 1,
            "BrandID": 40
        },
        {
            "$id": "4",
            "ProductID": 42,
            "Name": "Streaker Water Bottle",
            "Code": "SB001",
            "ImageURL": "[\"http://streaklabs.in/UserImages/WaterBottle.jpg\"]",
            "ShortDescription": "Streaker Water Bottle",
            "LongDescription": "Streaker Water Bottle",
            "CategoryID": 43,
            "ShippingCost": 0,
            "Status": 1,
            "BrandID": 40
        }
    ],
    selectedProductId: 44,
    message: 'Check this out!',
    modalOpen: false
  }

  handleClick = (e, selection) => {
    this.setState({
      selectedProductId: selection.value
    })
  }

  handleChange = (e) => {
    if(e.target.value !== '\n'){
      this.setState({
        message: e.target.value,
      },function(){
        // this.props.actions.startTyping(this.props.id)
      })
    }
  }

  handleButtonClick = (e) => {
    let {message, selectedProductId, products} = this.state
    let product = null

    if(selectedProductId){
      for(let i in products) {
        if(products[i]["ProductID"] === selectedProductId) {
          product = products[i]
          break
        }
      }
      this.props.actions.actionMessage(this.props.id, message, product)
      this.handleClose()
    }
    else if(!selectedProductId){
      alert("Please, select a product")
    }

  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  componentDidMount() {
    // axios.get('http://streaklabs.in:90//api/Ecommerce/GetAllProducts', {
    //   headers: {'Authorization': 'Bearer vJ-gKSwUh9yh5CWBFsrrVBIn9T9n9DgxNWnJsCmGJL8goOhJy3IJKx5a3e5M-Xe1P6qM-g558PF5wTce3NYNIhOoHC5-OLqlpuGzzE7-0BUUgRMFzV1yrFLgXDSnIEIl_PDbogoMcA6QxcUK2rz0NbppaWY--koJycDGq9lyVKKxU56Pltj9ntHm7jaPtHGyInaKX0ZWe1NBf514zFYZ1y45A5LTnzJx12e7rY79R6g-e-buUkpa56tQz5M8Ea7dqYHA1o-xyrzRc0RF9l4v26eKfnhrv_f07jBBflkpjCjJ0XMtV9WOW8iMz-a86ayF8Aqj8LQiHd1xFqedUAUjdrtm5rd-2B2VGEnCAJuSCi0CblLM7ltau1Ry6d7irbYjblVbvnydSNvYKccVO4mUWzujTfR8ishCFcsmuqAxp-Uvufh2mSw9CAIwlKI0iO4IgfO0KVlKzdp4YB2-ZA2GvkNCqIHDsGr8KK-HQ_23r8JLMQYn3Zjg_kztpu-sKKvhQJgxSa-mw0pvMDAvSKCjwg'}
    // }).then(res => {
    //   console.log("MODAL", res);
    // })
  }

  render () {
    let options = [];
    this.state.products.map((product, key) => {
      // let boundItemClick = this.handleClick.bind(this, product);
      options.push ({
        key: product.ProductID,
        value: product.ProductID,
        image: JSON.parse(product.ImageURL)[0],
        text: product.Name
      })
      return true
    })
    return (<Modal
      trigger={<Icon onClick={this.handleOpen} name='plus cart' size="large"/>} open={this.state.modalOpen}
      onClose={this.handleClose}>
        <Modal.Header>Share Product</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Dropdown placeholder='Select a Product' fluid selection search options={options} onChange={this.handleClick} defaultValue={options[0].value}/>
          </Modal.Description>
          <Segment>
          <Grid>
            <Grid.Column width={12}>
              <Textarea
                className="borderNone"
                name ='message'
                minRows={1}
                maxRows={1}
                placeholder={'Send message along with product'}
                value={this.state.message}
                style={{ width: "100%", minHeight: "23px"}}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button primary onClick={this.handleButtonClick}>
                Share <Icon name='right chevron' />
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
        </Modal.Content>
      </Modal>)
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageAction)
