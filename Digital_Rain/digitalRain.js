// 글자데이터를 다루는 dataController, 화면에 나타내는 UIController, 앱 전체의 기능을 담당하는 appController로 구분

// 프로그램의 기능-------------
// Start 버튼 (or 페이지 진입 시) init() 함수가 실행되고, 프로그램이 동작
// 각 row의 내용을 불러옴
// 각 column별로 최초 시작지점을 random으로 정함
// 각 row에서 i번째 column의 문자가 .current가 붙어있는지 확인
    // 붙어있다면 문자를 하얀색으로 보여주기
    // 안 붙어있다면 row가 current가 붙은 row보다 작을 경우 초록색으로
    // 클 경우 검정색으로

var playing;

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
        },
        
        // arr 배열에서 무작위 글자를 n개 추출해 이어붙인 문장을 m열 추가
        getCharacterMatrix: function(arr, obj) {
            for (var i = 0; i < obj.rows; i++) {
                var divClass = ' class="rows row_' + (i + 1);
                var html = '<div' + divClass + '">';

                for (var j = 0; j < obj.columns; j++) {
                    var rndElem = getRndElem(arr);
                    var spanClass = ' class="characters column_' + (j + 1) + '"';
                    var spanId = ' id="r' + (i + 1) + 'c' + (j + 1);

                    html += '<span' + spanClass + spanId + '">' + rndElem + '</span>';
                }
                html += '</div>';

                // 'body' selector의 'beforeend' position에 html 삽입
                document.querySelector('body').insertAdjacentHTML('beforeend', html);
            }

            return html;
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

        changeElemText: function(button, conditionVar, textA, textB) {
            if (conditionVar === true) {
                button.textContent = textA;
            } else {
                button.textContent = textB;
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

        // 특정 column의 highlight를 현재 element의 아래 element로 지정
        displayNewColumnHighlight: function(obj, col) {
            var previousHighlightId;
            var newHighlightId;

            for (var i = 1; i <= obj.rows; i++) {
                var targetId = 'r' + i + 'c' + col;
                var targetDOM = document.getElementById(targetId);

                if (targetDOM.classList.contains('highlighted') && i < obj.rows) {
                    previousHighlightId = targetId;
                    newHighlightId = 'r' + (i + 1) + 'c' + col;
                } else if (targetDOM.classList.contains('highlighted') && i === obj.rows) {
                    // 각 column의 highlight된 row가 최하단이 되면 newHighlight를 1행으로 돌리는 조건문
                    previousHighlightId = targetId;
                    newHighlightId = 'r' + 1 + 'c' + col;
                }
            };
            
            document.getElementById(previousHighlightId).classList.remove('highlighted');
            document.getElementById(newHighlightId).classList.add('highlighted');

            // console.log('element with the ID of ' + newHighlightId + ' is highlighted')
        },

        // 특정 column의 highlight된 요소를 찾고 그 위는 밝게, 아래는 어둡게 하는 함수
        ctrlColumnColor: function(obj, col) {
            for (var i = 1; i <= obj.rows; i++) {
                var targetId = 'r' + i + 'c' + col;
                var targetDOM = document.getElementById(targetId);

                if (targetDOM.classList.contains('highlighted')) {
                    var colorClass = ['green_black', 'green_dark', 'green', 'green_light', 'green_white', 'black'];

                    // highlighted 요소가 가리지 않도록 다른 클래스는 제외
                    colorClass.forEach(function(val) {
                        targetDOM.classList.remove(val);
                    });

                    // highlighted 요소로부터 거리에 따라 클래스 추가
                    for (var j = 1; j <= obj.rows; j++) {
                        var overId = 'r' + j + 'c' + col;

                        // 클래스 추가 전 다른 클래스 제외
                        colorClass.forEach(function(val) {
                            document.getElementById(overId).classList.remove(val);
                        });

                        if (j < i - 13) {
                            document.getElementById(overId).classList.add('black');
                        } else if (j < i - 11) {
                            document.getElementById(overId).classList.add('green_black');
                        } else if (j < i - 9) {
                            document.getElementById(overId).classList.add('green_dark');
                        } else if (j < i - 6) {
                            document.getElementById(overId).classList.add('green');
                        } else if (j < i - 3) {
                            document.getElementById(overId).classList.add('green_light');
                        } else if (j < i) {
                            document.getElementById(overId).classList.add('green_white');
                        } else if (j > i) {
                            document.getElementById(overId).classList.add('black');
                        }
                    }
                }
            }
        }
    }
})();

var appController = (function(dataCtrl, UICtrl) {

    var playing = false;

    var characters = dataCtrl.getCharacters();
    var characterMatrix = {
        rows: 24,
        columns: 24
    }

    var setEventListeners = function() {
        // playing 변수를 조절하는 event listener를 Start 버튼에 할당
        document.getElementById('btn_play-stop').addEventListener('click', changePlayStatus);

        document.querySelector('body').addEventListener('click', updateHighlight);
    };

    // playing 변수를 조절하고 버튼의 text를 바꾸는 함수
    var changePlayStatus = function() {
        if (playing) {
            playing = false;
            document.getElementById('btn_play-stop').textContent = 'Start';
        } else {
            playing = true;
            document.getElementById('btn_play-stop').textContent = 'Stop';
        }
        console.log('Play status changed; now playing: ' + playing);
    };

    var setCharacterMatrix = function(element, position) {
        dataController.getCharacterMatrix(characters, characterMatrix);

        // document.querySelector(element).insertAdjacentHTML(position, html);
    };

    // 모든 column의 highlight를 다음으로 옮기고, highlight의 맞춰 주변 element의 색상을 update함
    var updateHighlight = function() {
        // playing === true인 경우에만 실행
        if (playing) {
            for (var i = 1; i <= characterMatrix.columns; i++) {
                UICtrl.displayNewColumnHighlight(characterMatrix, i);
                UICtrl.ctrlColumnColor(characterMatrix, i);
            }
        }
    };

    return {
        init: function() {
            setCharacterMatrix('body', 'beforeend');
            UICtrl.setInitialHighlight(characterMatrix);
            updateHighlight();

            // 200ms 간격으로 반복
            setInterval(updateHighlight, 250);

            setEventListeners();
        },

        stop: function() {
        }
    };
})(dataController, UIController);

appController.init();