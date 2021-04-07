import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
      },
      background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },
      button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
      },
      text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
      },
    });

export default styles