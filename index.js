// ** BEGINNING OF VARIABLES
const all_buttons = document.querySelectorAll(".button");
const display = document.querySelectorAll(".calculator-total")[0];
const data_type_number = "number";
const data_type_operator = "operator";
const data_type_clear = "clear";
const data_type_equal = "equal";
var used_decimal = false; 
var added_number = false; 
var operations = [];
// ENDING OF VARIABLES


/**
 * Handle method to clear the inputs
 */
function clearInputs(){
    display.textContent = "0";
    used_decimal = false; 
    added_number = false;
    operations = [];
}

/**
 * Handle Method to add the numbers to the input
 * Special handles for decimals specifically to avoid evaluation errors
 * @param {String} displayVal, the current value in the input box
 * @param {String} value, the value to be added
 * @returns none
 */
function addNumber(displayVal, value){
    if (used_decimal && value === ".") return; 
    if (value === "."){
        used_decimal = true;
    }
    if (displayVal === "0"){
        display.textContent = value;
    }else{
        display.textContent = displayVal + value;
    }
    added_number = true;
}

/**
 * Handle Method to add the operations to the input
 * Special handles for checking that numbers are added and decimals specifically to avoid evaluation errors
 * @param {String} displayVal, the current value in the input box
 * @param {String} value, the value to be added
 * @returns none
 */
function addOperation(displayVal, value){
    if (!added_number) return;
    if (display.textContent.charAt(display.textContent.length - 1) === "."){
        display.textContent = displayVal + "0" + value;
    }else{
        display.textContent = displayVal + value;
    }
    added_number = false;
    used_decimal = false; 
}

/**
 * Handle method for evaluating the total 
 * handles for ending with operations or decimals
 * @returns nothing
 */
function createTotal(){
    var display_text = display.textContent;
    if (display.textContent  === ".") return;
    if (operations[operations.length -1] === data_type_operator) display_text = display_text + "1";
    display.textContent = eval(display_text);
    added_number = true; 
}

// for all buttons, added the on click event listener
all_buttons.forEach(button => {
    button.addEventListener('click', function(event){
        // data-* attr is to organize the html element. so calling {type} gets data-type at the same time, calling {val} would get data-val. 
        // Can get more than one 
        const {type}  = button.dataset
        const displayVal = display.textContent;
        const value = button.textContent;
        if (type === data_type_number){
            addNumber(displayVal, value);
            operations.push(type);
        }else if (type === data_type_operator){
            addOperation(displayVal, value);
            operations.push(type);
        }else if (type === data_type_clear){
            clearInputs();
        }else if (type === data_type_equal){
            createTotal();
        }
    });
});


