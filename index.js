/**
 * @format
 */
// Only import react-native-gesture-handler on native platforms
import App from './App';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
