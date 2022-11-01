import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'SQLite.db'});
function App() {
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name from sqlite_master WHERE type='table' AND name='user_table'",
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            console.log('Table Not Found');
            txn.executeSql('DROP TABLE IF  EXISTS user_table', []);
            txn.executeSql(
              'CREATE TABLE  IF NOT EXISTS user_table(user_id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR(20) ,last_name VARCHAR(20)) ',
              [],
            );
          } else {
            console.log('Table found');
          }
        },
      );
    });
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello</Text>
    </View>
  );
}

export default App;
