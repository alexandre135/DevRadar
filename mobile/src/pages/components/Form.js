import React, {useState} from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

function Form({ onPress }){
    const [search, setSearch] = useState('')

    async function returnToSearch(){
       await onPress({search})
       setSearch('')
    }
    return(
        <View style={styles.searchForm}>
            <TextInput 
                style={styles.textinput}
                placeholder='Buscar por tecnologia'
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={search}
                onChangeText={text => setSearch(text)}
            />
            <TouchableOpacity onPress={returnToSearch} style={styles.button}>
                <MaterialIcons name="my-location" size={25} color="#fff" />
            </TouchableOpacity>
        </ View>
    )
}

const styles = StyleSheet.create({
    searchForm:{
        color:'#000',
        position:'absolute',
        top:20,
        left:20,
        right:20,
        zIndex:5,
        flexDirection:'row'
    },
    textinput:{
        backgroundColor:'#fff',
        color:"#666",
        flex:1,
        height:50,
        borderRadius: 25,
        paddingHorizontal:20,
        elevation:10
    },
    button:{
        backgroundColor:'#000',
        width:50,
        elevation:10,
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        marginLeft:15
    }
})

export default Form

