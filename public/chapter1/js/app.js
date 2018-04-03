const amountEl = document.getElementById('amount'),
      aprEl = document.getElementById('apr'),
      yearsEl = document.getElementById('years'),
      paymentEl = document.getElementById('payment'),
      totalEl = document.getElementById('total'),
      totalInterestEl = document.getElementById('totalinterest');

// 문서의 로딩이 완료되면...
window.onload = function () {
    if (window.localStorage && localStorage.loanAmount) {
        amountEl.value = localStorage.loanAmount;
        aprEl.value = localStorage.loanApr;
        yearsEl.value = localStorage.loanYears;
    }
};

function calculate () {
    const loanAmount = parseFloat(amountEl.value),
          interest = parseFloat(aprEl.value) / 100 / 12, // 월 이자율 계산
          period = parseInt(yearsEl.value) * 12; // 상한 기간 연수를 월로 계산

    // 월별 상환금 계산
    let x = (1 + interest) ** period;
    let monthly = (loanAmount * x * interest)/(x-1);

    if (isFinite(monthly)) {
        paymentEl.textContent = Math.round(monthly);
        totalEl.textContent = Math.round(monthly * period);
        totalInterestEl.textContent = Math.round((monthly * period)-loanAmount);
        save(amountEl.value, aprEl.value, yearsEl.value);

        try {
            // 여기구문이 실행되는 과정에서 에러발생 시 모두 cath exception으로!
        } catch (e) {

        }

        // 대출 잔액과 이자를 차트를 그리기
        chart(loanAmount, interest, monthly, period);
    } else {
        paymentEl.textContent = '';
        totalEl.textContent = '';
        totalInterestEl.textContent = '';
        chart();
    }
}

function save (amount, apr, years) {
    if (window.localStorage) {
        localStorage.loanAmount = amount;
        localStorage.loanApr = apr;
        localStorage.loanYears = years;
    }
}

function chart (amount, interest, monthly, payments) {
    console.log(amount, interest, monthly, payments)
    const graph = document.getElementById('graph');
    // graph.width = graph.width;

    // 파라미터가 없거나, <canvas>를 지원하지 않는 브라우저인지 확인
    if (arguments.length === 0 || !graph.getContext) return;

    const g = graph.getContext('2d'), // 모든 드로잉은 이 객체를 통해 이루어짐.
          width = graph.width,
          height = graph.height;

    // 지불 개월 수 픽셀 변환
    function paymentToX(n) { return n * width / payments; }
    // 지불 돈 픽셀 변환
    function amountToY(a) { return height - (a * height / (monthly*payments*1.05)); }
    g.moveTo(paymentToX(0), amountToY(0));
    g.lineTo(paymentToX(payments), amountToY(monthly*payments));
    g.lineTo(paymentToX(payments), amountToY(0));
    g.closePath(); // 시작점으로 되돌리기
    g.fillStyle = '#f88';
    g.fill();
    g.font = 'bold 12px sans-serif';
    g.fillText('총 이자 금액', 20, 20);

    // 금액을 곡선으로 그리고 진하게 표시
    let equity = 0;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(0));

    for (let p = 1; p <= payments ; p++) {
        let thisMonthsInterest = (amount - equity)*interest;
        equity += (monthly - thisMonthsInterest);
        g.lineTo(paymentToX(p), amountToY(equity));
    }
    g.lineTo(paymentToX(payments), amountToY(0));
    g.closePath();
    g.fillStyle = 'green';
    g.fill();
    g.fillText('총 자본', 20, 35);

    let bal = amount;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(bal));
    for (let p = 1 ; p <= payments; p++) {
        let thisMonthsInterest = bal * interest;
        bal -= (monthly - thisMonthsInterest);
        g.lineTo(paymentToX(p), amountToY(bal));
    }
    g.lineWidth = 3;
    g.stroke();

    g.fillStyle = 'black';
    g.fillText("대출 잔액", 20, 50);
    g.textAlign = 'center';

    let y = amountToY(0);
    for (let year = 1; year * 12 <= payments; year++) {
        let x = paymentToX(year*12);
        g.fillRect(x-0.5, y-3, 1, 3);
        if (year == 1) {
            g.fillText('year', x, y-5);
        }
        if (year % 5 == 0 && year * 12 !== payments) {
            g.fillText(String(year), x, y-5);
        }
    }
    
    // y축에 납입할 금액 표시
    g.textAlign = "right";
    g.textBaseline = "middle"; // 텍스트의 세로를 가운데 정렬

    let ticks = [monthly*payments, amount];
    let rightEdge = paymentToX(payments);

    for (let i = 0 ; i < ticks.length ; i++) {
        let y = amountToY(ticks[i]);

        g.fillRect(rightEdge-3, y-0.5, 3, 1);
        g.fillText(String(ticks[i].toFixed(0)), rightEdge-5, y);
    }
}
