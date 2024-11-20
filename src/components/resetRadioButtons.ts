const resetRadioButtons = (
  formRef: React.RefObject<HTMLFormElement>,
  loadout: string
) => {
  const inputs = formRef.current?.querySelectorAll(
    `input[name$='-${loadout}']`
  ) as NodeListOf<HTMLInputElement>;
  inputs?.forEach((input) => (input.checked = false));
};

export default resetRadioButtons;
