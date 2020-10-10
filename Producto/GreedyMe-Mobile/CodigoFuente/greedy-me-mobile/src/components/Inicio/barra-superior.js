import * as React from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';

function BarraSup(props) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Appbar style={styles.container}>
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <Appbar.Action
            icon="map-marker-outline"
            onPress={() => console.log('Pressed mail')}
            style={styles.ico}
          />
          <Appbar.Action
            icon="bell-outline"
            onPress={() => console.log('Pressed label')}
            style={styles.ico}
          />
        </Appbar>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerTeclado: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: 30,
  },
  search: {
    width: '70%',
  },
  ico: {
    width: '15%',
  },
  header: {
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(BarraSup);
