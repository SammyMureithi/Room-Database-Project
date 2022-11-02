import React, {useEffect, useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'MyDatabase.db'});
function DetailedUser({route, navigation}) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    db.transaction(trn => {
      trn.executeSql(
        'SELECT * FROM users_details WHERE user_id=?',
        [route.params.user_id],
        (tx, result) => {
          if (result.rows.length > 0) {
            let newArray = [];
            newArray.push(result.rows.item(0));
            setUserData(result.rows.item(0));
          }
        },
      );
    });
  }, []);
  function handleUpdate(id) {
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE users_details SET firts_name=?,last_name=? WHERE user_id=?',
        [userData.firts_name, userData.last_name, id],
        (rx, res) => {
          if (res.rowsAffected > 0) {
            Alert.alert('Success', 'Update done successfully');
            //navigation.navigate('Users');
          } else {
            Alert.alert('Failed', 'Failed to Update');
          }
        },
      );
    });
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TextInput
        placeholder="First name"
        value={userData !== null ? userData.firts_name : null}
        onChangeText={e =>
          setUserData(prevData => {
            return {...prevData, firts_name: e};
          })
        }
        style={{
          borderRadius: 2,
          borderColor: 'grey',
          borderWidth: 1,
          width: 100,
        }}
      />
      <TextInput
        placeholder="Last name"
        value={userData !== null ? userData.last_name : null}
        onChangeText={e =>
          setUserData(prevData => {
            return {...prevData, last_name: e};
          })
        }
        style={{
          borderRadius: 2,
          borderColor: 'grey',
          borderWidth: 1,
          width: 100,
        }}
      />
      <Button
        title="Update"
        onPress={() => handleUpdate(route.params.user_id)}
      />
    </View>
  );
}

export default DetailedUser;
