import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import native from 'react-native'
const NativeView = native.View;
import MapView, { Marker, View, Callout } from 'react-native-maps';
import { Avatar, Card, Title } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal';
import { useNavigation, useFocusEffect } from 'react-navigation-hooks';
import PreviewList from '../components/PreviewList';
import { getAll } from '../Helper';
import MyMarker from "../components/customMarker"

export default function MapScreen({ screenProps }) {
  console.log(MyMarker, 'mapscreen 17');
  const { navigate } = useNavigation();
  const [messages, setMessages] = useState([]);
  const [clickedMessage, setClickedMessage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [profileModal, toggleProfileModal] = useState(false);
  const leaveMessageMarker = useRef(null);
  const [displayMessagesModal, toggleDisplayMessagesModal] = useState(true);
  const [calloutIsRendered, setCalloutIsRendered] = useState(false);
  const markerRef = useRef(null);

  const onRegionChangeComplete = () => {
    console.log('region changed')
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      if (calloutIsRendered === true) return;
      setCalloutIsRendered(true)
      markerRef.current.showCallout();
    }
  };

  useEffect(() => {
    getAll()
      .then(({ data }) => {
        const allMessages = data.map(message => {
          message.longitude = parseFloat(message.coordinate.long);
          message.latitude = parseFloat(message.coordinate.lat);
          return message;
        });
        console.log(allMessages, 'all messages useEffect mapScreen.js');
        setMessages(allMessages);
      })
      .catch(err => console.log(err, 'useEffect getAll'));
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAll()
        .then(({ data }) => {
          const allMessages = data.map(message => {
            message.longitude = parseFloat(message.coordinate.long);
            message.latitude = parseFloat(message.coordinate.lat);
            return message;
          });
          console.log(allMessages, 'allmessages useFocusEffect MapScreen.js');
          setMessages(allMessages);
        })
        .catch(err => console.log(err, 'getAll mapScreen useFocusEffect'));
    }, []),
  );

  const { latitude, longitude } = screenProps.location.coords;
  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const [dropMarker, setDropMarker] = useState({});
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MapView
          style={styles.mapStyle}
          initialRegion={region}
          showsUserLocation={true}
          userTrackingMode={true}
          onPress={event => setDropMarker(event.nativeEvent.coordinate)}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {dropMarker.latitude !== undefined &&
            dropMarker.longitude !== undefined && (
              <MapView.Marker
                ref={markerRef}
                title="Leave Message Here?"
                coordinate={{
                  latitude: dropMarker.latitude,
                  longitude: dropMarker.longitude,
                }}
              draggable
              onDragEnd={event => setDropMarker(event.nativeEvent.coordinate)}
                key={dropMarker.key}
                onPress={() => {
                  console.log(
                    `Leave a message at latitude ${dropMarker.latitude} and longitude ${dropMarker.longitude}?`,
                  );
                  screenProps.otherLocationObj.setOtherLocation(true);
                  navigate('NewPost', {
                    latitude: dropMarker.latitude,
                    longitude: dropMarker.longitude,
                  });
                  // props.navigation.navigate('Message')
                }}
            >
              
                <Image
                  source={require('../assets/images/message.png')}
                  style={{ height: 45, width: 35 }}
                />
              <Callout>
              </Callout>
          
              


              </MapView.Marker>
            )}
          {messages.map((message, i) => {
            // return (
            //   <MapView.Marker
            //     coordinate={{
            //       latitude: message.latitude,
            //       longitude: message.longitude,
            //     }}
            //     key={i}
            //     title={message.title}
            //     description={message.text}
            //     onPress={() => {
            //       setClickedMessage(message);
            //       setShowModal(true);
            //       //todo modal or redirect to drop post
            //       // withNavigation

            //       console.log(
            //         `You are at latitude ${message.latitude} and longitude ${message.longitude}`,
            //       );
            //     }}
            //   >
            //     <Callout
            //       alphaHitTest
            //       tooltip
            //       onPress={e => {
            //         if (
            //           e.nativeEvent.action === 'marker-inside-overlay-press' ||
            //           e.nativeEvent.action === 'callout-inside-press'
            //         ) {
            //           return;
            //         }
            //         //!can make full custom callout if we need it
            //         //todo have on press redirect to the post.
            //         console.log('callout pressed map js');
            //       }}
            //       style={styles.customView}
            //     />
            //   </MapView.Marker>
            // );
            message.calloutVisible =true;
            return ( 
              <NativeView>
                <MyMarker
                  props={{calloutVisible:true}}
                  key={message.userName}
                  coords={{
                    latitude: message.latitude,
                    longitude: message.longitude,
                  }}
                  calloutVisible={message.calloutVisible} 
                  >
              </MyMarker>
              </NativeView>
            )
          })}
        </MapView>
        <Modal
          isVisible={displayMessagesModal}
          coverScreen={true}
          scrollOffsetMax={400 - 300}
          backdropOpacity={0}
          onBackdropPress={() => toggleDisplayMessagesModal(false)}
          style={styles.modal}
        >
          <PreviewList screenProps={screenProps} />
        </Modal>
      </ScrollView>
      {!displayMessagesModal && (
        <Text
          style={styles.button}
          onPress={() => toggleDisplayMessagesModal(true)}
        >
          {' '}
          Display Messages{' '}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  local: {
    borderRadius: 10,
    padding: 10,
    paddingBottom: 10,
    margin: 3,
    backgroundColor: '#D7B377',
  },
  global: {
    borderRadius: 10,
    padding: 10,
    paddingBottom: 10,
    margin: 3,
    backgroundColor: '#385F71',
  },
  avatar: { backgroundColor: '#F5F0F6' },
  modal: {
    justifyContent: 'flex-end',
    marginTop: 400,
    paddingBottom: 32,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
  },
});
