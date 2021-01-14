import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Card, Text, Button, Input, Datepicker } from '@ui-kitten/components';
import { setPost } from '../db';

const NewLog = ({ setVisible }) => {

  const [buttonLabel, setButtonLabel] = useState('Save');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState('1 hour');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    setButtonLabel('Saving...');
    setPost({
      title,
      type: 'log',
      date,
      duration,
      body
    })
      .then(response => {
        console.log('response', response);
        if (response.success) {
          setButtonLabel('Saved!');
          setTimeout(() => setVisible(false), 2000);
        } else {
          setButtonLabel('Error. Try again');
          setTimeout(() => setButtonLabel('Save'), 2000);
        }
      })
  }

  return (
    <View style={styles.layout}>
      <Card disabled={true} style={styles.card}>
        <Text category="h2">New Log</Text>
        <Input
          placeholder='Title'
          value={title}
          onChangeText={nextValue => setTitle(nextValue)}
        />
        <Datepicker
          date={date}
          onSelect={nextDate => setDate(nextDate)}
        />
        <Input
          placeholder='Duration'
          value={duration}
          onChangeText={nextValue => setDuration(nextValue)}
        />
        <Input
          placeholder='Add notes...'
          value={body}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          onChangeText={nextValue => setBody(nextValue)}
        />
        <Input
          placeholder='Tags'
          value={tags}
          onChangeText={nextValue => setTags(nextValue)}
        />
        <Button onPress={handleSubmit}>
          {buttonLabel}
        </Button>
      </Card>
    </View>
  )
}

const NewPostScreen = ({ visible, setVisible }) => {

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <NewLog setVisible={setVisible} />
    </Modal>
  )
};

export default NewPostScreen;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: '100vw',
    height: '90vh',
    borderBottomLeftRadius: '0px !important',
    borderBottomRightRadius: '0px !important',
  },
  layout: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'transparent!important',
    display: 'flex',
    justifyContent: 'flex-end'
  }
});