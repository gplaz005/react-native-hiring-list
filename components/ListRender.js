import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const getList = async () => {
    try {
      let response = await fetch(
        'https://fetch-hiring.s3.amazonaws.com/hiring.json'
      );
      let json = await response.json();
      //console.log(json);
//return list without nulls or empty strings
     let completeList = []
    json.map((k) =>{
            //console.log("-------------------------")
            if(k.name !== null){
             if ((k.name).length >= 1){
            //console.log(k.id)
            
            completeList = [...completeList, k]
            }
        }})
        //console.log(completeList)

//return list group by listId
       const groupedList = completeList.sort((a,b) =>{
           if(a.listId < b.listId){
            return - 1}
            if(a.listId > b.listId){
                return 1}
           return 0
       })

       //console.log(groupedList)

//return  grouped List sorted by name

    const sortedList = groupedList.sort((a,b) =>{
        if(a.listId == b.listId && a.id < b.id){
        return - 1}
        if(a.listId == b.listId && a.id > b.id){
          return 1}
        return 0
    })
    console.log(sortedList)

      return json;
    } catch (error) {
      console.error(error);
    }
  };

getList()



const ListRender = () => {
  return (
    <View style={styles.container}>
     <Text>List items</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListRender;
