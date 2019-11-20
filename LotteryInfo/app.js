var overlay = false;

var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
    }
};

// Numbers Controller
var numbersController = (function() {

    var numberSelection = [];
    var latestDrawNumber = [4, 14, 23, 28, 37, 45, 17];
    // https://www.dhlottery.co.kr/gameResult.do?method=byWin
    var numberSame = [];
    var numberDifferent = [];

    return {
        addSelection: function(number) {
            // number를 입력받아 numberSelection 배열에 추가

            // 배열이 해당 number를 포함하고 있지 않는 경우에만 numberSelection 배열에 추가, 해당 number를 이미 포함하고 있다면 에러 출력
            if (!numberSelection.includes(number)) {
                numberSelection.push(number);
                console.log(number + ' is added to the selection');
            } else {
                console.log('the number already exists');
            };
        },
        
        sortSelection: function() {
            // numberSelection을 오름차순으로 정렬하는 함수
            numberSelection.sort(function(a, b) {
                return a - b;
            })
        },

        getSelection: function() {
            return numberSelection;
        },

        getDrawNumbers: function() {
            return latestDrawNumber;
        },

        compareArray: function(arr1, arr2, arrSame, arrDiff) {
            // arr1, arr2에서 동일한 값은 arrSame에, 다른 값은 arrDiff에 저장하는 함수
    
            arrSame = [];
            arrDiff = [];
    
            // arr2를 arrDiff에 복사
            arrDiff = arr2.slice();
            
            // arr1[i]와 arr2[j]가 같을 때 값을 arrSame에 추가하고 arrDiff에서 제외
            for (var i = 0; i < arr1.length; i++) {
                for (var j = 0; j < arr2.length; j++) {
                    if (arr1[i] === arr2[j]) {
                        arrSame.push(arr1[i]);
                        arrDiff.splice(arrDiff.indexOf(arr1[i]), 1);
                    }
                }
            };
    
            return {
                arrSame,
                arrDiff
            }
        },

        getSameNumbers: function() {
            return numberSame;
        },

        getDifferentNumbers: function() {
            return numberDifferent;
        }
    }
})();


// UI Controller
var UIController = (function() {
    
    var DOMStrings = {
        numberSelection: '.numbers_selected',
        overlayNumberButtons: '.number_buttons'
    }

    return {
        openOverlay: function() {
            document.querySelector('.overlay').classList.toggle('hiding')
            // if (overlay === true) {
            //     document.querySelector('.overlay').style.display = 'none';
            //     overlay = false;
            // } else if (overlay === false) {
            //     document.querySelector('.overlay').style.display = 'block';
            //     overlay = true;
            // }
        },

        displaySelection: function(selection) {
            var numbersList = document.querySelectorAll(DOMStrings.numberSelection);
            nodeListForEach(numbersList, function(current, index) {
                var selectedNumber = selection[index]

            // show number selection to the display
                current.textContent = selectedNumber;

            // set color by its number
            // white (none), yellow (1-10), blue (11-20), red (21-30), grey (31-40), green (41-45)
                switch (true) {
                    case (selectedNumber < 1):
                        current.style.background = 'white';
                        break;
                    case (selectedNumber <= 10):
                        current.style.background = '#F1C40F';
                        break;
                    case (selectedNumber <= 20):
                        current.style.background = '#2980B9';
                        break;
                    case (selectedNumber <= 30):
                        current.style.background = '#C0392B';
                        break;
                    case (selectedNumber <= 40):
                        current.style.background = '#BDC3C7';
                        break;
                    case (selectedNumber <= 45):
                        current.style.background = '#27AE60';
                        break;
                    default:
                        // console.log('ERROR: the number is out of the range');
                }
            })
        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    }

})();


// Global controller
var controller = (function(numbersCtrl, UICtrl) {

    var setupEventListeners = function() {
        // 버튼 클릭 시 Event Listener 추가하는 함수
        var DOM = UICtrl.getDOMStrings();

        var numbersList = document.querySelectorAll(DOM.numberSelection);
        nodeListForEach(numbersList, function(current, index) {
            current.addEventListener('click', UICtrl.openOverlay);
        });

        var overlayNumberButtons = document.querySelectorAll(DOM.overlayNumberButtons);
        nodeListForEach(overlayNumberButtons, function(current, index) {
            current.addEventListener('click', ctrlAddSelection)
            // console.log('number click is working');
        })
    };

    var updateSelection = function() {
        // 1. Sort the number selection
        numbersCtrl.sortSelection();
        // 2. Return the selection
        var selection = numbersCtrl.getSelection();
        // 3. Display the selection to the UI
        UICtrl.displaySelection(selection);
    }

    var ctrlAddSelection = function(event) {
        // 클릭한 버튼의 숫자와 numbersController의 addSelection 함수를 연결
        // 6개 넘게 선택하려고 할 때 오류메시지 출력
        var inputNumber, numSelection, drawNumbers;

        inputNumber = parseInt(event.target.textContent);
        // console.log(inputNumber);
        numSelection = numbersCtrl.getSelection();
        drawNumbers = numbersCtrl.getDrawNumbers();
        sameNumbers = numbersCtrl.getSameNumbers();
        differentNumbers = numbersCtrl.getDifferentNumbers();
        
        if (numSelection.length < 6) {
            numbersCtrl.addSelection(inputNumber);
            updateSelection();
        } else {
            console.log('You has already selected all 6 numbers!');
            
            var result = numbersCtrl.compareArray(numSelection, drawNumbers, sameNumbers, differentNumbers);
            console.log(result);
        }
    };

    return {
        init: function() {
            console.log('Web app has started.')
            setupEventListeners();
        }
    }

})(numbersController, UIController);

controller.init();




// // BUDGET Controller
// var budgetController = (function () {



// })();


// // UI Controller
// var UIController = (function() {

//     var DOMStrings = {
//         inputType: '.add__type',
//         inputDescription: '.add__description',
//         inputValue: '.add__value',
//         inputBtn: '.add__btn'
//     };

//     // To be accessed by outside scope, a method should be returned when IIFE is used
//     return {
//         getinput: function() {
//             return {
//                 type: document.querySelector(DOMStrings.inputType).value,  // will be 'inc' or 'exp'
//                 description: document.querySelector(DOMStrings.inputDescription).value,
//                 value: document.querySelector(DOMStrings.inputValue).value
//             };
//         },

//         getDOMStrings: function() {
//             return DOMStrings;
//         }
//     };

// })();


// // Global APP Controller
// var controller = (function(budgetCtrl, UICtrl) {

//     var setUpEventListeners = function() {
//         // organize all things related with event listeners
//         var DOM = UICtrl.getDOMStrings();

//         document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
//         document.addEventListener('keypress', function(event) {
//             if(event.keycode === 13 || event.which === 13) {
//                 // Some older browsers support 'which' property, not 'keycode'
//                 ctrlAddItem();
//             };
//         });
//     };

//     var ctrlAddItem = function() {
//         // to-do list
//         // 1. Get the field input data
//         var input = UICtrl.getinput();
//         console.log(input);
//         // 2. Add the item to the budget controller
//         // 3. Add the item to the UI
//         // 4. Calculate the budget
//         // 5. Display the budget on the UI
//     };

//     return {
//         init: function() {
//             console.log('Application has started.');
//             setUpEventListeners();
//         }
//     }
    
// })(budgetController, UIController);

// controller.init();