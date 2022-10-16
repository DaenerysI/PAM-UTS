import { View,Text, FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, {Component} from "react";
import { Jiro } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

let data = []
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newvocab:'',
      openmodal : false,
      index: -1,
    };
  }

  componentDidMount () { 
    this.getData () ; 
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('@datavocab', JSON.stringify (data));
      console.warn ('Sukses Update')
    } catch (e) {
      console.warn ('Eror Update')
    }
  }

  getData = async () => {
    try {
      let value =await AsyncStorage.getItem('@datavocab');
      const jsonvalue = JSON.parse(value)

      if(jsonvalue !== null) {
        data = jsonvalue;
        this.setState({});
      }
    } catch(e) {
      // error reading value
      console.warn('Gagal membaca data')
    }
  }

  addnewvocab = () => {
    data.push({
      vocab: this.state.newvocab, check: false
    });
    this.setState({newvocab: ''});
    this.storeData ()
  }
  
  delete = (index) => {
    data.splice(index, 1);
    this.setState({openmodal : false});
    this.storeData();
  }

  render() {
    return ( 
      <View style={{flex: 1, backgroundColor : '#1A237E'}}>
        <StatusBar backgroundColor="#1A237E" translucent barStyle="light-content"/ >
        <View style= {{paddingVertical :15, backgroundColor:'#03a9f4',elevation:1, borderRadius : 5, marginTop : 30}}>
          <Text style={{textAlign: 'center',color:'#ffffff',fontWeight : "bold"}}>My Vocabulary</Text>
        </View>

          <FlatList
            data={data}
            renderItem={({ item, index }) =>
            <TouchableOpacity style = {{marginHorizontal : 22, marginVertical : 7, borderWidth : 1, 
              paddingVertical: 16 ,bordercolor : '#ffffff',borderRadius : 8,
              backgroundColor : '#03a9f4', elevation : 1, bordercolor : '#ffffff'}}
              onLongPress={() => this.setState({openmodal : true, index : index})}>
            <Text style ={{marginLeft : 12, fontWeight : "bold", color : '#ffffff'}} > {item.vocab}</Text>
            </TouchableOpacity>
            }
            style={{flex : 1, backgroundColor: '#1A237E',}}
            estimatedItemSize={200}
            />

        <Jiro
          label={'English (Indonesia)'}
        
          // this is used as active and passive border color
          borderColor={'#03a9f4'}
          inputPadding={16}
          inputStyle={{ color: '#f5f5f5' }}
          value = {this.state.newvocab}
          onChangeText={(text) => this.setState ({newvocab : text})} 
          onSubmitEditing={() => this.addnewvocab()}
          />

      <Modal isVisible={this.state.openmodal}>
        <View style = {{padding : 8, borderRadius : 8, backgroundColor : '#03a9f4'}}>
          <TouchableOpacity style={{ backgroundColor : '#D50000',paddingVertical : 10, marginVertical : 10, borderRadius : 10, }}
          onPress={() => this.delete(this.state.index)}
          >
            <Text style= {{textAlign : 'center', color : '#ffffff', fontWeight : 'bold'}}>DELETE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor : '#757575',paddingVertical : 10, borderRadius : 10}}
          onPress={() => this.setState({openmodal : false})}
          >
            <Text style= {{textAlign : 'center', color : '#ffffff', fontWeight : 'bold'}}>CLOSE</Text>
          </TouchableOpacity>
        </View>

      </Modal>

      </View> 
    )
  }
}
export default App;