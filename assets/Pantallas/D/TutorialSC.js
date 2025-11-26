import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useTheme } from '../../Resources/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function TutorialDialog({ visible, onDismiss }) {
  const [step, setStep] = React.useState(1);
  const { theme } = useTheme();
  const { t } = useTranslation(); 

  const steps = [
    {
      title: t('tutorial.steps.welcome.title'),
      text: t('tutorial.steps.welcome.text'),
    },
    {
      title: t('tutorial.steps.qr.title'),
      text: t('tutorial.steps.qr.text'),
    },
    {
      title: t('tutorial.steps.search.title'),
      text: t('tutorial.steps.search.text'),
    },
    {
      title: t('tutorial.steps.offers.title'),
      text: t('tutorial.steps.offers.text'),
    },
    {
      title: t('tutorial.steps.map.title'),
      text: t('tutorial.steps.map.text'),
    },
    {
      title: t('tutorial.steps.settings.title'),
      text: t('tutorial.steps.settings.text'),
    },
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onDismiss();
      setStep(1);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.dialog, { backgroundColor: theme.colors.dialogS }]}
      >
        <Dialog.Title
          style={{ color: theme.colors.text, textAlign: 'center' }}
        >
          {steps[step - 1].title}
        </Dialog.Title>

        <Dialog.Content>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.text, textAlign: 'center' }}
          >
            {steps[step - 1].text}
          </Text>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          {step > 1 && (
            <Button
              mode="outlined"
              onPress={handlePrev}
              textColor={theme.colors.primary}
            >
              {t('tutorial.buttons.previous')}
            </Button>
          )}
          <Button
            mode="contained"
            onPress={handleNext}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
          >
            {step < steps.length
              ? t('tutorial.buttons.next')
              : t('tutorial.buttons.finish')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 20,
    marginHorizontal: 15,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
