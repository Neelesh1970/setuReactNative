import {StyleSheet} from 'react-native';
import {normalize} from '../../Utils/normalize';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalize(15),
    paddingLeft: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    marginBottom: normalize(4),
  },
  subView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    height: normalize(32),
    width: normalize(32),
    backgroundColor: '#C1F1FF',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: normalize(10),
  },
  title: {
    fontSize: normalize(16),
    fontWeight: '500',
    color: 'black',
  },
  image: {
    height: normalize(32),
    width: normalize(32),
    marginRight: normalize(10),
    marginLeft: normalize(-1),
    borderRadius: 100,
  },
  name: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: '#2C2B2B',
    letterSpacing: normalize(2),
  },
  status: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: '#888888',
    letterSpacing: normalize(2),
  },
});
