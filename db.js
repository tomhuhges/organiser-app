import firebase from "firebase";
import "firebase/firestore";
import { isObject } from "lodash-es";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STOREAGE_BUCKET,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_APP_ID
} from '@env';

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STOREAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID
});

export const db = firebase.firestore();

const types = {
  type: 'string',
  types: ''
}

export const get = ({
  collection,
  type,
  types,
  tag,
  tags,
  date,
  dates,
  dateRange,
  dateRanges,
  title,
  titles,
  orderBy,
  limit,
  ...options
}) => {
  let query = db.collection(collection);

  // Object.entries(options).forEach(([key, option]) => {
  //   if (/type?s/.test(key)) {
  //     if (option)
  //   }
  //   if (/limit/.test(key)) {
  //     query = query.limit(option)
  //   }
  // })
  if (type) {
    query = query.where("type", "==", type)
  }
  if (tags) {
    if (isObject(tags)) {
      if (tags.all) {
        tags.value.forEach(tag => {
          query = query.where(`tagMap.${tag}`, "==", true);
        })
      } else {
        query = query.where("tagArray", "array-contains-any", tags.value)
      }
    } else {
      query = query.where("tagArray", "array-contains-any", tags)
    }
  }
  // if (date) {
  //   query = query.where("date", "==", date)
  // }
  // if (title) {
  //   query = query.where("title", "==", title)
  // }
  // if (orderBy) {
  //   query = query.orderBy(orderBy)
  // }
  query = query.orderBy(orderBy ?? 'date', 'desc')
  return query.get()
    .then(querySnapshot => {
      const items = [];
      querySnapshot.forEach(item => items.push({
        key: item.id,
        ...item.data()
      }));
      return items;
    });
}

export const getPosts = options => {
  return get({
    collection: 'posts',
    ...options
  })
}

export const getTypes = options => {
  return get({
    collection: 'types',
    ...options
  })
}

export const setPost = post => {
  return db.collection("posts").add(post)
    .then(function (docRef) {
      console.log('docRef', docRef);
      return {
        id: docRef.id,
        success: true
      };
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
      return {
        error,
        success: false
      }
    });
}