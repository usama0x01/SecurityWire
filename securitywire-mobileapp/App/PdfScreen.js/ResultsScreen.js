import React,{useState,useEffect,useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  StatusBar,
  Image,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { SearchBar,Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API from "../config/api";
import Screen from '../Components/Screen'
import colors from '../config/colors';
import ListItem from '../Components/ListItem';
import {MsgBox,Colors} from '../Components/styles';

function ResultsScreen({route,navigation}) {
  

  const [isLoading, setisLoading] = useState(true);
  const [Results, setResults] = useState([]);
  const [inMemoryResults, setinMemoryResults] = useState([]);
  const [searchfield, setsearchfield] = useState("");
  const [User, setUser] = useState([]);
  const [message, setmessage] = useState("");
  const [messageType, setmessageType] = useState("");

  const loadResults = async () => {
    setmessage(null)
    let config = {}
      try {
          var value = await AsyncStorage.getItem('Credentials')
          if(value !== null) {
              value = JSON.parse(value)
              setUser(value)
              config = {headers: {
                'Authorization': 'Bearer ' + value.token
            }}
            }
        } catch(e) {
            console.log(e)
        }
    axios
      .get(`${API}/Scanner`, config)
      .then((response) => {
        const result = response.data;
        var { status, data } = result;
        data = JSON.stringify(data)
        data = JSON.parse(data)
        data = data.Scan
          if (status != 'success') {
            setmessage("some error occured")
            setmessageType(status)
            setisLoading(false)
          }
          else{
            setisLoading(false)
            data = data.filter((val)=> JSON.parse(val.data).url != 'undefined')
            setResults(data)
            setinMemoryResults(data)
          }
        })
        .catch((error) => {
            setisLoading(false)
          if(error.status == 403){
            setmessage("Access denied, Login Again")
          }
          else{
              setmessage("An error occurred. Check your network and try again")
            }
            console.log(error);
            console.log("error");
        });
  };

  useEffect(()=>{
        setisLoading(true)
        loadResults();
  },[])


  const searchResults = value => {
    if(value!=""){
      const filteredResults = Results.filter(Result => {
        var xam = JSON.parse(Result.data)
        return xam.url.toLowerCase().includes(value.toLowerCase());
      });
      setsearchfield(value)
      setinMemoryResults(filteredResults)
    }
    else{
      setsearchfield(value)
      setinMemoryResults(Results)
    }
  };
  
    return (
      <View style={styles.container}>
        <Screen>
        <SearchBar
        placeholder="Type Here..."
        onChangeText={searchResults}
        value={searchfield}
        />
        <MsgBox type="error">{message}</MsgBox> 
          {/* {isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              
              <ActivityIndicator size="large" color="#bad555" />
            </View>
          ) : null} */}
          <FlatList
            data={inMemoryResults}
            renderItem={({item}) =>
            <View style={{marginVertical:5}}>
            <ListItem
            img={`https://s2.googleusercontent.com/s2/favicons?domain_url=${JSON.parse(item.data).url}`}
            title={JSON.parse(item.data).url}
            status={
              item.status == 'completed' ? (<View style={styles.statecom}>
                <Text style={styles.t} >{item.status} </Text>
                </View>) : item.status == 'active' ? (<View style={styles.stateact}>
                <Text style={styles.t} >{item.status} </Text>
                </View>) :(<View style={styles.stateerr}>
                <Text style={styles.texts}>{item.status} </Text>
                </View>)}
            date={item.date.substr(0, 10)}
            time={item.date.substr(11, 8)}
            onPress={()=>{navigation.navigate("Report",{item:item})}}
            />
            </View>}
            keyExtractor={(item, index) =>index.toString()}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={loadResults} />
            }
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50
                }}
              >
                {isLoading ? null : <Text style={{ color: '#000000' }}>No Results Found</Text>}
              </View>
            )}
          />
          
      </Screen>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light
  },
  outerContainer:{
    top: StatusBar.currentHeight,
  },
  v1:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },v3:{
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  box:{
    marginVertical:5,
    height:55,
    backgroundColor: colors.white
  },
  statecom:{
    backgroundColor: 'green',
    borderRadius:100,
    width: "70%",
    alignItems: 'center',
    justifyContent: 'center'
  },stateact:{
    backgroundColor: 'yellow',
    borderRadius:100,
    width: "70%",
    alignItems: 'center',
    justifyContent: 'center'
  },stateerr:{
    backgroundColor: 'red',
    borderRadius:100,
    width: "70%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize:14
  },
  texts:{
    fontSize:14,
    color: "white",
    fontWeight: 'bold'
  },
  t:{
    fontWeight: 'bold'
  }
});

export default ResultsScreen;