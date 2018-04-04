## 객체

### 객체
- 프로토 타입 상속은 JS의 핵심 기능!
- JS에서는 문자열(string)과 숫자(number), true/false, null/undefined를 제외한 나머지는 객체다!
- 객체는 값이 아닌 참조에 의해 쉽게 조작이 가능하다.
- 객체로 가장 많이 하는 작업은 객체를 생성한 후, 프로퍼티를 추가, 질의, 삭제, 테스트, 열거하는 것!
- 프로퍼티는 이름과 값으로 구성
- 프로퍼티 이름은 빈 문자열을 포함한 어떤 문자열이든 될 수 있다.  
 but, 객체가 같은 이름의 프로퍼티를 두 개 가질 수는 없어!
 - 객체의 각 프로퍼티는 '프로퍼티 속성'을 가짐.
 ```
 writable (쓰기 속성) : 값의 수정 여부 결정
 enumerable (열거 속성) : for/in 루프에서 읽을 수 있는지 여부 결정
 configurable (설정 속성) : 프로퍼티 삭제 기능 여부와 프로퍼티 속성의 변경 여부를 결졍
```
- ES5 이전에는 생성된 객체에 속한 모든 프로퍼티는 수정, 열거, 변경 가능
- ES5에서는 내가만든 프로퍼티의 속성만을 변경 가능!
- 모든 객체는 세가지 속성을 갖는다.
```
1) 객체의 prototype은 상속받은 프로퍼티들을 가진 객체에 대한 참조 변수
2) 객체의 class는 객체의 유형을 분류하는 문자열.
3) extensible 플래그는 객체에 새 프로퍼티 추가 여부 결정.
```
- Native Object(Core JS Build-in Object) : ECMAScript 명세에 정의된 객체이거나 객체의 클래스  
(Array, Function, Date. RegExp 등 전부 Native Object)
- Host Object :  브라우저 API와 같이 자바스크립트 인터프리터가 내장된 호스트 환경에서 정의된 객체.  
(HTMLElement ..)
- '사용자 정의 객체' : JS 코드의 실행으로 생성된 객체 (런타임에 생성된 객체)
- '고유 프로퍼티' : 객체에 직접 코드로 정의한 프로퍼티
- '상속받은 프로퍼티' : 객체 프로토타입 객체에 의해 정의된 프로퍼티.

#### 객체 생성하기
```
1) 객체 리터럴 { ... }
2) new Keyword()
3) Object.create()
```

##### 객체 리터럴
```
var empty = {};
var point = {x: 0, y: 0};
var point2 = {x: point.x, y: point.y};
var book = {
    'main title' : 'JS by Jodeng',
    'sub-title' : 'The Definitive Guide',
    'for' : 'all audiences',
    
    author: {
        firstname: 'David',
        surnmae: 'Flanagan'
    }
};
```

##### new를 사용해 객체 생성하기
```
var o = new Object();
var a = new Array();
var d = new Date();
var r = new RegExp("js");
```

###### * 프로토타입
- JS의 모든 객체는 두번째 자바스크립트 객체(?)와 연관되어있다.  
(여기서 두번째 자바스크립트 객체라는것은 '프로토타입'이야!)
- 첫번째 객체는 프로토 타입으로부터 프로퍼티들을 상속받는다.
- 객체 리터럴로 생성된 모든 객체는 프로토타입 객체가 같으며, JS코드에서 이 프로토타입 객체는 Object.prototype으로 참조할 수 있다.
- new 키워드를 사용해 생성자를 호출하면, 생성자의 프로토타입을 자신의 프로토타입으로 하는 객체가 생성된다.
- new Object()로 생성된 객체는 Object.prototype를 상속받으며, {}로 생성된 객체와 동일하다.
- new Array()로 생성된 객체는 Array.prototype을 객체의 프로토타입으로 사용.
- new Date()로 생성된 객체는 Date.prototype을 객체의 프토토타입으로 사용.
- Object.prototype은 prototype이 없다! 아무런 프로퍼티 상속받지 않음.  
but, 다른 프로타입 객체들은 보통 프로토타입을 가진다.
- 모든 built-in 생성자 또는 사용자 정의 생성자는 프로토타입을 갖는데,  
  이때 프로토타입은 Object.prototype을 상속받는다.
- 예를들어, Date.prototype은 Object.prototype의 프로퍼티들을 상속받는다.
- Date객체는 new Date()를 통해 만들어지며, Object.prototype과 Date.prototype을 전부 상속한다.
- 이처럼 프로토타입 객체들의 연속된 연결을 'Prototype Chain'이라 한다!

##### Object.create()
- Object.create(프로토타입 객체, 새 객체의 프로퍼티 정보를 가진 객체)
``` 
var o1 = Object.create({x:1, y:2}); // o1은 x, y프로퍼티를 상속받는다.
```
```
/*
- 프로토 타입을 갖지 않는 새 객체를 만들기위해 인자null 전달.
- 새롭게 생성된 객체가 어떠한 객체도 상속받지 않기 때문에 toString()메서드도 사용할수 없어.
*/
var o2 = Object.create(null);
```
```
var o3 = Object.create(Object.prototype); // o3은 {} or new Object()와 같은 객체다.
```

#### 프로퍼티 접근 및 설정
- 마침표(.) or 대괄호([]) 사용! => 대괄호 안에 값은 프로퍼티 이름의 문자열로 평가되는 표현식이 와야해.
```
console.log(book.author);
book.publishedDate = new Date();
```

##### 연관배열로서의 객체
```
object.property == object["property"]
```
- 마치 숫자가 아닌 문자열을 인덱스로 갖는 배열에 접근하는 형태와 유사. (Hash, Map, Dictionary 등..)
- 마침표(.)연산자를 사용해 객체의 프로퍼티에 접근할 때는 프로퍼티의 이름이 반드시 식별자로 표현되어야 한다.  
식별자는 데이터 타입이 아니라 JS프로그램에 직접 작성한 이름이기 때문에 프로그램이 실행될때 변경할 수 없다.
- [] 대괄호 연산자를 사용해 객체의 프로퍼티에 접근할 때는 프로퍼티의 이름이 문자열로 표현된다.
- 문자열은 JS의 데이터 타입이기 때문에, 프로그램 실행 시점에 생성되고 중간에 변경될 수 있다.
- [] 대괄호 연산자를 사용해 개발자가 프로그램 코드에 직접 작성하는 식별자 대신,  
실행 시간에 얼마든지 변경할 수 있는 문자열 값을 프로퍼티의 이름으로 사용할 수 있다.
- for/in 루프와 같은 자바스크립트 문장의 강력한 점은 연관배열과 함께 사용할때 명확!

##### 상속
- 객체 o에서 프로퍼티 x를 찾는다고하자. 객체 o가 프로퍼티 x를 갖고있지 않으면, o의 프로토타입 객체에서 x를 찾는다.  
만약 프로토타입 객체에 고유 프로퍼티 x가 없다면, 상위 객체의 프로토타입 객체에서 프로퍼티 x를 찾는다.  
이러한 작업은 프로퍼티 x를 찾거나 해당 객체 또는 객체의 프로토타입 객체가 null이 될 때까지 계속된다.
```
    function inherit (p) {
        if (p == null) throw TypeError();
        if (Object.create) return Object.create(p);
        var t = typeof p;

        if (t !== 'object' && t != 'function') throw TypeError();
        function f () {};
        f.prototype = p;
        return new f();
    }

     var o = {};                // o는 Object.prototype을 상속받은 객체이고
     o.x = 1;                   // 고유 프로퍼티 x를 갖는다.
     var p = inherit(o);        // p는 객체 o와 Object.prototype을 상속받은 객체이고,
     p.y = 2;                   // 고유 프로퍼티 y를 갖는다.
     var q = inherit(p);        // q는 객체 p와 o, Object.prototype을 상속받는 객체이고,
     q.z = 3;                   // 고유 프로퍼티 z를 갖는다.
     var s = q.toString();      // q는 Object.prototype을 상속받았기 때문에 toString()사용 가능!

     console.log(q.x + q.y)     // 3  => q의 프로퍼티 x, y는 각각 o, p에서 받음.
```
- 객체의 프로퍼티에 값을 설정할 때는 해당 프로퍼티에 값을 설정할 수 있는지를 알아보기 위해 프로토타입 체인을 검사.
- 객체 o가 읽기 전용 프로퍼티 x를 상속하는 경우에는 해당 프로퍼티에 값을 설정할 수 없다.
- but, 객체의 프로퍼티에 값을 설정할 수 있따면, 기존의 프로토타입 체인을 수정하지 앟는다.  
객체에 해당 프로퍼티가 없다면, 이를 만들고 값을 설정한다. 만약 프로퍼티가 있다면 값만 설정한다.
- 객체의 프로퍼티 값을 찾을 때 상속이 발생한다는 점은 JS에서 중요하다!!
```
var unitcircle = {r:1};
var c = inherit(unitcircle);
c.x = 1;
c.y = 2;
c.r = 3; // 객체 c는 상속받은 프로퍼티 r을 제정의한다.
console.log(unitcircle.r) // 프로토타입 객체의 프로퍼티 r은 바뀌지 않는다.
```
- 객체에 새 프로퍼티를 생성할 수도있고, 기존 프로퍼티가 가진 속성을 변경할 수도 있다.  
기존 프로퍼티에 임의의 값을 할당할 수 도있다.
- 예외일때 (setter)
- 객체 test가 프로퍼티 x를 상위객체로부터 상속받았다.  
프로퍼티 x는 setter 메서드를 가진 접근자 프로퍼티일때  
이때, 객체 test의 프로퍼티 x의 값을 설정할때는,  
객체 test에 새 프로퍼티 x를 추가하지 않고 상속받은 프로퍼티 x가 가진 setter 메서드를 호출한다.  
하지만 setter메서드는 프로퍼티 x가 정의된 프로토타입 객체에서 호출되지 않고 객체 test에서 직접 호출된다.  
따라서 setter 메서드는 객체 test에 임의의 프로퍼티를 정의할 수 있고, 객체의 프로토타입 체인도 변경하지 않는다.
```
var so = {
    set x(value) {this._x = value;},
    get x() {return this._x;},
    y: 1
}

var test = Object.create(so);
test.x // undefined;
test.y // 1
test.x = 3;
test.x // 3
so.x // undefined
test.__proto__ // 확인해봐라
```
##### 프로퍼티 접근 에러
 - 존재하지 않은 프로퍼티에 접근해도 에러가 발생하지 않는다. undefined를 반환!
 - 하지만 존재하지 않는 프로퍼티의 프로퍼티에 접근하려고하면 에러발생.
 ```
var o = {};
o.y // undefined
o.y.toString() // Uncaught TypeError: Cannot read property 'toString' of undefined
```
- 이러한 예외를 막기 위한 방법 2가지
```
// 1) 구체적이고 확실한 방법
var len = undefined;
if (book) {
    if (book.subtitle) {
        len = book.subtitle.length;
    }
}

// 2) 간단하고 관용적인 방법
var len = book && book.subtitle && book.subtitle.length;
```
- 다음의 예제는 프로퍼티에 값을 설정할 수 없지만 어떠한 예외를 발생시키지 않는다.
```
// 내장된 생성자의 프로토 타입 프로퍼티들은 읽기 전용이다.
Object.prototype = 0 // 문제 없이 실행되나 Object.prototype은 바뀌지 않고 예외 발생 X
```
- 다음과 같은 경우 객체 o에 프로퍼티p를 설정할 수 없다.
```
1) 객체 o가 고유 프로퍼퍼티 p를 가지고있고, 읽기 전용인 경우
2) 객체 o는 상속된 프로퍼티 p를 가지고있고, 프로퍼티 p가 읽기 전용인 경우
3) 객체 o에 고유 프로퍼티 p가 없고, 프로퍼티 p를 상위 객체로부터 상속받지도 않았으며, 객체 확장 속성이 false인 경우.
```
#### 프로퍼티 삭제 (delete 연산자 이용)
- 객체의 프로퍼티 삭제는 delete연산자 이용
- 프로퍼티 자체가 객체에 존재할때 동작
- 상속받은 프로퍼티가 아닌 고유 프로퍼티만 지울 수 있다.
- 상속받은 프로퍼티를 지우기 위해서는 해당 프로퍼티가 정의된 프로토타입 객체에서 지워야 한다.  
만약 삭제할 경우 해당 프로토 타입 객체를 상속받은 모든 객체에 적용
- delete 표현식은 삭제에 성공하거나, 프로퍼티가 존재하지 않아서 실패인 경우에나 항상 true로 평가됨.
- configurable 속성이 falas인 프로퍼티를 지우지 않는다.  
(but, nonextensible객체에 속한 configurable속성이 true인 프로퍼티들은 지운다.)
- 다음과 같은 delete연산은 false로 평가됨!
```
delete Object.prototype; // false : Object.prototype은 속성을 변경할 수 없기 때문에 지울 수 없다.
var x = 1;
delete x; // false : 전역 객체의 프로퍼티는 지울 수 없다.
function f(){} 
delete f; // false : 전역 객체의 함수 f 지울 수 없다.
```
- 그러나 var를 사용하지 않고 전역 프로퍼티 선언시 delete연산자로 바로 삭제!
```
y = 2; // var를 사용하지 않고 전역 프로퍼티 y 선언
delete y // true반환!
```

#### 프로퍼티 검사하기
1) in 연산자 이용
2) hasOwnProperty() 메서드 이용
3) propertyIsEnumerable() 메서드 이용 
4) 단순히 프로퍼티에 접근하기

- in 연산자 사용
- 프로퍼티 접근할 수 없을때도 사용
```
var o = {x:1};
"x" in o // true
"y" in o // false
"toString" in o // true (상속된 프로퍼티이기 때문에 메서드 false반환)

delete o.x;
"x" in o // false;
```
- hasOwnProperty() 메서드 이용 : 주어진 이름의 프로퍼티가 객체에 존재하는지 검사  
(상속받은 프로퍼티의 경우 false 반환)
```
var o = {x: 1};
o.hasOwnProperty("x"); // true : 고유 프로퍼티 x
o.hasOwnProperty("y"); // false : 고유 프로퍼티가 아님
o.hasOwnProperty("toString"); // false : toString은 상속 프로퍼티
```
- propertyIsEnumerable() 메서드 이용 : hasOwnProperty()로 테스트한 결과를 정제한다.
- 객체에 주어진 이름의 고유 프로퍼티가 존재하고,  
열거할 수 있는(enumerable속성이 true인) 프로퍼티인 경우에만 true반환
- 일반적으로 JS코드로 생성된 프로퍼티들은 열거할 수 있다.
```
var o = inherit({y: 2});
o.x = 1;
o.propertyIsEnumerable("y"); // 상속받은 프로퍼티이므로 false반환

Object.prototype.propertyIsEnumerable("toString");
// toString은 내장 프로퍼티이고, 열거할수 없기떄문에 false 반환
```
- undefined가 아닌 경우 단순히 프로퍼티를 조회할 때는 in 연산자 대신 논리 연산자 !==를 사용하는 편이 훨씬 효과적.
```
var o = {x:1};
o.x !== undefined // true;
o.y !== undefined // false;
o.toString !== undefined
```

#### 프로퍼티 열거하기
- 객체가 가진 모든 프로퍼티를 순회하고 싶을 때! for/in 루프 사용
- for/in루프에서는 지정한 객체가 가진 고유 프로퍼티 또는 상속된 프로퍼티들 중 열거 가능한 프로퍼티들에 한해 각 프로퍼티마다 for/in 루프의 몸체가 실행.
- 상속받은 내장 메서드는 열거할 수 없지만, 사용자가 임의로 추가한 프로퍼티들은 객체 내에서 열거 할 수 있다.
```
var o = {x: 1, y: 2, z: 3};
o.propertyIsEnumerable("toString");
for(p in o){
    console.log(p);
}

```