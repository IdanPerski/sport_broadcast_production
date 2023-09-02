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
        ["date"]: "Selected date has already passed.",
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
    [schema],
  );

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      const _value = value[0];
      const _name = formatNameToCamelCase(name);
      // target = { name: _name, value: _value };
      // console.log(target);
      const errorMessage = validateProperty(target);
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

      if (singelValue.includes(_name))
        setData((prevData) => ({
          ...prevData,
          [_name]: _value,
        }));
      else {
        const currentDataKeyValue = data[_name];
        // const _value = _value.toString();
        console.log(_value, "!!!!!!!!!!!!!!!!!!!");
        if (
          Array.isArray(currentDataKeyValue) &&
          !currentDataKeyValue.includes(_value)
        ) {
          const updatedArray = [...currentDataKeyValue, _value];
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

  const validateForm = useCallback(() => {
    const schemaForValidate = Joi.object(schema);
    const { error } = schemaForValidate.validate(data);
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
  };
};

useForm.propTypes = {
  initialForm: object.isRequired,
  schema: object.isRequired,
  handleSubmit: func.isRequired,
};

export default useForm;
