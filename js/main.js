// 전역 변수
let currentQuestionIndex = 0;
let userAnswers = [];
let totalScore = 0;

// DOM 요소
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
const questionTitle = document.getElementById('question-title');
const questionOptions = document.getElementById('question-options');

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
    initializeTest();
});

startBtn.addEventListener('click', startTest);
prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartTest);
shareBtn.addEventListener('click', shareResult);

// 초기화
function initializeTest() {
    currentQuestionIndex = 0;
    userAnswers = [];
    totalScore = 0;
    showScreen('start');
}

// 화면 전환
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    switch(screenName) {
        case 'start':
            startScreen.classList.add('active');
            break;
        case 'question':
            questionScreen.classList.add('active');
            break;
        case 'result':
            resultScreen.classList.add('active');
            break;
    }
}

// 테스트 시작
function startTest() {
    currentQuestionIndex = 0;
    userAnswers = [];
    totalScore = 0;
    showScreen('question');
    displayQuestion();
}

// 문항 표시
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    
    // 진행률 업데이트
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
    
    // 문항 제목
    questionTitle.textContent = question.title;
    
    // 선택지 생성
    questionOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = createOptionElement(option, index);
        questionOptions.appendChild(optionElement);
    });
    
    // 네비게이션 버튼 상태 업데이트
    updateNavigationButtons();
}

// 선택지 요소 생성
function createOptionElement(option, index) {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    optionDiv.setAttribute('data-score', option.score);
    optionDiv.setAttribute('data-index', index);
    
    // 이전에 선택된 답안이 있다면 표시
    if (userAnswers[currentQuestionIndex] !== undefined && 
        userAnswers[currentQuestionIndex].optionIndex === index) {
        optionDiv.classList.add('selected');
    }
    
    optionDiv.innerHTML = `
        <div class="option-number">${index + 1}</div>
        <div class="option-text">${option.text}</div>
    `;
    
    optionDiv.addEventListener('click', () => selectOption(optionDiv, index, option.score));
    
    return optionDiv;
}

// 선택지 선택
function selectOption(optionElement, optionIndex, score) {
    // 이전 선택 해제
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 새로운 선택 표시
    optionElement.classList.add('selected');
    
    // 답안 저장
    userAnswers[currentQuestionIndex] = {
        questionId: questions[currentQuestionIndex].id,
        optionIndex: optionIndex,
        score: score
    };
    
    // 다음 버튼 활성화
    updateNavigationButtons();
}

// 네비게이션 버튼 상태 업데이트
function updateNavigationButtons() {
    // 이전 버튼
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // 다음 버튼
    const hasAnswer = userAnswers[currentQuestionIndex] !== undefined;
    nextBtn.disabled = !hasAnswer;
    
    // 마지막 문항인지 확인
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerHTML = '<i class="fas fa-check"></i> 결과 보기';
    } else {
        nextBtn.innerHTML = '다음 <i class="fas fa-chevron-right"></i>';
    }
}

// 이전 문항으로
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// 다음 문항으로 또는 결과 계산
function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        return; // 답안이 선택되지 않았으면 진행하지 않음
    }
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // 모든 문항 완료 - 결과 계산
        calculateAndShowResult();
    }
}

// 결과 계산 및 표시
function calculateAndShowResult() {
    // 총점 계산
    totalScore = userAnswers.reduce((sum, answer) => sum + answer.score, 0);
    
    // 결과 유형 결정
    const result = getResultType(totalScore);
    
    // 결과 화면 업데이트
    updateResultScreen(result, totalScore);
    
    // 결과 화면으로 전환
    showScreen('result');
}

// 결과 화면 업데이트
function updateResultScreen(result, score) {
    // 아이콘과 색상
    const resultIcon = document.getElementById('result-emoji');
    resultIcon.className = result.emoji;
    resultIcon.style.color = result.color;
    
    // 유형과 별명
    document.getElementById('result-type').textContent = result.type;
    document.getElementById('result-nickname').textContent = `"${result.nickname}"`;
    
    // 점수
    document.getElementById('result-score').innerHTML = `
  <span class="score-main">${score}</span>
  <span class="score-sub"> / 100점</span>
`;
    
    // 분석
    document.getElementById('result-analysis').innerHTML = `
        <h3><i class="fas fa-chart-bar"></i> 분석</h3>
        <p>${result.analysis}</p>
    `;
    
    // 어드바이스
    const adviceList = result.advice.map(advice => `<li>${advice}</li>`).join('');
    document.getElementById('result-advice').innerHTML = `
        <h3><i class="fas fa-lightbulb"></i> 어드바이스</h3>
        <ul>${adviceList}</ul>
    `;
}

// 테스트 재시작
function restartTest() {
    initializeTest();
}

// 결과 공유
function shareResult() {
    const result = getResultType(totalScore);
    const shareText = `경제력 테스트 결과: ${result.type} (${totalScore}점/100점)\n"${result.nickname}"\n\n당신도 테스트해보세요!`;
    
    if (navigator.share) {
        // Web Share API 사용 (모바일 브라우저)
        navigator.share({
            title: '경제력 테스트 결과',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        // 클립보드에 복사
        navigator.clipboard.writeText(shareText + '\n' + window.location.href)
            .then(() => {
                alert('결과가 클립보드에 복사되었습니다!');
            })
            .catch(() => {
                // 클립보드 API 실패 시 임시 textarea 사용
                const textarea = document.createElement('textarea');
                textarea.value = shareText + '\n' + window.location.href;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('결과가 클립보드에 복사되었습니다!');
            });
    }
}

// 키보드 네비게이션
document.addEventListener('keydown', function(e) {
    if (questionScreen.classList.contains('active')) {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            previousQuestion();
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            nextQuestion();
        } else if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.option');
            if (options[optionIndex]) {
                options[optionIndex].click();
            }
        }
    }
});