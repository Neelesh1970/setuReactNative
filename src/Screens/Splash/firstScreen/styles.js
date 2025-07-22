import {StyleSheet} from 'react-native';
import {normalize} from '../../../Utils/normalize';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'blue'
  },
  heading: {
    fontSize: normalize(35),
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: normalize(150),
    width: normalize(350),
  },
});
