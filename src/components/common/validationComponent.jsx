import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { errorTypes } from '../../config/commonFunction';

const validateLength = (val, value) => {
  const length = Array.isArray(value) ? value.length : value?.length || 0;
  return !(val.min && length < val.min || val.max && length > val.max);
};

const validateRegExp = (val, value) => {
  try {
    const regex = new RegExp(val.reg_exp);
    return regex.test(value);
  } catch {
    console.error('Invalid RegExp:', val.reg_exp);
    return false;
  }
};

// Main field validation logic
const validateField = (requiredFields = [], dataFields = {}) => {
  try {
    let status = 1;
    _.forEach(requiredFields, (val) => {
      let value = dataFields[val.field_name] ? dataFields[val.field_name].toString() : '';
      let valFormatted = value.trim();

      switch (val.field_type) {
        case 'default':
          if (!valFormatted) return status = 0;
          break;
        case 'length':
          if (!validateLength(val, dataFields[val.field_name])) return status = 0;
          break;
        case 'reg_exp':
          if (!validateRegExp(val, value)) return status = 0;
          break;
        case 'reg_exp_non_required':
          if (value && !validateRegExp(val, value)) return status = 0;
          break;
        default:
          break;
      }
    });
    return status;
  } catch (e) {
    console.error('Validation Error: ', e);
    return 0;
  }
};

const validateFieldWithNewErrorCodes = (requiredFields = [], dataFields = {}) => {
  const errorMessages = [];

  _.forEach(requiredFields, (field) => {
    const {
      field_name: fieldName,
      label: fieldLabel,
      error_code: errorCode,
      validation_params = {}
    } = field;

    const fieldValue = dataFields[fieldName]?.toString().trim() || '';

    switch (errorCode) {
      case 1:
        if (!fieldValue) {
          errorMessages.push(validation_params?.custom_message || `${fieldLabel} is required`);
        }
        break;

      case 2: {
        const { compare_with, digits_to_compare = 4, custom_message } = validation_params;
        const compareValue = dataFields[compare_with];
        if (compareValue) {
          const valA = fieldValue.slice(0, digits_to_compare);
          const valB = compareValue.slice(0, digits_to_compare);
          if (valA !== valB) {
            errorMessages.push(custom_message || `${fieldLabel} must match first ${digits_to_compare} digits of ${compare_with}`);
          }
        }
        break;
      }

      case 3: {
        const { min_value = 0, custom_message } = validation_params;
        if (parseInt(fieldValue) < min_value) {
          errorMessages.push(custom_message || `${fieldLabel} cannot be less than ${min_value}`);
        }
        break;
      }

      case 4: {
        const { max_value, custom_message } = validation_params;
        if (parseInt(fieldValue) > max_value) {
          errorMessages.push(custom_message || `${fieldLabel} cannot be more than ${max_value}`);
        }
        break;
      }

      case 5: {
        const { reg_exp, custom_message } = validation_params;
        const regex = new RegExp(reg_exp);
        if (!regex.test(fieldValue)) {
          errorMessages.push(custom_message || `${fieldLabel} format is invalid`);
        }
        break;
      }

      default:
        break;
    }
  });

  return errorMessages;
};

const ValidationMessage = ({ message }) => (
  <div className="invalid-feedback" style={{ display: 'block' }}>
    {message}
  </div>
);

const validationMessages = {
  textField: (fieldValue, fieldLabel, customErrorMessage) => !fieldValue ? customErrorMessage || `Please enter ${fieldLabel}` : null,
  dropDown: (fieldValue, fieldLabel, customErrorMessage) => (!fieldValue || fieldValue === 'Select') ? customErrorMessage || `Please select ${fieldLabel}` : null,
  validLogin: (fieldValue, customErrorMessage) => fieldValue === false ? customErrorMessage || 'Please enter valid credentials' : null,
  requiredField: (fieldValue, customErrorMessage) => !fieldValue ? customErrorMessage || 'This field is required' : null,
};

const getValidationMessage = (fieldType, fieldValue, fieldLabel, customErrorMessage) => {
  const messageFunction = validationMessages[fieldType];
  return messageFunction ? messageFunction(fieldValue, fieldLabel, customErrorMessage) : null;
};

const useValidation = (requiredFields, dataFields) => {
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    const validationResult = validateField(requiredFields, dataFields);
    const errorMessages = validateFieldWithNewErrorCodes(requiredFields, dataFields);
    // console.log('Validation Result:', validationResult);
    // console.log('Error Messages:', errorMessages);
    if (errorMessages.length > 0) {
      setErrorStatus(true);
    } else {
      setErrorStatus(validationResult === 0);
    }
  }, [requiredFields, dataFields]);

  return errorStatus;
};

export const validateFieldWithErrorType = (
  requiredFields = [],
  dataFields = {},
  forRedux = false,
  blockName = ''
) => {
  const errorDetails = [];

  _.forEach(requiredFields, (field) => {
    const fieldName = field.field_name;
    const fieldValue = dataFields[fieldName] ? dataFields[fieldName].toString() : '';
    const fieldLabel = field.label;

    let message = '';
    switch (field.error_code) {
      case errorTypes.FOD_HARD_ERROR:
        if (!fieldValue) message = `${fieldLabel} is required`;
        break;
      case errorTypes.NOT_DEFINED:
        message = `${fieldLabel} is not defined properly`;
        break;
      case errorTypes.FOD_SOFT_ERROR:
        if (!fieldValue) message = `${fieldLabel} is required`;
        break;
      case errorTypes.CSO_SOFT_ERROR:
        if (fieldValue && !validateRegExp(field, fieldValue)) {
          message = `Invalid ${fieldLabel}`;
        }
        break;
      default:
        break;
    }

    if (message) {
      errorDetails.push(
        forRedux
          ? {
            id: errorDetails.length + 1,
            title: message,
            blockName,
            rowNo: '-',
          }
          : message
      );
    }
  });

  return errorDetails;
};

const ValidationComponent = ({
  fieldType,
  isError,
  fieldValue,
  fieldLabel,
  customErrorMessage,
  requiredFields,
  dataFields,
  returnType = "POPUP"
}) => {
  const errorStatus = useValidation(requiredFields, dataFields);
  const validationMessage = getValidationMessage(fieldType, fieldValue, fieldLabel, customErrorMessage);
  const errorMessages = validateFieldWithErrorType(requiredFields, dataFields);

  return (
    <>
      {returnType == "FIELD" && errorStatus && validationMessage && isError ? <ValidationMessage message={validationMessage} /> : null}
      {returnType == "POPUP" && errorMessages.length > 0 && errorMessages.map((msg, idx) => <ValidationMessage key={idx} message={msg} />)}
    </>
  );
};

export default ValidationComponent;
