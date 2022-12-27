import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValid, setFormValid] = useState({});

  //cada vez qu cambia el estado del formulario, paso por las validaciones
  useEffect(() => {
    createValidators();
  }, [formState]);

  //cuando cambia el formulario inicial(al seleccionar otra nota), actualizo el formulario
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);
  

  const isFormValid = useMemo(() => {

    for (const formValue of Object.keys(formValid)) {
      if (formValid[formValue] !== null) return false;
    }

    return true;
  }, [formValid])

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const onResetForm = () => {
    setFormState(initialForm);
  }

  //crea un nuevo estado para saber qué campos tiene error
  const createValidators = () => {
    const formCheckedValues = {};
    for (const validationKey of Object.keys(formValidations)) {
      //console.log(validationKey);
      const [fn, errorMessage] = formValidations[validationKey];

      formCheckedValues[`${validationKey}Valid`] = fn(formState[validationKey]) ? null : errorMessage;

    }
    setFormValid(formCheckedValues);
  }

  return {
    //retorna una variable por cada campo del objeto
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValid,
    isFormValid
  }
}