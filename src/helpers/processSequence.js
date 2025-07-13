/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import { tryCatch } from 'ramda';

const api = new Api();

const validateInput = (value) => {
  if (value.length <= 2 || value.length >= 10) {
    throw 'ValidationError';
  }
  
  const regex = /^[0-9]+(\.[0-9]+)?$/;
  if (!regex.test(value)) {
    throw 'ValidationError';
  }
  
  return value;
};

const roundToNearestInteger = (value) => Math.round(parseFloat(value));

const handleApiError = (error) => {
  throw error;
};

const convertToBinary = (number) => {
  return api.get('https://api.tech/numbers/base')({
    from: 10,
    to: 2,
    number: number.toString()
  })
  .then(({ result }) => result)
  .catch(handleApiError);
};

const getLength = (str) => str.length;

const square = (num) => num * num;

const modulo3 = (num) => num % 3;

const getAnimalById = (id) => {
  return api.get(`https://animals.tech/${id}`)({})
    .then(({ result }) => result)
    .catch(handleApiError);
};

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  writeLog(value);
  tryCatch(
    () => Promise.resolve(value)
      .then((val) => {
        const validatedValue = validateInput(val);
        return validatedValue;
      })
      .then((val) => {
        const roundedValue = roundToNearestInteger(val);
        writeLog(roundedValue);
        return roundedValue;
      })
      .then((val) => {
        return convertToBinary(val)
          .then((binaryResult) => {
            writeLog(binaryResult);
            return binaryResult;
          });
      })
      .then((val) => {
        const lengthValue = getLength(val);
        writeLog(lengthValue);
        return lengthValue;
      })
      .then((val) => {
        const squaredValue = square(val);
        writeLog(squaredValue);
        return squaredValue;
      })
      .then((val) => {
        const moduloValue = modulo3(val);
        writeLog(moduloValue);
        return moduloValue;
      })
      .then((val) => {
        return getAnimalById(val)
          .then((animal) => {
            handleSuccess(animal);
            return animal;
          });
      }),
    (error) => {
      handleError(error);
    }
  )();
};

export default processSequence;
