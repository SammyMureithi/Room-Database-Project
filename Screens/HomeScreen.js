import React from 'react';
import {useEffect} from 'react';
import {Button, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'MyDatabase.db'});
function HomeScreen({navigation}) {
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT name from sqlite_master WHERE type="table" AND name="users_details" ',
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS users_details', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS users_details (user_id INTEGER PRIMARY KEY AUTOINCREMENT, firts_name VARCHAR(20), last_name VARCHAR(20))',
              [],
            );
          }
        },
      );
    });
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Add New User"
        onPress={() => navigation.navigate('AddUser')}
      />
      <Button title="Users" onPress={() => navigation.navigate('Users')} />
    </View>
  );
}

export default HomeScreen;
