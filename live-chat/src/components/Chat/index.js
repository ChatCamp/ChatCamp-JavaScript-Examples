import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import {IntlProvider} from 'react-intl'
import ChatApp from 'containers/ChatApp'

// addLocaleData(en);

export default class Chat extends Component {
  // static propTypes = {
  //   store: PropTypes.object,
  //   history: PropTypes.object,
  //   routes: PropTypes.func
  // }

  render() {
    const { store, history, routes } = this.props;

    return (
      <Provider key={Math.random()} store={store}>
        <Router key={Math.random()} history={history}>
          <IntlProvider key={Math.random()} locale={'en'} messages={store.getState().loadTranslation.message}>
            <ChatApp key={Math.random()} appId={"iFlyChatAppDiv"}/>
            {/* <div>Hello World</div> */}
          </IntlProvider>
        </Router>
      </Provider>
    )


    // key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395
    // return (
    //   <Provider key={Math.random()} store={store}>
    //     <Router key={Math.random()} history={history}>
    //       <IntlProvider locale={'en'} messages={store.getState('loadTranslation').loadTranslation.get('message')}>
    //         <App key={id} appId={id}/>
    //       </IntlProvider>
    //     </Router>
    //   </Provider>
    // );
  }
}
