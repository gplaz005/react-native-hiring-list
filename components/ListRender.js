import React, { useEffect } from 'react';
import { StyleSheet, Text, View , FlatList, TouchableOpacity} from 'react-native';
import {useState} from 'react'


const ListRender = () => {

const [hiringlist , setHiringList] = useState();

useEffect(() =>{
getList()
},[])

// main Function, get Api and sort objects
const getList = async () => {
    try {
      let response = await fetch(
        'https://fetch-hiring.s3.amazonaws.com/hiring.json'
      );
      let json = await response.json();
    
//return list without nulls or empty strings
     let completeList = []
    json.map((k) =>{
            if(k.name !== null){
             if ((k.name).length >= 1){
            completeList = [...completeList, k]
            }
        }})

//return list group by listId
       const groupedList = completeList.sort((a,b) =>{
           if(a.listId < b.listId){
            return - 1}
            if(a.listId > b.listId){
                return 1}
           return 0
       })

//return  grouped List sorted by name
    const sortedList = groupedList.sort((a,b) =>{
        if(a.listId == b.listId && a.id < b.id){
        return - 1}
        if(a.listId == b.listId && a.id > b.id){
          return 1}
        return 0
    })
    const finalList = JSON.stringify(sortedList)
   
    setHiringList(sortedList)
      return sortedList;
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <View style={styles.container}>
      
     <Text style={styles.title} >Fetch Rewards</Text> 
     <FlatList
     keyExtractor = {(item, index) =>item.id.toString()}
     data = {hiringlist}
     renderItem ={itemData => (
       <View  style ={styles.listItem}>
         <TouchableOpacity activeOpacity ={0.1}>
         <Text>ID:{itemData.item.id}       {itemData.item.listId}      {itemData.item.name}</Text>
         </TouchableOpacity>
       </View>
     )}
     />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  listItem:{
    backgroundColor: '#FF8C00',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius:20,
    width: 300,
    alignItems: 'center',
    fontSize: 50
  },
  title:{
    fontSize:35
  }
});

export default ListRender;
