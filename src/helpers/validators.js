/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { allPass, anyPass, equals, compose, filter, length, gte, propEq, values, prop, not, and, both } from 'ramda';

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    if (triangle !== 'white' || circle !== 'white') {
        return false;
    }

    return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => {
    const greenCount = length(filter(equals('green'))(values(shapes)));
    return greenCount >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
    const redCount = length(filter(equals('red'))(values(shapes)));
    const blueCount = length(filter(equals('blue'))(values(shapes)));
    return redCount === blueCount && (redCount > 0 || blueCount > 0);
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    propEq('circle', 'blue'),
    propEq('star', 'red'),
    propEq('square', 'orange')
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
    const colorCounts = values(shapes).reduce((acc, color) => {
        if (color !== 'white') {
            acc[color] = (acc[color] || 0) + 1;
        }
        return acc;
    }, {});
    
    return Object.values(colorCounts).some(count => count >= 3);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
    const greenCount = length(filter(equals('green'))(values(shapes)));
    const redCount = length(filter(equals('red'))(values(shapes)));
    
    return greenCount === 2 && 
           shapes.triangle === 'green' && 
           redCount === 1;
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allPass([
    propEq('circle', 'orange'),
    propEq('square', 'orange'),
    propEq('triangle', 'orange'),
    propEq('star', 'orange')
]);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = compose(
    not,
    anyPass([
        propEq('star', 'red'),
        propEq('star', 'white')
    ])
);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allPass([
    propEq('circle', 'green'),
    propEq('square', 'green'),
    propEq('triangle', 'green'),
    propEq('star', 'green')
]);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (shapes) => {
    return shapes.triangle === shapes.square && shapes.triangle !== 'white';
};
