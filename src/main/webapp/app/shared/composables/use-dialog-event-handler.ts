// useDialog.js (Composable)
// import { ref } from 'vue';

export function useDialogEventHandler(dialogRef: any) {
  // Funktion zum Öffnen des Dialogs
  const openDialog = () => {
    dialogRef.value = true;
  };

  // Funktion zum Schließen des Dialogs
  const closeDialog = () => {
    dialogRef.value = false;
  };

  // Beispielhafte Funktion für eine Aktion
  const handleAction = function (callback: Function) {
    // Hier kann eine benutzerdefinierte Aktion ausgeführt werden
    callback();
    console.log('Aktion ausgeführt');
    closeDialog();
  };

  return {
    openDialog,
    closeDialog,
    handleAction,
  };
}
