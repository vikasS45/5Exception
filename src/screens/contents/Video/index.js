/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors, Typography, Card} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Videos() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setRecords([]);
    const rec = await AsyncStorage.getItem('data');
    setRecords(JSON.parse(rec));
  };

  const clearAll = () => {
    AsyncStorage.clear();
    getData();
  };

  const InputForm = ({item}) => {
    return (
      <Card style={styles.card}>
        <View style={styles.center}>
          {item?.photo ? (
            <Image
              source={{
                uri: item.photo,
              }}
              style={styles.image}
              resizeMode={'contain'}
            />
          ) : (
            <AntDesign name="user" color={Colors.gray} size={100} />
          )}
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.input}>
            <Text style={styles.labelContainer}>Name</Text>
            <Text style={styles.text}>{item.name}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.labelContainer}>Designation</Text>
            <Text style={styles.text}>{item.designation}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.labelContainer}>Salary</Text>
            <Text style={styles.text}>{item.salary}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.labelContainer}>Address</Text>
            <Text style={styles.text}>{item.address}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            getData();
          }}>
          <Text style={styles.buttonText}>Get Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => clearAll()}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      {records?.length > 0 ? (
        <View>
          <FlatList data={records} renderItem={InputForm} />
        </View>
      ) : (
        <View style={styles.noData}>
          <AntDesign name="frowno" style={styles.userIcon} />
          <Text style={styles.noDataText}>Plz add some data.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 0.5,
    backgroundColor: Colors.eggBlue,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
    height: 40,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.coolBlue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Typography.primaryFontFamilyMedium,
    fontSize: 16,
    color: Colors.white,
  },
  margin: {
    marginTop: 10,
  },
  center: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  disable: {
    backgroundColor: Colors.coolGray,
  },
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  noDataText: {
    fontFamily: Typography.primaryFontFamilyMedium,
    fontSize: 25,
    color: Colors.coolGray,
  },
  labelContainer: {
    top: -10,
    left: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
    backgroundColor: Colors.eggBlue,
    position: 'absolute',
    fontFamily: Typography.primaryFontFamilyRegular,
    fontSize: 10,
    color: Colors.gray,
  },
  input: {
    height: 25,
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 15,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray,
  },
  text: {
    fontFamily: Typography.primaryFontFamilyMedium,
    fontSize: 14,
    color: Colors.bottomTabColor,
    //paddingHorizontal:15
  },
  secondContainer: {
    marginLeft: 10,
  },
  image: {
    height: 120,
    width: 120,
  },
  userIcon: {
    fontSize: 150,
    color: Colors.coolGray,
    opacity: 0.5,
  },
});
