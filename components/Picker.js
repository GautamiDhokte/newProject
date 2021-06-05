import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import {  Menu,TextInput,List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';


const PickerItem = ({ doSomething,index,props }) => (
  <List.Item {...props} onPress={() => doSomething(props.title,props.value,index)} />
);



const Picker = props => {
  const [visible, setVisible] = React.useState(false);
  const [value, setval]= React.useState('');
  const [title,setTitle]=React.useState('');

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

 const doSomething = (title,value,index) => {
setval(value);
setTitle(title)
closeMenu();
props.onValueChange(value,index)
  }

  React.useEffect(()=>{
      
    React.Children.map(props.children,(child,index) => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (React.isValidElement(child)) {
       if(props.value===child.props.value){
         setval(child.props.value)
         setTitle(child.props.title)
       }
      }
    });
  },[props.value])

  

 const childrenWithProps = React.Children.map(props.children,(child,index) => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { doSomething: doSomething,index:index,props:child.props });
      }
      return child;
    });
  
  return (
        <Menu
         style={{width:props.setWidth,marginTop:60}}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
            <TextInput
            label={props.label}
            style={props.style,{width:props.setWidth}}
            mode="outlined"
            value={title}
            editable={false}
            right={<TextInput.Icon icon={()=><Icon name={"chevron-down"} size={20}/>}/>}
          />
          </TouchableOpacity>
          }>
        {childrenWithProps}
        </Menu>
  );
};

Picker.Item=PickerItem;

export default Picker;