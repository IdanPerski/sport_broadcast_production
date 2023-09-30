import { useState, useCallback, useMemo } from "react";
import { object, func } from "prop-types";
import Joi from "joi";
import formatNameToCamelCase from "../helpers/formatNameToCamelCase ";
const useForm = (initialForm, schema, handleSubmit) => {
  const [data, setData] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const handleReset = useCallback(() => {
    setData(initialForm);
    setErrors({});
  }, [initialForm]);

  const handleDateInput = useCallback((newDate) => {
    const selectedDate = new Date(newDate);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      setErrors((prev) => ({
        ...prev,
        date: "Selected date has already passed.",
      }));

      setData((prevData) => ({
        ...prevData,
        date: "",
      }));
      return;
    } else {
      setErrors((prev) => {
        let obj = { ...prev };
        if (obj.date) delete obj.date;
        return obj;
      });
    }
    console.log(selectedDate);
    setData((prev) => ({
      ...prev,
      date: selectedDate,
    }));
  }, []);

  const validateProperty = useCallback(
    ({ name, value }) => {
      const _name = formatNameToCamelCase(name);

      if (_name === "date") handleDateInput(value);

      const obj = { [_name]: value };

      const generateSchema = Joi.object({
        [_name]: schema[_name],
      });

      const { error } = generateSchema.validate(obj);
      // error == undefined ? console.log("no error") : console.log(error, "!!");
      return error ? error.details[0].message : null;
    },
    [schema, handleDateInput],
  );

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;

      console.log(name);
      console.log(value);
      let _value;
      if (Array.isArray(value)) _value = value[0];
      const _name = formatNameToCamelCase(name);
      console.log(_name);
      const errorMessage = validateProperty(target);
      console.log(errorMessage);
      if (errorMessage) {
        return setErrors((prev) => ({ ...prev, [_name]: errorMessage }));
      } else
        setErrors((prev) => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });
      const singelValue = [
        "type",
        "location",
        "cg",
        "editor",
        "audioEngineer",
        "visionMixerOperator",
        "director",
      ];

      if (singelValue.includes(_name)) {
        setData((prevData) => ({
          ...prevData,
          [_name]: value,
        }));
      } else {
        const currentDataKeyValue = data[_name];

        if (Array.isArray(currentDataKeyValue)) {
          const isIdInArray = currentDataKeyValue.some(
            (obj) => obj._id === _value._id,
          );
          const updatedArray = isIdInArray
            ? currentDataKeyValue.filter((obj) => obj._id !== _value._id)
            : [...currentDataKeyValue, _value];

          setData((prevData) => ({
            ...prevData,
            [_name]: updatedArray,
          }));
        } else {
          const filteredArray = currentDataKeyValue.filter((person) => {
            return person !== _value;
          });
          setData((prevData) => ({
            ...prevData,
            [_name]: filteredArray,
          }));
        }
      }
    },

    [validateProperty, data],
  );

  const handleChangeAtTextField = useCallback(
    ({ target }) => {
      const { name, value } = target;
      const errorMessage = validateProperty(target);
      if (errorMessage)
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      else
        setErrors((prev) => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });

      setData((prev) => ({ ...prev, [name]: value }));
    },
    [validateProperty],
  );

  const validateForm = useCallback(() => {
    const schemaForValidate = Joi.object(schema);

    const { error } = schemaForValidate.validate(data);
    console.log(error);
    if (error) return error;
    return null;
  }, [schema, data]);

  const onSubmit = useCallback(() => {
    handleSubmit(data);
  }, [handleSubmit, data]);

  const value = useMemo(() => {
    return { data, errors };
  }, [data, errors]);

  return {
    value,
    onSubmit,
    handleChange,
    handleReset,
    validateForm,
    handleDateInput,
    setData,
    handleChangeAtTextField,
  };
};

useForm.propTypes = {
  initialForm: object.isRequired,
  schema: object.isRequired,
  handleSubmit: func.isRequired,
};

export default useForm;
