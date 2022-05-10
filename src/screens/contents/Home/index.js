/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import {Colors, Typography, Card} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const Home = () => {
  const [id, setId] = useState(0);
  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [msg, setMessage] = useState('Hello');

  console.log('data ============>', data);

  const newEntry = () => {
    setVisible(true);
    setId(id + 1);
    const entry = {
      userId: id,
      photo: '',
      name: '',
      designation: '',
      salary: '',
      address: '',
    };
    setData([...data, entry]);
    setMessage('New Form Added Successfully');
  };

  useEffect(() => {
    showMessage({
      message: msg,
      icon: 'success',
      type: 'info',
      backgroundColor: Colors.coolBlue,
    });
  }, [msg]);

  const deleteFromData = index => {
    let newArray = [];
    newArray = data.filter(item => item.userId !== index);

    setData(newArray);
    setMessage('Form Deleted Successfully');
  };

  const clearAll = value => {
    setId(0);
    setData([]);
    if (value === 'delete') {
      setMessage('All Forms Deleted Successfully');
    } else {
      setMessage('All Data Uploaded In AsyncStorage Successfully');
    }
  };

  useEffect(async () => {
    //  AsyncStorage.clear();
    const rec = await AsyncStorage.getItem('data');
    setRecords(rec);
    console.log('From Async', rec);
  });

  useEffect(() => {
    requestExternalWritePermission();
  }, []);

  const saveDataToAsync = async () => {
    await AsyncStorage.setItem('data', JSON.stringify(data));
    clearAll('stored');
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        console.log('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (count, value, key) => {
    let newValues = [...data];
    newValues[count][key] = value;
    setData([...newValues]);
  };

  const chooseFile = (count, key) => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        console.log('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        console.log('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        console.log(response.errorMessage);
        return;
      }
      let newValues = [...data];
      newValues[count][key] = response.assets[0].uri;
      setData([...newValues]);
    });
  };

  const InputForm = ({item}) => {
    return (
      <Card style={styles.card}>
        <View style={styles.content}>
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

            <TouchableOpacity
              onPress={() => chooseFile(item.userId, 'photo')}
              style={[styles.button, styles.margin]}>
              <Text style={styles.buttonText}>Choose Photo</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              placeholder="Enter Your Name "
              placeholderTextColor={Colors.gray}
              onChangeText={name => {
                handleChange(item.userId, name, 'name');
              }}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Enter Your Designation "
              placeholderTextColor={Colors.gray}
              style={styles.textInput}
              onChangeText={designation => {
                handleChange(item.userId, designation, 'designation');
              }}
            />
            <TextInput
              placeholder="Enter Your Salary "
              placeholderTextColor={Colors.gray}
              style={styles.textInput}
              onChangeText={salary => {
                handleChange(item.userId, salary, 'salary');
              }}
            />
            <TextInput
              placeholder="Enter Address "
              placeholderTextColor={Colors.gray}
              style={styles.textInput}
              onChangeText={address => {
                handleChange(item.userId, address, 'address');
              }}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteFromData(item.userId)}>
          <AntDesign name="delete" style={styles.deleteIcon} />
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlashMessage position="top" style={styles.flashMsg} />
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            newEntry();
          }}>
          <AntDesign name="pluscircle" color={Colors.coolBlue} size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => clearAll('delete')}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      {data.length > 0 ? (
        <View>
          <FlatList data={data} renderItem={InputForm} />
          <TouchableOpacity
            style={[styles.button, !visible && styles.disable]}
            disabled={!visible}
            onPress={() => {
              saveDataToAsync();
            }}>
            <Text style={styles.buttonText}> Save </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noData}>
          <AntDesign name="frowno" style={styles.userIcon} />
          <Text style={styles.noDataText}>Plz add some data.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flashMsg: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  card: {
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
  image: {
    height: 100,
    width: 100,
  },
  deleteIcon: {
    fontSize: 25,
    color: Colors.black,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  userIcon: {
    fontSize: 150,
    color: Colors.coolGray,
    opacity: 0.5,
  },
});

export default Home;
