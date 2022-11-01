import React from 'react';
import {useEffect} from 'react';
import {Button, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'MyDatabase.db'});
function HomeScreen() {
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT name from sqlite_master WHERE type="table" AND name="users_details" ',
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            console.log('Table not Found');
            txn.executeSql('DROP TABLE IF EXISTS users_details', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS users_details (user_id INTEGER PRIMARY KEY AUTOINCREMENT, firts_name VARCHAR(20), last_name VARCHAR(20))',
              [],
            );
          } else {
            console.log('Table already exists');
          }
        },
      );
    });
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Add New User" />
      <Button title="View Users" />
    </View>
  );
}

export default HomeScreen;
