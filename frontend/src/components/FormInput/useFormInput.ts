import { HTMLInputTypeAttribute, MouseEvent, useState } from "react";

function useFormInput() {
  // allow handle password inputs to show or hide the password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getTextFieldType = (type: HTMLInputTypeAttribute | undefined) => {
    // Return text by default
    if (typeof type === "undefined") {
      return "text";
    }

    // If is type password, handle the logic to hide and show the password
    if (type === "password") {
      if (showPassword) {
        return "text";
      }
      return "password";
    }

    // Return the default type
    return type;
  };

  return {
    showPassword,
    handleClickShowPassword,
    getTextFieldType,
    handleMouseDownPassword,
  };
}
export default useFormInput;
