import {StyleSheet} from 'react-native';
import {normalize} from '../../Utils/normalize';

export default StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems:'flex-start',
    paddingTop: normalize(20),
  },
  profileContainer: {
    margin: normalize(20),
  },
  profileImage: {
    width: normalize(85),
    height: normalize(85),
    borderRadius: normalize(100),
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#C1F1FF',
  },
  welcomeText: {
    fontSize: normalize(15),
    color: '#666',
  },
  nameText: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  drawerItemsContainer: {
    paddingHorizontal: 10,
  },
  labelStyle: {
    fontSize: normalize(14), // Change the font size
    color: '#0F0F0F', // Change the text color
    fontWeight: 'bold', // Make the text bold
    marginLeft: normalize(-12),
    marginBottom: normalize(2),
  },
  version: {
    margin: normalize(20),
    marginLeft: normalize(25),
    color: 'black',
    fontSize: normalize(13),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  logoutButton: {
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
