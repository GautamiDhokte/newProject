import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, Provider,List } from 'react-native-paper';
import Picker from './components/Picker';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'steller',
      blockchain: [
        {
          value: 'steller',
          title: 'steller',
        },
        {
          value: 'Mastercard',
          title: 'Mastercard',
        },
      ],
    };
  }

  render() {
    return (
      <Provider>
    
          <Picker
          //style={{ height: "50%" }}
          setWidth={"100%"}
            label="Products"
            value={this.state.value}
            onValueChange={(val, index) => {
              console.log("Value:"+val+" index: ",index)
            }}
          >
          {
            this.state.blockchain.map((item)=>{
              return <Picker.Item key={item.value}  title={item.title} value={item.value} />
            })
          }
          </Picker>
        
        </Provider>
      
    );
  }
}

export default App;
