import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, List, Card, Text, Spinner } from '@ui-kitten/components';
import { getPosts } from '../db';

const CalendarScreen = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts().then(posts => setPosts(posts));
  }, []);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {posts ? (
        <List
          data={posts}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => (
            <Card
              style={styles.item}
              status='success'
            >
              <Text category="h1">{item.title}</Text>
              <Text>{item.body}</Text>
            </Card>
          )}
        />
      ) : (
          <Spinner status='success' />
        )}
    </Layout>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: '100%',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  }
});