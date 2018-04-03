#Chapter3 타입, 값, 변수

#### Infinity
- 0으로 나눔 (ex) 1/0)
- Number.POSITIVE_INFINITY == Infinity(읽기전용)
- Number.NEGATIVE_INFINITY == -Infinity (읽기전용)
- Number.MAX_VALUE + 1 (== Number.MAX_VALUE)
- Number.MIN_VALUE - 1 (== -1)
- Number.MIN_VALUE - 2 (== -2)
- Number.MIN_VALUE / 2 (== 0)
- isFinite() : 인자가 NaN, Infinity, -Infinity이외의 숫자라면 참 반환

#### NaN
- 0/0
- Infinity/Infinity
- 음수값에 루트를 씌우는 경우
- 숫자가 아닌 피연산자로 산술 연산 시도
- isNaN() : 인자가 NaN이거나 문자열이나, 객체처럼 숫자가 아닐때 참 반환.

#### 실수 연산
- JS에서는 실수 연산을 할 때 근사값으로 표현
        
        .3 - .2 // 0.09999999999999998
        .2 - .1 // 0.1
        
- 이진 부동소수점 숫자를 사용하기 때문

#### 유니코드
- JS는 유니코드 문자열 집합으로 UTF-16 사용
- "\u03c0" (파이)

#### JS 이스케이프 시퀀스
- \0 : 널 문자(\u0000)
- \b : 역스페이스(\u0008)
- \t : 수평탭(\u0009)
- \n : 줄바꿈 문자(\u000A)
- \v : 수직탭(\u000B)
- \f : 폼피드(\u000C)
- \r : 캐리지 리턴(\u000D)
- \" : 큰따옴표(\u0022)
- \' : 작은따옴표(\u0027)
- \\ : 역슬래시(\u005C)
- \x : 두 개의 16진수 숫자 XX에 의해 지정되는 Latin-1 문자
- \u : 네 개의 16진수 숫자 XXXX에 의해 지정되는 유니코드 문자

        
        "one\
         two\
         three" // 세줄로 표현된 한줄 문자열.
         
#### Boolean : false
- undefined
- null
- 0
- -0
- NaN
- "" // 빈문자열

#### null
- 아무 값도 갖지 않음.
- null은 객체, 숫자, 문자열에 '값이 없음(no value)'표시
- typeof null == 'object'

#### undefined
- '값 자체가 없다.'라는 뜻
- 초기화 되어 있지 않을때
- 존재하지 않는 객체 프로퍼티나 배열의 원소값에 접근하려고 할 때 얻는 변수의 값
- 반환값이 없는 함수와 인자가 없는 함수 매개변수의 값
- 미리 선언된 전역변수
- 정의되지 않은 값
- typeof undefiend == "undefined"

#### null vs undefined
- null == undefined (true)
- null === undefined (false)
- 시스템 레벨에서 예기지 않거나 값이 없어서 에러를 나타날때 => undefined 사용
- 일반적인 프 로그램 레벨에서 예상되는 값이 없을 때 => null 사용
- 만약 이 들 값중 하나를 변수나 프로퍼티에 할당할 필요가 있거나 함수에 인자로 전달할
  필요가 있다면 undefined보다는 null을 사용하는게 적절.
  
#### 전역 객체 (Global)
- 전역 객체의 프로퍼티는 JS프로그램 전역에서 사용할 수 있게 정의된 심벌
- JS 인터프리터가 시작할 때(혹은 웹브라우저가 새로운 페이지를 불러올때),
  새로운 전역 객체를 만들고 그 프로퍼티들을 초기화 한다.
- undefined, Infinity, NaN 전역 프로퍼티 (예약어는 아니지만 예약어처럼 취급...)
- isNaN(), parseInt(), eval() 같은 전역 함수들
- Date(), RegExp(), String(), Object(), Array()과 같은 생성자 함수
- Math와 JSON과 같은 전역 객체

#### Window 객체
- 클라이언트 측 JS에서 Window객체는 브라우저 창에 포함된 모든 JS코드를 위한 전역 객체.
- Window객체는 전역에서 사용되는 프로퍼티들을 정의
- 웹브라우저와 클라이언트 측 JS에서 사용되는 몇가지 전역 객체들도 정의

#### Wrapper 객체
        
        var s = "Hello World!";
        var word = s.substring(s.indexOf(" ")+1, s.length);
        
- 문자열 s의 프로퍼티를 참조하려고할 때, JS는 new String(s)를 호출한 것처럼
  문자열 값을 객체로 변환
- 프로퍼티 참조가 해제되면 새로 생성된 임시 객체는 메모리에서 회수된다.
- 임시 객체를 생성하고 메모리에서 회수하는 기능을 내가 직접 따로 구현할 필요는 없지만,
  필요한 경우 메모리에서 반드시 해제되어야 한다.
- Number(), Boolean() 생성자가 호출될 때 생성되고,
  메서드는 임시 객체를 사용하면서 회수된다.
- null과 undefined 값의 레퍼 객체는 없다.
- null과 undefined의 프로퍼티에 접근하려고하면 TypeError 발생

        
        var s = "jodeng";
        s.len = 6;
        var t = s.len;
        console.log(t); //undefined
        
        
- 1 ) s.len : 생성된 임시 String객체의 len프로퍼티에 6할당
- 2 ) 임시 객체 회수
- 3 ) 기존 문자열 값과 같은 값을 가진 새로운 String객체를 생성하고 len 프로퍼티를 읽으려고한다.
- 4 ) 이 프로퍼티는 존재하지 않아 undefined
- 문자열, 숫자, 불리언 값에서 프로퍼티의 값을 읽으려고 할 때,
  문자열, 숫자, 불리언 값이 객체처럼 동작하는 것.
- but, 프로퍼티에 어떤값을 할당한다면 무시될 것이다.
- 값을 할당하는 것은 임시 객체에서 수행되며, 지속되지 않는다.
- 문자열, 숫자, 불리언 값의 프로퍼티가 읽기 전용이고, 이 값들에 새로운 프로퍼티를
  정의할 수 없다. 이 값들이 객체와 다르다!
  
        
        var s = "test", n = 1, b = true;
        var S = new String(s);
        var N = new Number(n);
        var B = new Boolean(b);
        typeof s //"string"
        typeof S //"object"
        typeof n //"number"
        typeof N //"object"
        typeof b //"boolean"
        typeof B //"object"
        

#### 원시 타입 (Primitive)
- String, Number, Boolean, undefined, null
- 원시 타입의 값은 수정할 수 없다.
        
        
        var s = "hello";
        s.toUpperCase(); // HELLO 새로운 문자열 반환
        console.log(s); // 그대로 hello


- 문자열 비교시, JS는 두 문자열의 길이가 같고 각 인덱스에 있는 문자들이 같다면
  두 문자열을 같다고 판단.
  
#### 참조 타입
- Object, Array, Function...

#### 객체
- 객체는 다른 원시 타입과 다르다.
- 객체는 자신의 값을 변경 가능.


        var o = { x:1 };
        o.x = 2;
        o.y = 3;
        var a = [1, 2, 3];
        a[0] = 0;
        a[3] = 4;
        

- 객체는 값으로 비교X
- 두 객체가 같은 프로퍼티와 값을 가지고 있어도 두 객체는 같지 않다.
- 객체 값은 참조다.
- 객체값은 그들이 같은 객체를 참조한다면 같다.


        var o1 = {x:1}, o2 = {x:1};
        o1 == o2 //false
        var o3 = o1;
        o1 == o3 //true
        
        
#### 배열 복사 및 비교
        // 배열 복사
        var a = ['a', 'b', 'c'];
        var b = [];
        
        for(var i = 0 ; i < a.length ; i++) {
            b[i] = a[i];
        }
        
        // 배열 비교
        function equalArrays(a, b) {
            if (a.length != b.length) return false;
            
            for (var j = 0 ; j < a.length ; j++) {
                if (a[j] !== b[j]) ruturn false;
                
                return true;
            }
        }


#### 타입 변환
- JS는 타입에 매우 유연
        
        
        10 + "jodeng" //"10jodeng" : 문자열로 변환
        "2" * "5" // 10 : 숫자로 변환
        var n = 10 - "x"; // NaN : 숫자로 변환X
        n + " string" // "NaN string" : NaN이 문자열 "NaN"으로 변환
    
| 값 | String | Number | Boolean | Object |  

| undefined | "undefined" | NaN | false | TypeError 예외 발생 |  
| null | "null" | 0 | false | TypeError 예외 발생 |  

| true | "true" | 1 |     | new Boolean(true) |  
| false | "false" | 0 |     | new Boolean(false) |  

| "" |     | 0 | false | new String("") |  
| "1.2" |     | 1.2 | true | new String("1.2") |  
| "one" |     | NaN | true | new String("one") |  

| 0 | "0" |  | false | new Number(0) |  
| -0 | "0" |  | false | new Number(-0) |  
| NaN | "NaN" |  | false | new Number(NaN) |  
| Infinity | "Infinity" |  | true | new Number(Infinity) |  
| -Infinity | "-Infinity" |  | true | new Number(-Infinity) |  
| 1 | "1" |  | true | new Number(1) |  

| {} |  |  | true |  |  
| [] |  | 0 | true |  |  
| [9] |  | 9 | true |  |  
| ['a'] |  | NaN | true |  |  
| function(){} |  | NaN | true |  |  


##### 숫자 전환
- 숫자로 파싱할수 있는 문자열은 숫자로 변환.
- 앞뒤 공백 허용
- 공백이나 숫자가 아닌 문자들이 섞인 경우 문자열에서 숫자로 변환할 때 NaN이 된다.
- true => 1, false => "", 0

#### 변환과 동등(==) 비교
        
        
        // 다음은 모두 true
        null == undefined
        "0" == 0
        0 == false
        "0" == false
        
        
#### 명시적 타입 변환
- 코드를 까륶ㅁ하게 유지하기 위해 변환을 명시적으로 하자!
- Boolean(), Number(), String(), Object() 함수 사용
- 위에 함수를 new 연산자 없이 호출하면 생성자로 사용하지 않고 변환 함수로 작동


        Number("3") // 3
        String(true) // "true"
        Boolean([]) // true
        Object(3) // new Number(3)
        
        
- null, undefined를 제외한 모든 값은 toString()메서드를 가지고있다.

#### 암시적 타입 변환
- + 연산자의 한 피연산자가 문자열이라면 다른 피연산자를 문자열로 변환
- 단항 연산자 +는 피연산자를 순자로 변환
- 단항 연산자 !는 피연산자를 불리언으로 변환시키고 부정연산을 한다.


        x + "" // String(x)
        +x // Number(x)
        !!x // Boolean(x)
        
        
#### Number 클래스
##### toString()
- Number 클래스에 정의된 toString()메서드는 기수를 정하는 선택적 인자를 받는다.
- 아무인자도 안넣어주면 10진수
- 2 ~ 36까지 인자로 넣어줄수있다.


        var n = 17;
        var binary_str = n.toString(2); // 10001
        var octal_str = n.toString(8); // 21
        var hex_str = n.toString(16); // 11
        
        
##### 숫자를 문자열로 변환
- 1 ) toFixed() : 소수점 이후에 정의된 수 (지수표기법 사용안함.)
- 2 ) toExponential() : 지수표기법을 사용하여 소수점 앞에 숫자 하나와 소수점 뒤에 지정된 만큼의 자릿수 놓는 방식
- 3 ) toPrecision() : 정의된 유효 자릿수로 숫자를 문자열로 변환  
      유효자릿수가 숫자의 전체 정수 부분을 표시할 정도로 크지 않다면 지수 표기법 사용
- 위에 세가지 메소드는 모두 반올림한다.


        var n = 123456.789;
        n.toFixed(0)  //"123457"
        n.toFixed(2)  //"123456.79"
        n.toFixed(5)  //"123456.78900"
        n.toExponential(1);  //"1.2e+5"
        n.toExponential(3);  //"1.235e+5"
        n.toPrecision(4);  //"1.235e+5"
        n.toPrecision(7);  //"123456.8"
        n.toPrecision(10);  //"123456.7890"
        
        
#### 전역함수 parseInt(), parseFloat()
- parseInt() : 정수만 변환
- parseFloat() : 정수와 부동소수점 모두 변환
- 만약 문자열이 '0x', '0X'로 시작하면 parseInt()는 문자열을 16진수로 인식
- parseInt(), parseFloat() 모두 앞부분 빈 공백을 무시하고,  
  숫자 다음에 나오는 숫자가 아닌 문자들도 모두 무시.
- 첫번째 공백이 아닌 문자가 유효한 숫자 리터럴이 아니라면 NaN


        parseInt("10 jodeng")  //10
        parseInt(" 10.4 jodeng")  //10
        parseFloat(" 10.4 jodeng")  //10.4
        parseInt("-12.34")  //-12
        parseInt("0xFF")  //255
        parseInt("0xff")  //255
        parseInt("-0xff")  //-255
        parseFloat(".1")  //0.1
        parseInt("0.1")  //0
        parseInt(".1")  //NaN
        parseInt("$100.50")  //NaN


- parseInt() 두번째 인자값은 몇진법으로 해석될지 기수(밑) 입력

\
        parseInt('11', 2)  //3
        parseInt('ff', 16)  //255
        parseInt('zz', 36)  //1295
        parseInt('077', 8)  //63
        parseInt('077', 10)  //77


