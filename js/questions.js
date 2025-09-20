// 경제력 테스트 문항 데이터
const questions = [
    {
        id: 1,
        title: "용돈/월급을 받으면 가장 먼저 하는 일은?",
        options: [
            { text: "받은 즉시 저축 계좌로 일정 금액을 먼저 이체한다", score: 10 },
            { text: "이번 달 필요한 돈을 계산해서 용도별로 나누어 관리한다", score: 8 },
            { text: "일단 통장에 넣어두고 필요할 때마다 쓴다", score: 4 },
            { text: "밀린 카드값이나 대출 이자부터 갚는다", score: 2 }
        ]
    },
    {
        id: 2,
        title: "큰 금액의 물건을 살 때 어떻게 하시나요?",
        options: [
            { text: "갖고 싶으면 바로 산다", score: 2 },
            { text: "며칠정도 고민하고, 여러 곳에서 가격을 비교한 후 구매한다", score: 10 },
            { text: "하루 정도 고민해보고 결정한다", score: 5 },
            { text: "할부나 대출을 이용해서라도 산다", score: 1 }
        ]
    },
    {
        id: 3,
        title: "신용카드 사용 패턴은?",
        options: [
            { text: "현금처럼 쓰고 매월 전액 결제한다", score: 10 },
            { text: "가끔 할부를 이용하지만 계획적으로 사용한다", score: 7 },
            { text: "자주 할부를 이용하고 최소금액만 납부하기도 한다", score: 3 },
            { text: "신용카드가 없거나 거의 사용하지 않는다", score: 5 }
        ]
    },
    {
        id: 4,
        title: "비상자금은 얼마나 준비되어 있나요?",
        options: [
            { text: "월 생활비의 6개월분 이상", score: 10 },
            { text: "월 생활비의 3-6개월분", score: 8 },
            { text: "월 생활비의 1-3개월분", score: 5 },
            { text: "비상자금이 거의 없다", score: 1 }
        ]
    },
    {
        id: 5,
        title: "투자에 대한 생각은?",
        options: [
            { text: "위험하니까 절대 하지 않는다", score: 4 },
            { text: "여유자금으로 적극적으로 투자한다", score: 8 },
            { text: "안전한 예적금만 한다", score: 6 },
            { text: "빚을 내서라도 큰 수익을 노린다", score: 1 }
        ]
    },
    {
        id: 6,
        title: "가계부 작성은?",
        options: [
            { text: "매일 상세하게 기록한다", score: 10 },
            { text: "일주일에 한 번 정도 정리한다", score: 7 },
            { text: "한 달에 한 번 대략적으로 확인한다", score: 4 },
            { text: "가계부를 쓰지 않는다", score: 1 }
        ]
    },
    {
        id: 7,
        title: "보험은 어떻게 관리하시나요?",
        options: [
            { text: "필요한 보험만 적정 수준으로 가입했다", score: 10 },
            { text: "보험 설계사 추천대로 여러 개 가입했다", score: 5 },
            { text: "보험이 필요한지 모르겠어서 가입하지 않았다", score: 3 },
            { text: "보험료가 부담되지만 해지하지 못하고 있다", score: 2 }
        ]
    },
    {
        id: 8,
        title: "할인 혜택을 볼 때 어떻게 하시나요?",
        options: [
            { text: "정말 필요한 것인지 먼저 생각해본다", score: 10 },
            { text: "할인율이 크면 일단 산다", score: 3 },
            { text: "할인 기간에 맞춰 필요한 것들을 미리 리스트업해서 산다", score: 8 },
            { text: "할인에 별로 관심이 없다", score: 6 }
        ]
    },
    {
        id: 9,
        title: "재정 목표가 있나요?",
        options: [
            { text: "구체적인 금액과 기간을 정해두고 실행 중이다", score: 10 },
            { text: "막연하게 '돈을 모으자'는 생각만 있다", score: 4 },
            { text: "단기적인 목표는 있지만 장기적인 계획은 없다", score: 6 },
            { text: "특별한 재정 목표가 없다", score: 2 }
        ]
    },
    {
        id: 10,
        title: "금융 상품에 대한 지식은?",
        options: [
            { text: "금리, 수수료 등을 꼼꼼히 비교해서 선택한다", score: 10 },
            { text: "인터넷으로 찾아보고 어느 정도 이해하고 선택한다", score: 7 },
            { text: "주변 사람들 추천을 받아서 선택한다", score: 4 },
            { text: "잘 모르겠어서 은행 직원이 추천하는 대로 한다", score: 2 }
        ]
    }
];

// 결과 유형 데이터
const resultTypes = {
    master: {
        range: [81, 100],
        type: "금융 마스터",
        nickname: "돈 관리의 달인",
        emoji: "fas fa-crown",
        color: "#ffd700",
        analysis: "훌륭합니다! 체계적인 자산 관리와 깊이 있는 금융 지식을 갖추고 계시네요.",
        advice: [
            "현재의 우수한 습관을 유지하세요",
            "더 다양한 투자 포트폴리오 구성을 고려해보세요", 
            "다른 사람들에게 좋은 롤모델이 될 수 있습니다"
        ]
    },
    good: {
        range: [61, 80],
        type: "경제 센스맨",
        nickname: "조금만 더 하면 완벽!",
        emoji: "fas fa-star",
        color: "#4ecdc4",
        analysis: "기본기는 탄탄하지만 몇 가지 영역에서 개선의 여지가 있어요.",
        advice: [
            "가계부 작성을 더 꼼꼼히 해보세요",
            "비상자금을 조금 더 늘려보시길 추천합니다",
            "금융 상품 비교 습관을 기르면 더욱 좋을 거예요"
        ]
    },
    caution: {
        range: [41, 60],
        type: "주의 필요형",
        nickname: "돈쓸 때 브레이크가 필요해!",
        emoji: "fas fa-exclamation-triangle",
        color: "#ff9500",
        analysis: "기본적인 돈 관리는 하고 있지만, 계획성이 부족하거나 충동구매 경향이 있어요.",
        advice: [
            "가계부 작성부터 시작해보세요",
            "큰 구매 전에는 반드시 하루 이상 고민하는 습관을 만드세요",
            "월 예산을 미리 세우고 지키려고 노력해보세요",
            "비상자금 마련을 우선순위로 두세요"
        ]
    },
    beginner: {
        range: [0, 40],
        type: "경제 초보형",
        nickname: "경제 관리, 지금부터 시작!",
        emoji: "fas fa-seedling",
        color: "#e74c3c",
        analysis: "아직 체계적인 돈 관리를 시작하지 못했네요. 하지만 늦지 않았어요!",
        advice: [
            "우선 간단한 가계부 앱부터 설치해보세요",
            "용돈/월급의 10%라도 별도 통장에 저축하는 습관을 만드세요",
            "신용카드 사용을 줄이고 현금 사용 비중을 늘려보세요",
            "금융 기초 지식을 쌓기 위해 관련 책이나 유튜브를 활용해보세요",
            "작은 것부터 천천히 시작하면 분명 개선될 거예요!"
        ]
    }
};

// 점수에 따른 결과 유형 결정
function getResultType(totalScore) {
    for (const [key, type] of Object.entries(resultTypes)) {
        if (totalScore >= type.range[0] && totalScore <= type.range[1]) {
            return type;
        }
    }
    return resultTypes.beginner; // 기본값
}