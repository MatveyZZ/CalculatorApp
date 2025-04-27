let runningTotal = 0; // Переменная для хранения текущей суммы
let buffer = "0"; // Переменная для хранения текущего ввода пользователя
let previousOperator; // Переменная для хранения предыдущего оператора

const screen = document.querySelector('.screen'); // Получает элемент экрана калькулятора

function buttonClick(value) { // Функция, вызываемая при нажатии кнопки
    if (isNaN(value)) { // Проверяет, является ли значение не числом (т.е. оператором)
        handleSymbol(value); // Обрабатывает символ (оператор)
    } else {
        handleNumber(value); // Обрабатывает число
    }
    screen.innerText = buffer; // Обновляет экран с текущим значением buffer
}

function handleSymbol(symbol) { // Функция для обработки символов (операторов)
    switch (symbol) { // Использует switch для обработки различных символов
        case 'C': // Если символ 'C' (очистка)
            buffer = '0'; // Сбрасывает buffer на '0'
            runningTotal = 0; // Сбрасывает runningTotal на 0
            break;
        case '=': // Если символ '=' (равно)
            if (previousOperator === null) { // Проверяет, был ли предыдущий оператор
                return; // Если нет, ничего не делает
            }
            flushOperation(parseInt(buffer)); // Выполняет операцию с текущим числом
            previousOperator = null; // Сбрасывает предыдущий оператор
            buffer = runningTotal; // Устанавливает buffer на значение runningTotal
            runningTotal = 0; // Сбрасывает runningTotal на 0
            break;
        case '←': // Если символ '←' (удаление последнего символа)
            if (buffer.length === 1) { // Если длина buffer равна 1
                buffer = '0'; // Устанавливает buffer на '0'
            } else {
                buffer = buffer.toString(0, buffer.length - 1); // Удаляет последний символ из buffer
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷': // Если символ является математическим оператором
            handleMath(symbol); // Обрабатывает математическую операцию
            break;
    }
}

function handleMath(symbol) { // Функция для обработки математических операций
    if (buffer === '0') { // Если buffer равен '0', ничего не делает
        return;
    }

    const intBuffer = parseInt(buffer); // Преобразует buffer в целое число

    if (runningTotal === 0) { // Если runningTotal равен 0
        runningTotal = intBuffer; // Устанавливает runningTotal на значение intBuffer
    } else {
        flushOperation(intBuffer); // Выполняет операцию с текущим числом
    }
    previousOperator = symbol; // Устанавливает предыдущий оператор
    buffer = '0'; // Сбрасывает buffer на '0'
}

function flushOperation(intBuffer) { // Функция для выполнения операции
    if (previousOperator === '+') { // Если предыдущий оператор '+'
        runningTotal += intBuffer; // Добавляет intBuffer к runningTotal
    } else if (previousOperator === '-') { // Если предыдущий оператор '-'
        runningTotal -= intBuffer; // Вычитает intBuffer из runningTotal
    } else if (previousOperator === '×') { // Если предыдущий оператор '×'
        runningTotal *= intBuffer; // Умножает runningTotal на intBuffer
    } else if (previousOperator === '÷') { // Если предыдущий оператор '÷'
        runningTotal /= intBuffer; // Делит runningTotal на intBuffer
    }
}

function handleNumber(numberString) { // Функция для обработки чисел
    if (buffer === "0") { // Если buffer равен "0"
        buffer = numberString; // Устанавливает buffer на введенное число
    } else {
        buffer += numberString; // Добавляет введенное число к buffer
    }
}

function init() { // Функция инициализации
    document.querySelector('.calc-buttons').addEventListener('click', function(event) { // Добавляет обработчик событий на кнопки калькулятора
        buttonClick(event.target.innerText); // Вызывает buttonClick с текстом нажатой кнопки
    });
}

init(); // Вызывает функцию инициализации