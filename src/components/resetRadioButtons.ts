const resetRadioButtons = (formRef: React.RefObject<HTMLFormElement>) => {
  if (formRef.current) {
    const inputs = formRef.current.querySelectorAll("input[type=radio]");
    inputs.forEach((input) => {
      (input as HTMLInputElement).checked = false;
    });
  }
};

export default resetRadioButtons;
