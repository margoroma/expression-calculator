function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
    if (typeof(expr) === 'string') {
        arr = (expr.replace(/\s+/g, '')).match(/[+-/*//()]|-?\d+(?:\.\d+)?/g);
        for (i = 0; i < arr.length; i ++) {
            if (arr[i] !== '(' && arr[i] !== ')' && arr[i] !== '/' && arr[i] !== '*' && arr[i] !== '-' && arr[i] !== '+') {
                arr[i] = Number(arr[i]);
            }        
        }
    }
    let countOpen = arr.filter( i => i === '(');
    let countClose = arr.filter( i => i === ')');
    if (countOpen.length !== countClose.length) {
        throw 'ExpressionError: Brackets must be paired';
    }
    else {
        if (arr.includes('(') === false) {
            result = operationsMath(arr);
            return result;
        }
        else {
            indFirst = arr.lastIndexOf('(');
            arrLast = arr.slice(indFirst);
            indLast = arrLast.indexOf('\)') + indFirst;
            deepOperations = (arr.slice(indFirst, indLast + 1)).slice(1, -1);
            lengthDeep = deepOperations.length + 2;
            result = operationsMath(deepOperations);
            arr.splice(indFirst, lengthDeep, result);
            return expressionCalculator(arr);
        }
    } 
}

function operationsMath(expr) {
    while (expr.length > 1) {
        
        if (expr.includes('/')) {
            index = expr.indexOf('/');
            if (expr [index + 1] === 0) {
                throw 'TypeError: Division by zero.';
            }
            else {
                result = expr[index - 1] / expr [index + 1];
                expr.splice([index - 1], 3, result);
                return operationsMath(expr);
            }
        }
        else if (expr.includes('*')) {
            index = expr.indexOf('*');
            result = expr[index - 1] * expr [index + 1];
            expr.splice([index - 1], 3, result);
            return operationsMath(expr);
        }
        else if (expr.includes('-')) {
            index = expr.indexOf('-');
            result = expr[index - 1] - expr [index + 1];
            expr.splice([index - 1], 3, result);
            return operationsMath(expr);
        }
        else if (expr.includes('+')) {
            index = expr.indexOf('+');
            result = expr[index - 1] + expr [index + 1];
            expr.splice([index - 1], 3, result);
            return operationsMath(expr);
        }
    }
    result = expr[0];
    return result;
}

module.exports = {
    expressionCalculator
}