import {grey} from '@mui/material/colors';
import React from 'react';
import {useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'MyDatabase.db'});
function AddUserScreen() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  function addUser() {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO users_details (firts_name,last_name) VALUES (?,?)',
        [firstName, lastName],
        (tx, res) => {
          if (res.rowsAffected > 0) {
            console.log(`${res.rowsAffected} Record Inserted Successfully`);
            Alert.alert(
              'Success',
              `${res.rowsAffected} Record Inserted Successfully`,
            );
            setFirstName(null);
            setLastName(null);
          } else {
            Alert.alert('Unsuccessful', 'Failed to add user');
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
        value={firstName}
        onChangeText={e => setFirstName(e)}
        style={{
          borderRadius: 2,
          borderColor: 'grey',
          borderWidth: 1,
          width: 100,
        }}
      />
      <TextInput
        placeholder="Last name"
        value={lastName}
        onChangeText={e => setLastName(e)}
        style={{
          borderRadius: 2,
          borderColor: 'grey',
          borderWidth: 1,
          width: 100,
        }}
      />
      <Button title="Add User" onPress={addUser} />
    </View>
  );
}

export default AddUserScreen;
