export const newChat = (): void => {
  console.log("Starting a new chat...");
};

export const stopGenerating = (): void => {
  console.log("Stopping the content generation...");
};

export const onCloseModal = (): void => {
  console.log("Closing the modal...");
};

export const onViewSource = (source: string): void => {
  console.log(Viewing source: ${source});
};

export const disabledButton = (isDisabled: boolean): string => {
  return isDisabled ? "Button is disabled" : "Button is enabled";
};