import {ColorSchemeName, StyleSheet} from 'react-native';
import {createThemeColors} from '@utils/themes';

const getStyles = (theme: ColorSchemeName) => {
  const colors = createThemeColors(theme);
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 16,
      marginTop: 8,
      marginBottom: 32,
      alignItems: 'flex-end',
    },
    userContainer: {
      justifyContent: 'flex-end',
    },
    botContainer: {
      justifyContent: 'flex-start',
    },
    userBubble: {
      borderBottomRightRadius: 4,
    },
    botBubble: {
      borderBottomLeftRadius: 4,
    },
    userTail: {
      right: -10,
      borderBottomLeftRadius: 16,
      transform: [{scaleX: 0.4}],
    },
    botTail: {
      left: -10,
      borderBottomRightRadius: 16,
      transform: [{scaleX: 0.4}],
    },
    message: {
      fontSize: 16,
      color: '#000',
    },
    senderName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#000',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      bottom: -24,
    },
    userBubbleWrapper: {
      marginRight: 4,
    },
    botBubbleWrapper: {
      marginLeft: 4,
    },
    bubbleWrapper: {
      position: 'relative',
      maxWidth: '85%',
    },
    bubble: {
      padding: 12,
      borderRadius: 20,
      backgroundColor: colors.boxBackground,
    },
  });
};

export default getStyles;
