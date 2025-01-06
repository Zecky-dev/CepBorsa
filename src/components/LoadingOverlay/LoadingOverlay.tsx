import {t} from 'i18next';
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  visible: boolean;
};

const LoadingOverlay = ({visible}: Props) => {
  return (
    <Modal isVisible={visible} style={styles.overlayModal} animationInTiming={1} animationOutTiming={1}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={'white'} />
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 24,
  },
  overlayModal: {
    padding: 0,
    margin: 0,
  },
});

export default LoadingOverlay;
