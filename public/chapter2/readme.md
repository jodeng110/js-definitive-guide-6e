# Chapter2 어휘 구조

#### 대소문자 구분
- JS는 대소문자 구분
- but, HTML은 대소문자 구별 X
#### 공백, 개행, 제어
- JS는 프로그램 코드 내에 토큰들 사이에 있는 공백 무시
- 줄바꿈 문자도 무시하지만 예외 있음!
- 읽고, 이해하기 쉬운 깔끔한 코드 작성을 위해 들여쓰기 할 수 있다.
- JS에서 공백으로 인식하는 것들...
        
        공백문자(\u0020), 탭(\u0009), 수직탭(\u000B), 폼피드(\u000C),
        줄바꿈 없는 공백 : NBSP - Non Breaking Space(\u00A0),
        바이트 오더 마크 : BOM - Byte Order Mark(\uFEFF),
        유니코드 카테고리 Z(Separator, Space)에 포함된 문자.
- JS에서 줄바꿈 문자로 인식하는 것들...
        
        라인피드(\u000A), 캐리지 리턴(\u000D), 줄바꿈문자(\u2028),
        문단 구분자(\u2029)
- 캐리지 리턴(CR)과 라인피드(LF)는 한줄짜리 줄바꿈 문자로 취급
#### 유니코드 이스케이프 시퀀스
- 일부 컴퓨터 하드웨어와 소프트웨어로는 특정 유니코드 글자들의 집합을
  입력으로 받거나 화면에 표시할 수 없다.
- JS에서는 프로그래머가 유니코드를 사용할 수 있도록
  16비트 유니코드 글자를 표현할 수 있는 일련의
  6자리 ASCII 문자열 시퀀스를 정의하고 있다.
- 유니코드 이스케이프 시퀀스는 \u로 시작하고 이어 16진수 숫자
  (대소문자 구분 없이 A부터 F) 네 개를 이용
  >ex) 'caf\u00e924'를 console에 찍어보자.
- 주석에 사용할 경우 일반 ASCII글자로 취급하여 유니코드 해석X
#### 유니코드 정규화
- \u00e9는 ASCII 글자 e에 강조하는 유니코드 문자열 \u0301을
  결합해서 표현할 수도있다.
- 두 인코딩은 텍스트 에디터에서 같아 보이지만, 실제로 글자의 코드값이
  다르기 때문에 컴퓨터에서는 다른 글자로 인식.
- JS에서 해석된 소스코드는 이미 정규화 과정을 거쳤다고 가정하고
  더이상 식별자나 문자열 혹은 정규 표현식을 정규화하려고 하지 않음.
  
#### 식별자
- 알파벳, 밑줄(_), 달러($)로 시작
- 이어지는 문자들은 알파벳, 숫자, 밑줄(_), 달러($)
- 첫 글자를 숫자로 허용하지 않는 이유는 JS가 숫자와 식별자를 쉽게
  구별하기 위함.
- 이식성과 편집의 용이성을 이유로 ASCII문자와 숫자만 사용.
- ECMAScript 표준에서는 두번째 글자부터 유니코드 카테고리 Mn, Mc, Pc에
  속한 글자를 사용할 수 있음. 이러한 점을 이용해 프로그래머들이 비 영어권
  언어로 작성할 수 있고, 수학적 기호도 사용가능하다.
- 예약어는 식별자로 사용할 수 없다.

#### 예약어
- JS는 특정 식별자들을 언어 내부에서 사용하는 용도로 예약하고있다.
- 프로그램 내에서 식별자로 사용할수 없는 단어
        
        break, delete, function, return, typeof, case, do, if,
        switch, var, catch, else, in, this, void, continue,
        false, instanceof, throw, while, debugger, finally, new,
        true, with, default, for, null, try
- ES6에서 추가된 예약어
        
        class, const, enum, export, extends,
        import, super
- 보통 JS에서 식별자로 사용할 수 있지만, Strict Mode(use strict;) 예약어로 사용
        
        implements, let, private, public,
        yield, interface, package, protected, static
- 엄격한 모드에서 다음 식별자 사용을 제한하고 있다
    
        arguments, eval
- JS 전역 변수와 함수 정의
        
        arguments, encodeURI, Infinity, Number, RegExp,
        Array, encodeURIComponent, isFinite, Object,
        String, Boolean, Error, isNaN, parseFloat, SyntaxError,
        Date, eval, JSON, parseInt, TypeError, decodeURI,
        EvalError, Math, RangeError, undefined, decodeURIComponent,
        Function, NaN, ReferenceError, URIError
#### 세미콜론의 사용
- 구분자가 없으면 한 구문의 끝에 다음 구문의 시작이 올 수 있다.
- JS에서는 여러 구문이 서로 다른 줄에 나타나는 경우 세미콜론을 생략할 수 있다.
        
        a = 3;  
        a = 4; 
      
- 위에 예제에서는 두 구문이 각각 다른줄에 작성되어 있으므로, 첫 행의
  세미콜론 생략 가능.
    
    a = 3; a = 4; // 한줄에 있으니 반드시 필요
- JS는 항상 모든 줄바꿈을 세미콜론으로 구분하지 않는다.
- JS는 현재 구문의 다음에 오는 공백이 아닌 문자열을 해석할 수 없을 경우에
  세미콜론으로 줄바꿈 처리.
       
        var a  
        a  
        =  
        3  
        console.log(a)
- 위에 코드를 JS는 다음과 같이 해석
      
      var a; a=3; console.log(a);
- but, 이러한 방식은 의도치 않은 해석이 될수있어.
        
        var y = x + f  
        (a+b).toString()
- 위에는 의도치 않게 함수 f의 호출이 될수있어.
      
      var y = x + f(a+b).toString();
- 지금까지 줄바꿈을 세미콜론으로 해석하는 일반적인 규칙에 대해서 살펴보았다.
- but, 두가지 예외가 있다. 예외 상황이 되면 첫번째 행에서 두번째 행으로
  해석을 진행할 수 없게됨.
- 첫번째 예외) return, break, continue 문 사용  
  
      return  
      true; (X)
      
      // JS는 이렇게 해석
      return; true;
      
      // 프로그래머가 하고자했던것
      return true;
- return, break, continue와 다음에 오는 키워드 사이에 줄바꿈을
  하지 않아야한다. 만약 줄바꿈을 할경우, 디버깅하기 어렵고, 예상치 못한 경우
  프로그램이 비정상적으로 종료될 수 있다.
- 두번째 예외) ++, -- 연산자 사용시
- 전치(prefix), 후치(postfix) 연산자
- 후치연산자로 사용할 경우 반드시 연산자가 적용되는 표현식과 동일한 줄에 나타나야함.
    
        x
        ++
        y
        
- 위 코드는
        
        x++; y // (X)
        x; ++y // (O)로 해석됨.