import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, AsyncStorage} from 'react-native';

async function navigation(params) {
  var DATA = [];
    if (params.title === 'Lexique') {
      const tabMots = await JSON.parse(await AsyncStorage.getItem('allMots'))
      for (var cpt = 0; cpt < tabMots.length; cpt++) {
        DATA[DATA.length] = {
          id: tabMots[cpt].idMot,
          title: tabMots[cpt].mot,
          link: 'MainPage'
        }
      }
      params.nav.navigate('LexiquePage', {DATA: {DATA}, color: params.color})
    } else {
      var idTheme = -1;
      cpt = 0;
      while (idTheme === -1) {
        var theme = JSON.parse(await AsyncStorage.getItem('theme' + cpt));
        if (theme.nomTheme === params.title) {
          idTheme = theme.idTheme
        }
        cpt++
      }
      var allExercices = JSON.parse(await AsyncStorage.getItem('allExercices'))
      var matchExercices = []
      for (cpt = 0; cpt < allExercices.length; cpt++) {
        console.log(allExercices[cpt].themeId + '     ' + idTheme)
        if (allExercices[cpt].themeId === idTheme) {
          matchExercices[matchExercices.length] = allExercices[cpt];
        }
      }
      for (cpt = 0; cpt < matchExercices.length; cpt++) {
        DATA[DATA.length] = {
          id: matchExercices[cpt].idExercice,
          title: matchExercices[cpt].nomExercice,
          link: 'ExerciseScreen'
        }
      }
      params.nav.navigate('ExercisesPage', {DATA: {DATA}, color: params.color})
    }
}

const Item = (item) => (
  <View style={styles.item} backgroundColor={item.color} onStartShouldSetResponder={() => navigation(item)}>
    <Text style={styles.title}>{item.title}</Text>
  </View>
);


const ItemList = (props) => {
  const renderItem = ({ item }) => (
    <Item title={item.title} color={props.color} link={item.link} nav={props.navigation}/>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList

        data={props.DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
});


export default ItemList;