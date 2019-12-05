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

        // 각 요소가 시간(ms)을 의미하는 배열 생성
        getTimeArray: function(n) {
            var timeArr = [];

            for (var i = 0; i < n; i++) {
                var rndTime = Math.floor(Math.random() * 10 + 1) * 100;
                timeArr.push(rndTime);
            }

            return timeArr;
        },
        
        // arr 배열에서 무작위 글자를 obj.columns개 추출해 이어붙인 문장을 obj.rows 줄만큼 추가
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
                document.querySelector('.wrapper').insertAdjacentHTML('beforeend', html);
            }
        },

        // obj에서 무작위 요소를 선택하고 textContent를 arr의 무작위 내용으로 바꿈
        changeRndChar: function(arr, obj) {
            var rndRow = Math.floor(Math.random() * obj.rows + 1);
            var rndCol = Math.floor(Math.random() * obj.columns + 1);
            var rndChar = getRndElem(arr);

            var rndId = 'r' + rndRow + 'c' + rndCol;
            document.getElementById(rndId).textContent = rndChar;
            // console.log('Element id ' + rndId + ' is changed to character ' + rndChar);

            return rndId;
        }
    }
})();

var UIController = (function() {

    var DOMStrings = {
        
    };

    return {
        // event 지점에 pulse를 delay 간격으로 count 개만큼 생성
        // CSS style과 병행
        // 참고: https://www.youtube.com/watch?v=0ShtNG7JrR8
        makeMultiPulseEffect: function(count, delay) {

            var makePulse = function(delay) {
                var eventX = event.pageX;
                var eventY = event.pageY;
                
                setTimeout(function() {
                    var pulse = document.createElement('div');
                    pulse.setAttribute('class', 'pulse');
                    document.body.appendChild(pulse);
        
                    pulse.style.top = eventY + 'px';
                    pulse.style.left = eventX + 'px';
            
                    setTimeout(function() {
                        document.body.removeChild(pulse);
                    }, delay + 2000);
                }, delay)
            };

            for (var i = 0; i < count; i++) {
                makePulse(0 + delay * i);
            };
        },

        // r'row_n'c'col_m'의 id를 가진 DOM 개체의 textContent를 Char로 표시
        displayCharacters: function(row_n, col_m, char) {
            var elementId = 'r' + row_n + 'c' + col_m;
            document.getElementById(elementId).textContent = char;
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
        displayNewHighlight: function(obj, col, hlRow) {
            var previousHighlightId = 'r' + hlRow + 'c' + col;
            var newHighlightId;

            if (hlRow < obj.rows) {
                newHighlightId = 'r' + (hlRow + 1) + 'c' + col;
            } else if (hlRow === obj.rows) {
                newHighlightId = 'r' + 1 + 'c' + col;
            }
            
            document.getElementById(previousHighlightId).classList.remove('highlighted');
            document.getElementById(newHighlightId).classList.add('highlighted');
        },

        // 특정 열에서 Highlight된 row와의 간격에 따라 opacity을 조절하는 함수
        ctrlColumnOpacity: function(obj, col, hlRow) {
            for (var i = 1; i <= obj.rows; i++) {
                var targetId = 'r' + i + 'c' + col;
                var targetDOM = document.getElementById(targetId);

                // 현재 element가 changed 상태가 아닌 경우 opacity 조절
                // 현재 row가 hlRow 위일 경우 row마다 0.1씩 opacity 감소, 최저치는 0.1
                // hlRow 아래라면 opacity = 0
                if(!targetDOM.classList.contains('changed')) {
                    if (hlRow < 10 && i > obj.rows - 10) {
                        targetDOM.style.opacity = Math.max(0, 1 - (obj.rows + hlRow - i) * 0.1);
                    } else if (i - hlRow <= 0) {
                        targetDOM.style.opacity = Math.max(0, 1 - (hlRow - i) * 0.1);
                    } else {
                        targetDOM.style.opacity = 0;
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

    // setInterval을 멈춘 뒤 재시작하려면 멈춘 뒤 다시 setInterval을 지정해줘야 함
    var repeatUpdate;
    var stopRepeat = function(interval) {
        clearInterval(interval);
    };

    // 무작위 글자의 내용을 바꾸고, 해당 글자를 일정 시간 동안 강조 표시함
    var updateRndChar;

    // 갱신 rate
    var updateRate = 250;
    var killDelay = 1200;

    var setEventListeners = function() {
        // playing 변수를 조절하는 event listener를 Start 버튼에 할당
        document.getElementById('btn_play-stop').addEventListener('click', changePlayStatus);

        document.querySelector('.wrapper').addEventListener('click', function() {
            updateHighlight(characterMatrix);
        });

        document.querySelector('.wrapper').addEventListener('click', function() {
            UICtrl.makeMultiPulseEffect(3, 200);
        });
    };

    // playing 변수를 조절하고 버튼의 text를 바꾸는 함수
    var changePlayStatus = function() {
        if (playing) {
            playing = false;
            stopRepeat(repeatUpdate);
            stopRepeat(updateRndChar);
            document.getElementById('btn_play-stop').textContent = 'Start';
            document.getElementById('btn_play-stop').style.opacity = 1;
            document.getElementById('btn_play-stop').style.zIndex = 1;
        } else {
            playing = true;

            document.querySelector('.wrapper').style.display = 'block'

            repeatUpdate = setInterval(function() {
                updateHighlight(characterMatrix);
            }, updateRate);
            updateRndChar = setInterval(function() {
                var rndId = dataCtrl.changeRndChar(characters, characterMatrix);
                document.getElementById(rndId).classList.add('changed');
                // console.log('Element ID ' + rndId + ' is changed');
        
                setTimeout(function() {
                    document.getElementById(rndId).classList.remove('changed');
                }, killDelay);
            }, updateRate);

            document.getElementById('btn_play-stop').classList.remove('button-initial');
            document.getElementById('btn_play-stop').textContent = 'Stop';
            document.getElementById('btn_play-stop').style.opacity = 0.2;
            document.getElementById('btn_play-stop').style.zIndex = 10;
        }
        console.log('Play status changed; now playing: ' + playing);
    };

    // 특정 열의 Highlight된 row를 찾는 함수
    var findColHighlight = function(obj, col) {
        var colHighlightRow;

        for (var i = 1; i <= obj.rows; i++) {
            var targetId = 'r' + i + 'c' + col;
            var targetDOM = document.getElementById(targetId);

            if (targetDOM.classList.contains('highlighted')) {
                colHighlightRow = i;
            }
        }

        return colHighlightRow;
    };

    // obj의 모든 column의 highlight를 다음으로 옮기고, highlight의 맞춰 주변 element의 색상을 update함
    var updateHighlight = function(obj) {
        // column 별 update time에 쓰일 timeArray 생성
        // var delayTime = dataCtrl.getTimeArray(characterMatrix.columns);
        document.querySelector('body').style.color = '#99ffbb'

        for (var i = 1; i <= obj.columns; i++) {
            var hlRow = findColHighlight(obj, i);
            UICtrl.displayNewHighlight(obj, i, hlRow);
            // highlight를 갱신했으므로 hlRow 변수를 재설정
            hlRow = findColHighlight(obj, i);
            UICtrl.ctrlColumnOpacity(obj, i, hlRow);
        }
    };

    return {
        init: function() {
            dataCtrl.getCharacterMatrix(characters, characterMatrix);
            UICtrl.setInitialHighlight(characterMatrix);

            document.querySelector('.wrapper').style.display = 'none';

            setEventListeners();
        }
    };
})(dataController, UIController);

appController.init();