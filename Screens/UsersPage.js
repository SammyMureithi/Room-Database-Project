import React, {useEffect, useState} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'MyDatabase.db'});
function UsersPage({navigation}) {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM users_details', [], (tx, result) => {
        let newArray = [];
        for (i = 0; i < result.rows.length; i++) {
          newArray.push(result.rows.item(i));
        }
        setUsers(newArray);
      });
    });
  }, []);

  function handleDelete(id) {
    db.transaction(txn => {
      txn.executeSql(
        'DELETE  FROM  users_details WHERE user_id=?',
        [id],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            const afterDelete = users.filter(user => user.user_id !== id);
            setUsers(afterDelete);
            Alert.alert('Success', 'Item Deleted Successful');
          } else {
            Alert.alert('Failed', 'Failed to delete');
          }
        },
      );
    });
  }
  function UpdateUser(id) {
    navigation.navigate('Detailed', {
      user_id: id,
    });
  }
  const res =
    users !== null
      ? users.map(element => {
          return (
            <View
              key={element.user_id}
              style={{
                borderWidth: 2,
                borderColor: 'black',
                marginEnd: 30,
                marginStart: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>First Name: {element.firts_name}</Text>
                <Text>Last Name: {element.last_name}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginStart: 20,
                  marginEnd: 20,
                  padding: 10,
                }}>
                <Button
                  title="Update"
                  onPress={() => UpdateUser(element.user_id)}
                />
                <Button
                  title="Delete"
                  onPress={() => handleDelete(element.user_id)}
                />
              </View>
            </View>
          );
        })
      : null;
  return <View>{res}</View>;
}

export default UsersPage;
