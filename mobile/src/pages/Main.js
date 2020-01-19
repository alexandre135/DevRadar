import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'


import Form from './components/Form'
import api from '../services/api'


function Main({ navigation }){
    const [users, setUsers] = useState([])
    const [currentLocation, setCurrentLocation] = useState(null)
    
    useEffect(()=>{
        async function loadInitPosition(){
            const { granted } = await requestPermissionsAsync()
            if(granted){
                const location = await getCurrentPositionAsync({enableHighAccuracy: true})
                const coords = location.coords
                const { latitude, longitude } = coords
                setCurrentLocation({
                    latitude,
                    longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                })
            }
            
            
        }

        loadInitPosition()
    }, [])

    async function loadUsers({search}){
        const { latitude, longitude } = currentLocation

        const response = await api.get('/search', {
            params:{
                latitude,
                longitude,
                techs: search 
            }
        })
        setUsers(response.data.returnSearch)
    }

    function handleLocationChanged(region){
        console.log(region)
        setCurrentLocation(region)
    }

    if(!currentLocation){
        return null
    }
    return (
        <>
        <Form onPress={loadUsers}/>
        <MapView onRegionChangeComplete={handleLocationChanged} initialRegion={currentLocation} style={styles.map}>
            {users.map(user=>(
                <Marker key={user._id} coordinate={{ latitude: user.location.coordinates[1], longitude:user.location.coordinates[0] }}>
                    <Image style={ styles.avatar } source={{uri: user.avatar_url}} />
                    <Callout onPress={()=>{
                        navigation.navigate('Profile', { github_username : user.github_username })
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.bio}>{user.bio}</Text>
                            <Text style={styles.techs}>{user.techs.join(', ')}</Text>
                        </View>
                    </Callout>
                </Marker>
            ))}
        </MapView>
        </>
    )

    
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width:54,
        height:54,
        borderWidth:4,
        borderRadius:4,
        borderColor:'#fff'
    },
    callout:{
        backgroundColor:'#eee',
        width:260
    },
    name:{
        fontWeight:'bold',
        fontSize:16
    },
    bio:{
        color:'#666',
        marginTop:10
    },
    techs:{
        marginTop:5
    }

})

export default Main

