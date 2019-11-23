// 글자데이터를 다루는 dataController, 화면에 나타내는 UIController, 앱 전체의 기능을 담당하는 appController로 구분

// 프로그램의 기능-------------
// Start 버튼 (or 페이지 진입 시) init() 함수가 실행되고, 프로그램이 동작
// 각 row의 내용을 불러옴
// 각 column별로 최초 시작지점을 random으로 정함
// 각 row에서 i번째 column의 문자가 .current가 붙어있는지 확인
    // 붙어있다면 문자를 하얀색으로 보여주기
    // 안 붙어있다면 row가 current가 붙은 row보다 작을 경우 초록색으로
    // 클 경우 검정색으로

// 배열 내 무작위 항목을 선택하는 함수
var getRndElem = function(arr) {
    var rndElem;
    rndElem = arr[Math.floor(Math.random() * arr.length)];

    return rndElem;
};

// id를 가진 요소의 position에 html 코드를 더하는 함수
// var insertHTML = function(id, position, html) {
//     // position은 'beforebegin', 'afterbegin', 'beforeend', 'afterend'의 4가지
//     document.getElementById(id).insertAdjacentHTML(position, html);
// };

var dataController = (function() {
    
    // 글자들의 전체 집합을 설정
    var characters = ["길", "벼", "흐", "오", "랖", "オ", "サ", "ホ", "モ", "ヤ", "b", "m", "Q", "R", "y", "δ", "ε", "θ", "ψ", "η", "Б", "Ж", "Л", "Ю", "Я", "ठ", "त", "थ", "म", "ह", "խ", "ծ", "ջ", "տ", "ֆ", "ᚠ", "ᚱ", "ᛉ", "ᛒ", "ᛗ"];



    return {
        // Characters 배열을 return하는 함수
        getCharacters: function() {
            return characters;
        },

        // 배열 내 무작위 항목들을 n번 이어붙이는 함수
        arrRndAttachment: function(arr, n) {
            var attached;

            // 결과물인 attached를 초기화
            attached = "";
            // attached에 무작위로 고른 항목들을 n번 더함
            for (var i = 0; i < n; i++) {
                var rndElem = getRndElem(arr);
                attached += rndElem;
            }

            return attached;
        }
    }
})();

var UIController = (function() {

    var DOMStrings = {
        
    };

    return {
        // r'row_n'c'col_m'의 id를 가진 DOM 개체의 textContent를 Char로 표시
        displayCharacters: function(row_n, col_m, char) {
            var elementId = '#r' + row_n + 'c' + col_m;
            document.querySelector(elementId).textContent = char;
        },
        
        // arr 배열에서 무작위 글자를 n개 추출해 이어붙인 문장을 m열 추가
        getCharacterMatrix: function(arr, n, m) {
            for (var i = 0; i < m; i++) {
                var divClass = ' class="rows row_' + (i + 1);
                var html = '<div' + divClass + '">';

                for (var j = 0; j < n; j++) {
                    var rndElem = getRndElem(arr);
                    var spanClass = ' class="characters column_' + (j + 1) + '"';
                    var spanId = ' id="r' + (i + 1) + 'c' + (j + 1);

                    html += '<span' + spanClass + spanId + '">' + rndElem + '</span>';
                }
                html += '</div>';

                // 'body' selector의 'beforeend' position에 html 삽입
                document.querySelector('body').insertAdjacentHTML('beforeend', html);
            }
        },

        // 총 m개의 column에 대해 각 column 별로 무작위 row의 요소에 .highlight 추가
        setInitialHighlight: function(obj) {
            // id = r#c1, r#c2, ..., r#c16 (#: 무작위 행 번호)

            for (var i = 1; i <= obj.columns; i++) {
                var rndRow = Math.floor(Math.random() * obj.rows + 1);
                var rndId = 'r' + rndRow + 'c' + i;

                document.getElementById(rndId).classList.add('highlighted');

                // console.log(rndId + ' element is highlighted')
            }
        },

        // 현재 highlight 된 요소의 아래요소로 highlight를 지정함
        displayNewHighlight: function(obj) {
            for (var i = 1; i <= obj.columns; i++) {
                var previousHighlightId;
                var newHighlightId;

                for (var j = 1; j <= obj.rows; j++) {
                    var targetId = 'r' + j + 'c' + i;
                    var targetDOM = document.getElementById(targetId);

                    if (targetDOM.classList.contains('highlighted') && j !== obj.rows) {
                        previousHighlightId = targetId;
                        newHighlightId = 'r' + (j + 1) + 'c' + i;
                    } else if (targetDOM.classList.contains('highlighted') && j === obj.rows) {
                        // 첫 column의 highlight가 j 행에 닿으면 오류를 뿜는 것을 막는 조건문
                        // 미봉책
                        previousHighlightId = 'r' + (j - 1) + 'c' + i;
                        newHighlightId = targetId;
                    }
                }
                
                document.getElementById(previousHighlightId).classList.remove('highlighted');
                document.getElementById(previousHighlightId).classList.add('darkened');
                document.getElementById(newHighlightId).classList.remove('blacked');
                document.getElementById(newHighlightId).classList.add('highlighted');


            }
            console.log('Change highlighted element');
        },

        // Element의 id를 확인하여 해당 column의 highlight된 행보다 위면 light green, 아래면 black
        // 심화: highlight 행에서 위쪽으로 멀어질수록 dark green
        ctrlElemColor: function(obj) {
            // 매 열마다 어떤 행이 highlight 되었는지 감지하고 해당 row를 저장
            for (var i = 1; i <= obj.columns; i++) {
                for (var j = 1; j <= obj.rows; j++) {
                    var targetId = 'r' + j + 'c' + i;
                    var targetDOM = document.getElementById(targetId);

                    if (targetDOM.classList.contains('highlighted')) {
                        console.log('element with the ID of ' + targetId + ' is highlighted')

                        // highlighted 위는 darkened
                        for (var k = 1; k < j; k++) {
                            var overId = 'r' + k + 'c' + i;
                            document.getElementById(overId).classList.add('darkened');
                        }

                        // highlighted 아래는 black
                        for (var l = j + 1; l <= obj.rows; l++) {
                            var belowId = 'r' + l + 'c' + i;
                            document.getElementById(belowId).classList.add('blacked');
                        }
                    }

                }
            }
        }
    }
})();

var appController = (function(dataCtrl, UICtrl) {

    var characters = dataCtrl.getCharacters();
    var characterMatrix = {
        rows: 16,
        columns: 16
    }

    var setEventListeners = function() {
        document.querySelector('body').addEventListener('click', updateHighlight);
    };

    var updateHighlight = function() {
        UICtrl.displayNewHighlight(characterMatrix);
        // 

    };

    return {
        init: function() {
            UICtrl.getCharacterMatrix(characters, 16, 16);
            UICtrl.setInitialHighlight(characterMatrix);
            UICtrl.ctrlElemColor(characterMatrix);

            setEventListeners();
        }
    };
})(dataController, UIController);

appController.init();