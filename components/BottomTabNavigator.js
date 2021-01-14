import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon, Button, OverflowMenu, MenuItem } from '@ui-kitten/components';
import NewPost from './NewPost';

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar-outline' />
);

const FolderIcon = (props) => (
  <Icon {...props} name='folder-outline' />
);

const BottomTabNavigator = ({ navigation, state }) => {
  const [newPostIndex, setNewPostIndex] = useState(null);
  const [newPostMenuVisible, setNewPostMenuVisible] = useState(false);
  const [newPostModalVisible, setNewPostModalVisible] = React.useState(false);

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={CalendarIcon} />
      <BottomNavigationTab icon={FolderIcon} />
      <BottomNavigationTab
        title={evaProps => (
          <Layout style={styles.newPostMenu} level='1'>
            <OverflowMenu
              visible={newPostMenuVisible}
              selectedIndex={newPostIndex}
              onSelect={(index) => {
                setNewPostIndex(index);
                setNewPostMenuVisible(false);
                setNewPostModalVisible(true);
              }}
              onBackdropPress={() => setNewPostMenuVisible(false)}
              anchor={() => (
                <Button
                  style={{ width: 40, height: 40 }}
                  onClick={() => setNewPostMenuVisible(true)}
                >
                  <Text category='h4' style={{ color: 'white' }}>＋</Text>
                </Button>
              )}
            >
              <MenuItem title='⏱ Log' />
              <MenuItem title='📅 Event' />
              <MenuItem title='🌿 Todo' />
              <MenuItem title='📌 Link' />
              <MenuItem title='📝 Note' />
            </OverflowMenu>
            <NewPost
              visible={newPostModalVisible}
              setVisible={setNewPostModalVisible}
            />
          </Layout>
        )}
      />
    </BottomNavigation>
  )
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  newPostMenu: {
    // minHeight: 144
  }
});