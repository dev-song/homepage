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
        // 'row_n'의 클래스를 가진 DOM 개체의 textContent를 Characters로 표시
        displayCharacters: function(n, char) {
            document.querySelector('.row_' + n).textContent = char;
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
        }
    }
})();

var appController = (function(dataCtrl, UICtrl) {

    var characters = dataCtrl.getCharacters();
    var randomArray = dataCtrl.arrRndAttachment(characters, 12);

    return {
        init: function() {
            UICtrl.getCharacterMatrix(characters, 16, 16);
        }
    }
})(dataController, UIController);

appController.init();