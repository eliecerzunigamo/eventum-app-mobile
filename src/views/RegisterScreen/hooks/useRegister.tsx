import React, { useState } from "react";
import { useApi } from "../../../common/utils/useApi";
import { RegisterForm } from "../RegisterScreen";

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { post } = useApi();

  const register = async (registerForm: RegisterForm) => {
    setLoading(true);
    try {
      const path = "users/register";
      await post<RegisterForm, null, null>(path, registerForm);
      setSuccess(true);
    } catch (error: any) {
      setOpenErrorModal(true);
      if (!error.response.data.message) {
        setError("Error de conexión");
        return;
      }

      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  return {
    register,
    loading,
    error,
    success,
    openErrorModal,
    closeErrorModal,
  };
};
