// MCQscript.js - Phiên bản: Chỉ hiện giải thích câu SAI

// 🚨 BƯỚC 1: CẤU HÌNH FIREBASE (Giữ nguyên) 🚨
const firebaseConfig = {
  apiKey: "AIzaSyDKRribCxrXMpJcTYBdwe-7zZ8bZWlReLc",
  authDomain: "eaching1.firebaseapp.com",
  projectId: "eaching1",
  storageBucket: "eaching1.firebasestorage.app",
  messagingSenderId: "433194073623",
  appId: "1:433194073623:web:9165dd7ce0a129d5e32652",
  measurementId: "G-685W8RSP1Y"
};

// Khởi tạo Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 🚨 BƯỚC 2: DỮ LIỆU CÂU HỎI & GIẢI THÍCH (80 câu) 🚨
const quizData = {
    // === PHẦN 1: CHIA ĐỘNG TỪ ===
    q1: { correct: 'B', explain: 'Sai. Chủ ngữ "She" (ngôi thứ 3 số ít) -> Động từ thêm "s" (reads).' },
    q2: { correct: 'B', explain: 'Sai. Chủ ngữ "My brother" (số ít) -> Phủ định dùng "doesn\'t" + V nguyên thể.' },
    q3: { correct: 'B', explain: 'Sai. Lịch trình tàu xe cố định -> Dùng hiện tại đơn. "The train" số ít -> leaves.' },
    q4: { correct: 'A', explain: 'Sai. Chủ ngữ "They" (số nhiều) -> Động từ giữ nguyên (watch).' },
    q5: { correct: 'C', explain: 'Sai. Câu hỏi với chủ ngữ "your dad" (số ít) -> Trợ động từ "Does".' },
    q6: { correct: 'A', explain: 'Sai. Chủ ngữ "I" -> Động từ giữ nguyên (like).' },
    q7: { correct: 'B', explain: 'Sai. Chủ ngữ "My mom" (số ít) -> Động từ thêm "s" (cooks).' },
    q8: { correct: 'A', explain: 'Sai. Chủ ngữ "The children" (số nhiều) -> Phủ định dùng "don\'t".' },
    q9: { correct: 'C', explain: 'Sai. Câu hỏi với "you" -> Trợ động từ "do". Cấu trúc: Wh- + do + S + V?' },
    q10: { correct: 'C', explain: 'Sai. "He" -> Động từ kết thúc bằng "y" trước là phụ âm -> đổi thành "ies" (studies).' },
    q11: { correct: 'B', explain: 'Sai. "My sister" (số ít) -> Động từ "wash" tận cùng là "sh" -> thêm "es" (washes).' },
    q12: { correct: 'A', explain: 'Sai. "The stars" (số nhiều) -> Động từ giữ nguyên (shine).' },
    q13: { correct: 'A', explain: 'Sai. "Birds" (số nhiều) -> Động từ giữ nguyên (fly).' },
    q14: { correct: 'B', explain: 'Sai. "My teacher" (số ít) -> Phủ định dùng "doesn\'t".' },
    q15: { correct: 'B', explain: 'Sai. Chủ ngữ giả "It" -> Động từ thêm "s" (rains).' },
    q16: { correct: 'C', explain: 'Sai. "your brother" (số ít) -> Câu hỏi dùng "Does" + V nguyên thể (like).' },
    q17: { correct: 'B', explain: 'Sai. Sự thật hiển nhiên. Water (không đếm được) -> boils.' },
    q18: { correct: 'A', explain: 'Sai. Chủ ngữ "We" -> Động từ giữ nguyên (have).' },
    q19: { correct: 'B', explain: 'Sai. "My friend" (số ít) -> Động từ thêm "s" (lives).' },
    q20: { correct: 'B', explain: 'Sai. "He" -> Phủ định dùng "doesn\'t" + V nguyên thể (go).' },

    // === PHẦN 2: SẮP XẾP CÂU ===
    q21: { correct: 'B', explain: 'Sai. Trạng từ tần suất (always) đứng TRƯỚC động từ thường (eats).' },
    q22: { correct: 'A', explain: 'Sai. Câu hỏi Yes/No: Does + S + V + ...? (Does she walk...)' },
    q23: { correct: 'A', explain: 'Sai. Câu phủ định: S + don\'t + V + O (I don\'t play...).' },
    q24: { correct: 'B', explain: 'Sai. Trạng từ (often) đứng trước động từ (finishes).' },
    q25: { correct: 'C', explain: 'Sai. Trạng từ (never) đứng trước động từ (barks). Subject là "Our dog" số ít -> barks.' },
    q26: { correct: 'A', explain: 'Sai. Trạng từ (always) đứng trước động từ (work).' },
    q27: { correct: 'A', explain: 'Sai. Cấu trúc: S + V + O + Time (My dad goes to work at 7 AM).' },
    q28: { correct: 'B', explain: 'Sai. Câu hỏi: Does + S + V nguyên thể? (Does she read...).' },
    q29: { correct: 'B', explain: 'Sai. Cấu trúc: S + V + O + Time (The children play soccer on Saturdays).' },
    q30: { correct: 'A', explain: 'Sai. Always đứng trước động từ eat.' },
    q31: { correct: 'A', explain: 'Sai. Usually đứng trước động từ have.' },
    q32: { correct: 'A', explain: 'Sai. Câu hỏi Wh/H: [Wh] + Does + S + Often + V? (Does he often go...).' },
    q33: { correct: 'B', explain: 'Sai. Never đứng trước động từ drinks.' },
    q34: { correct: 'B', explain: 'Sai. Câu hỏi: Do + you + want...?' },
    q35: { correct: 'A', explain: 'Sai. Trạng từ thời gian (every morning) thường đứng cuối câu.' },
    q36: { correct: 'C', explain: 'Sai. Phủ định: She + doesn\'t + live + in Paris.' },
    q37: { correct: 'A', explain: 'Sai. Trạng từ thời gian (at 8 o\'clock) đứng cuối câu.' },
    q38: { correct: 'A', explain: 'Sai. Câu hỏi: Does + your father + work...?' },
    q39: { correct: 'B', explain: 'Sai. Always đứng trước động từ arrive.' },
    q40: { correct: 'A', explain: 'Sai. Often đứng trước động từ help.' },

    // === PHẦN 3: CHỌN DẠNG ĐÚNG ===
    q41: { correct: 'B', explain: 'Sai. He (số ít) -> plays.' },
    q42: { correct: 'B', explain: 'Sai. My mom (số ít) -> cooks.' },
    q43: { correct: 'A', explain: 'Sai. We (số nhiều) -> don\'t.' },
    q44: { correct: 'B', explain: 'Sai. The sun (duy nhất/số ít) -> rises.' },
    q45: { correct: 'B', explain: 'Sai. She (số ít) -> Trợ động từ Does.' },
    q46: { correct: 'A', explain: 'Sai. They (số nhiều) -> live.' },
    q47: { correct: 'B', explain: 'Sai. My father (số ít) -> drives.' },
    q48: { correct: 'A', explain: 'Sai. We (số nhiều) -> don\'t.' },
    q49: { correct: 'B', explain: 'Sai. He (số ít) -> Trợ động từ Does.' },
    q50: { correct: 'B', explain: 'Sai. The dog (số ít) -> barks.' },
    q51: { correct: 'A', explain: 'Sai. My cousins (số nhiều, có s) -> visit.' },
    q52: { correct: 'B', explain: 'Sai. Your cat (số ít) -> Does.' },
    q53: { correct: 'A', explain: 'Sai. Động từ tobe đi với I là am.' },
    q54: { correct: 'A', explain: 'Sai. Plants (số nhiều) -> need.' },
    q55: { correct: 'B', explain: 'Sai. She (số ít) -> doesn\'t.' },
    q56: { correct: 'A', explain: 'Sai. These flowers (số nhiều) -> smell.' },
    q57: { correct: 'A', explain: 'Sai. They (số nhiều) -> Do.' },
    q58: { correct: 'B', explain: 'Sai. My brother (số ít) -> fixes.' },
    q59: { correct: 'A', explain: 'Sai. Trạng từ (usually) đứng trước động từ (go).' },
    q60: { correct: 'B', explain: 'Sai. It (số ít) -> takes.' },

    // === PHẦN 4: ĐIỀN TỪ PHỦ ĐỊNH ===
    q61: { correct: 'B', explain: 'Sai. My father (số ít) -> doesn\'t.' },
    q62: { correct: 'A', explain: 'Sai. They (số nhiều) -> don\'t.' },
    q63: { correct: 'B', explain: 'Sai. She (số ít) -> doesn\'t.' },
    q64: { correct: 'A', explain: 'Sai. I (ngôi thứ nhất) -> don\'t.' },
    q65: { correct: 'B', explain: 'Sai. The cat (số ít) -> doesn\'t.' },
    q66: { correct: 'A', explain: 'Sai. We (số nhiều) -> don\'t.' },
    q67: { correct: 'B', explain: 'Sai. It (số ít) -> doesn\'t.' },
    q68: { correct: 'A', explain: 'Sai. My friends (số nhiều) -> don\'t.' },
    q69: { correct: 'B', explain: 'Sai. This bus (số ít) -> doesn\'t.' },
    q70: { correct: 'A', explain: 'Sai. You (ngôi thứ 2) -> don\'t.' },
    q71: { correct: 'B', explain: 'Sai. My sister (số ít) -> doesn\'t.' },
    q72: { correct: 'A', explain: 'Sai. Lions (số nhiều) -> don\'t.' },
    q73: { correct: 'B', explain: 'Sai. He (số ít) -> doesn\'t.' },
    q74: { correct: 'A', explain: 'Sai. They (số nhiều) -> don\'t.' },
    q75: { correct: 'B', explain: 'Sai. My dog (số ít) -> doesn\'t.' },
    q76: { correct: 'A', explain: 'Sai. The shops (số nhiều) -> don\'t.' },
    q77: { correct: 'B', explain: 'Sai. She (số ít) -> doesn\'t.' },
    q78: { correct: 'A', explain: 'Sai. We (số nhiều) -> don\'t.' },
    q79: { correct: 'B', explain: 'Sai. That computer (số ít) -> doesn\'t.' },
    q80: { correct: 'A', explain: 'Sai. I (ngôi thứ nhất) -> don\'t.' }
};

const MAX_QUESTIONS = Object.keys(quizData).length; 
const QUESTIONS_TO_PICK = 20; 

let currentQuizQuestions = [];
const questionContainer = document.getElementById('quizForm');
let isSubmitted = false;

// --- LOGIC CHỌN NGẪU NHIÊN VÀ RENDER QUIZ ---
function shuffleAndPickQuestions(max, pick) {
    const allKeys = Object.keys(quizData);
    for (let i = allKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allKeys[i], allKeys[j]] = [allKeys[j], allKeys[i]];
    }
    return allKeys.slice(0, pick);
}

function renderQuiz() {
    isSubmitted = false;
    currentQuizQuestions = shuffleAndPickQuestions(MAX_QUESTIONS, QUESTIONS_TO_PICK);
    
    questionContainer.innerHTML = ''; 

    const originalContainer = document.getElementById('originalQuestionsContainer');
    
    // Tạo nút Nộp bài
    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.id = 'submitBtn';
    submitBtn.innerText = 'Nộp Bài & Lưu Lịch Sử';
    submitBtn.addEventListener('click', submitQuiz);

    // Render từng câu
    currentQuizQuestions.forEach((qId, index) => {
        const originalQuestion = originalContainer.querySelector(`#${qId}`);
        
        if (originalQuestion) {
            const newQuestion = originalQuestion.cloneNode(true);
            const pElement = newQuestion.querySelector('p');
            if (pElement) {
                let content = pElement.innerHTML;
                if(content.includes('.')) {
                    content = content.substring(content.indexOf('.') + 1).trim();
                }
                pElement.innerHTML = `<strong>Câu ${index + 1}:</strong> ${content}`;
            }

            const radioInputs = newQuestion.querySelectorAll('input[type="radio"]');
            radioInputs.forEach(input => {
                input.name = qId; 
                input.checked = false;
            });
            
            questionContainer.appendChild(newQuestion);
        }
    });

    questionContainer.appendChild(submitBtn);

    document.getElementById('result').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    renderQuiz();
});

// --- LOGIC CHẤM ĐIỂM ---
function submitQuiz() {
    if (isSubmitted) return; 

    let score = 0;
    const questions = questionContainer.querySelectorAll('.question'); 
    let answeredCount = 0;
    let firstUnansweredQuestion = null;
    let userAnswers = {}; 

    // Kiểm tra làm hết chưa
    questions.forEach(question => {
        const name = question.id; 
        const selectedInput = question.querySelector(`input[name="${name}"]:checked`);
        
        if (selectedInput) {
            answeredCount++;
        } else if (!firstUnansweredQuestion) {
            firstUnansweredQuestion = question;
        }
    });
    
    if (answeredCount < QUESTIONS_TO_PICK) {
        firstUnansweredQuestion.style.borderLeftColor = '#f4b400';
        firstUnansweredQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
        alert(`Vui lòng trả lời hết ${QUESTIONS_TO_PICK} câu hỏi!`);
        return;
    }

    // Bắt đầu chấm
    isSubmitted = true;
    questions.forEach(question => {
        question.classList.add('submitted');
        const name = question.id;
        const selectedInput = question.querySelector(`input[name="${name}"]:checked`);
        const selectedOptionValue = selectedInput ? selectedInput.value : null; 
        
        const correctAnswer = quizData[name].correct;
        const explanation = quizData[name].explain;

        const userLabel = question.querySelector(`label[data-value="${selectedOptionValue}"]`);
        let userContent = userLabel ? userLabel.textContent.trim() : "Không chọn";
        
        const correctLabel = question.querySelector(`label[data-value="${correctAnswer}"]`);
        let correctContent = correctLabel ? correctLabel.textContent.trim() : "Lỗi data";

        userAnswers[name] = {
            value: selectedOptionValue,
            content: userContent,
            correctValue: correctAnswer,
            correctContent: correctContent,
            explanation: explanation // Lưu giải thích để dùng
        };

        if (selectedOptionValue === correctAnswer) {
            score++;
            question.style.borderLeftColor = '#0f9d58'; 
        } else {
            question.style.borderLeftColor = '#db4437'; 
        }

        question.querySelectorAll('label').forEach(label => {
            const val = label.getAttribute('data-value');
            if (val === correctAnswer) label.classList.add('correct-answer');
            if (val === selectedOptionValue && val !== correctAnswer) label.classList.add('wrong-answer');
        });
    });

    displayResult(score, QUESTIONS_TO_PICK);
    saveScoreToFirebase(score, userAnswers); 
}

function displayResult(score, total) {
    const resultDiv = document.getElementById('result');
    const submitButton = document.getElementById('submitBtn');

    submitButton.disabled = true;
    submitButton.innerText = 'Đã hoàn thành - Kéo xuống để xem lịch sử';

    const percentage = (score / total) * 100;
    resultDiv.innerHTML = `
        <h3>Kết Quả</h3>
        <p style="font-size: 1.2em;">Bạn làm đúng: <strong style="color: ${percentage >= 50 ? 'green' : 'red'}">${score}/${total}</strong> câu (${percentage.toFixed(0)}%)</p>
        <button onclick="renderQuiz()" style="background-color: #4285f4; margin-top:10px;">Làm Đề Mới</button>
    `;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- FIREBASE FUNCTIONS ---
function saveScoreToFirebase(score, userAnswers) {
    db.collection("quiz_scores").add({
        score: score,
        total: QUESTIONS_TO_PICK,
        answers: userAnswers,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log("Đã lưu lịch sử: ", docRef.id);
        loadHistory();
    })
    .catch((error) => {
        console.error("Lỗi lưu data: ", error);
    });
}

function loadHistory() {
    const historyList = document.getElementById('history-list');
    
    db.collection("quiz_scores")
        .orderBy("timestamp", "desc")
        .limit(5)
        .get()
        .then((querySnapshot) => {
            historyList.innerHTML = '';
            if (querySnapshot.empty) {
                historyList.innerHTML = '<p>Chưa có lịch sử làm bài.</p>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const date = data.timestamp ? data.timestamp.toDate().toLocaleString('vi-VN') : 'Vừa xong';
                
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <p><strong>Ngày:</strong> ${date}</p>
                    <p><strong>Điểm:</strong> ${data.score}/${data.total}</p>
                    <button class="view-details-btn" onclick="toggleDetails('${doc.id}')">Xem kết quả chi tiết</button>
                    <div id="details-${doc.id}" style="display:none; margin-top:10px;"></div>
                `;
                item.dataset.answers = JSON.stringify(data.answers);
                historyList.appendChild(item);
            });
        });
}

// Hàm hiển thị chi tiết (Chỉ hiện giải thích nếu SAI)
window.toggleDetails = function(docId) {
    const detailsDiv = document.getElementById(`details-${docId}`);
    
    if (detailsDiv.style.display === 'block') {
        detailsDiv.style.display = 'none';
        return;
    }

    const itemDiv = detailsDiv.parentElement;
    const answers = JSON.parse(itemDiv.dataset.answers);

    let html = `
        <table style="width:100%; border-collapse: collapse; font-size: 14px;">
            <thead>
                <tr style="background:#f0f0f0; text-align:left;">
                    <th style="padding:5px; border:1px solid #ddd;">Câu</th>
                    <th style="padding:5px; border:1px solid #ddd;">Bạn chọn</th>
                    <th style="padding:5px; border:1px solid #ddd;">Đáp án đúng</th>
                    <th style="padding:5px; border:1px solid #ddd; width: 40%;">Giải thích (Nếu sai)</th>
                </tr>
            </thead>
            <tbody>
    `;

    const sortedKeys = Object.keys(answers).sort((a, b) => {
        return parseInt(a.replace('q','')) - parseInt(b.replace('q',''));
    });

    sortedKeys.forEach(key => {
        const val = answers[key];
        const isRight = val.value === val.correctValue;
        const color = isRight ? '#d4edda' : '#f8d7da'; 

        // LOGIC QUAN TRỌNG: Nếu đúng thì để trống, nếu sai thì hiện giải thích
        const explainText = isRight ? '' : (val.explanation || 'Chưa có giải thích');

        html += `
            <tr style="background-color: ${color};">
                <td style="padding:5px; border:1px solid #ddd;"><strong>${key.toUpperCase()}</strong></td>
                <td style="padding:5px; border:1px solid #ddd;">${val.value} ${isRight ? '✅' : '❌'}</td>
                <td style="padding:5px; border:1px solid #ddd;">${val.correctValue}</td>
                <td style="padding:5px; border:1px solid #ddd; font-style: italic; color: #db4437;">${explainText}</td>
            </tr>
        `;
    });
    html += '</tbody></table>';
    
    detailsDiv.innerHTML = html;
    detailsDiv.style.display = 'block';
};
