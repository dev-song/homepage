// 글자데이터를 다루는 dataController, 화면에 나타내는 UIController, 앱 전체의 기능을 담당하는 appController로 구분

// 프로그램의 기능-------------
// Start 버튼 (or 페이지 진입 시) init() 함수가 실행되고, 프로그램이 동작
// 각 row의 내용을 불러옴
// 각 column별로 최초 시작지점을 random으로 정함
// 각 row에서 i번째 column의 문자가 .current가 붙어있는지 확인
    // 붙어있다면 문자를 하얀색으로 보여주기
    // 안 붙어있다면 row가 current가 붙은 row보다 작을 경우 초록색으로
    // 클 경우 검정색으로




var dataController = (function() {
    
    // 글자들의 전체 집합을 설정
    var characters = ["길", "벼", "흐", "오", "랖", "オ", "サ", "ホ", "モ", "ヤ", "b", "m", "Q", "R", "y", "δ", "ε", "θ", "ψ", "η", "Б", "Ж", "Л", "Ю", "Я", "ठ", "त", "थ", "म", "ह", "խ", "ծ", "ջ", "տ", "ֆ", "ᚠ", "ᚱ", "ᛉ", "ᛒ", "ᛗ"];

    // 배열 내 무작위 항목을 선택하는 함수
    var getRandomElement = function(arr) {
        var randomElement;
        randomElement = arr[Math.floor(Math.random() * arr.length)];

        return randomElement;
    };

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
                var randomElement = getRandomElement(arr);
                attached += randomElement;
            }

            return attached;
        }
    }
})();

var UIController = function() {

    var DOMString = {
        
    };

    var displayRndCharacters: function()

};

var appController = function(dataCtrl, UICtrl) {

    return {
        init: function() {

        }
    }
}