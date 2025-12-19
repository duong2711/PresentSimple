// MCQscript.js
// PHIÊN BẢN HOÀN THIỆN: 66 câu tổng, random 20 câu, lưu và hiển thị nội dung đáp án chi tiết (có HTML).

// 🚨 BƯỚC 1: CẤU HÌNH FIREBASE 🚨
// Đảm bảo các giá trị này là chính xác
const firebaseConfig = {
  apiKey: "AIzaSyDKRribCxrXMpJcTYBdwe-7zZ8bZWlReLc",
  authDomain: "eaching1.firebaseapp.com",
  projectId: "eaching1",
  storageBucket: "eaching1.firebasestorage.app",
  messagingSenderId: "433194073623",
  appId: "1:433194073623:web:9165dd7ce0a129d5e32652",
  measurementId: "G-685W8RSP1Y"
};

// Khởi tạo Firebase và Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Đáp án chính xác cho TẤT CẢ 66 câu hỏi
// Thay thế đoạn correctAnswers cũ bằng đoạn này:

const correctAnswers = {
    // PHẦN 1: Chia động từ (q1-q20)
    q1: 'B', q2: 'B', q3: 'B', q4: 'A', q5: 'C', 
    q6: 'A', q7: 'B', q8: 'A', q9: 'C', q10: 'C', 
    q11: 'B', q12: 'A', q13: 'A', q14: 'B', q15: 'B', 
    q16: 'C', q17: 'B', q18: 'A', q19: 'B', q20: 'B',

    // PHẦN 2: Sắp xếp câu (q21-q40)
    q21: 'B', q22: 'A', q23: 'A', q24: 'B', q25: 'C',
    q26: 'A', q27: 'A', q28: 'B', q29: 'B', q30: 'A',
    q31: 'A', q32: 'A', q33: 'B', q34: 'B', q35: 'A',
    q36: 'C', q37: 'A', q38: 'A', q39: 'B', q40: 'A',

    // PHẦN 3: Chọn dạng đúng (q41-q60)
    q41: 'B', q42: 'B', q43: 'A', q44: 'B', q45: 'B',
    q46: 'A', q47: 'B', q48: 'A', q49: 'B', q50: 'B',
    q51: 'A', q52: 'B', q53: 'A', q54: 'A', q55: 'B',
    q56: 'A', q57: 'A', q58: 'B', q59: 'A', q60: 'B',

    // PHẦN 4: Điền từ phủ định (q61-q80)
    q61: 'B', q62: 'A', q63: 'B', q64: 'A', q65: 'B',
    q66: 'A', q67: 'B', q68: 'A', q69: 'B', q70: 'A',
    q71: 'B', q72: 'A', q73: 'B', q74: 'A', q75: 'B',
    q76: 'A', q77: 'B', q78: 'A', q79: 'B', q80: 'A'
};

// ... Các phần code khác giữ nguyên ...

const MAX_QUESTIONS = Object.keys(correctAnswers).length; // Tổng số câu hỏi hiện có (66)
const QUESTIONS_TO_PICK = 20; // Số câu hỏi muốn lấy ngẫu nhiên

let currentQuizQuestions = []; // Lưu trữ ID của 20 câu hỏi được chọn ngẫu nhiên
const questionContainer = document.getElementById('quizForm');
let isSubmitted = false;

// --- LOGIC CHỌN NGẪU NHIÊN VÀ RENDER QUIZ ---

function shuffleAndPickQuestions(max, pick) {
    const allKeys = Object.keys(correctAnswers);
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

    const quizContentDiv = document.createElement('div'); 
    quizContentDiv.id = 'currentQuizContent';

    const originalContainer = document.getElementById('originalQuestionsContainer');

    currentQuizQuestions.forEach((qId, index) => {
        const originalQuestion = originalContainer.querySelector(`#${qId}`);
        
        if (originalQuestion) {
            const newQuestion = originalQuestion.cloneNode(true);
            
            const pElement = newQuestion.querySelector('p');
            if (pElement) {
                const content = pElement.innerHTML.substring(pElement.innerHTML.indexOf('.') + 1).trim();
                pElement.innerHTML = `${index + 1}. ${content}`;
            }

            const radioInputs = newQuestion.querySelectorAll('input[type="radio"]');
            radioInputs.forEach(input => {
                input.name = qId; 
                input.checked = false;
            });
            
            quizContentDiv.appendChild(newQuestion);
        }
    });

    questionContainer.appendChild(quizContentDiv);

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.id = 'submitBtn';
    submitButton.innerText = 'Nộp Bài & Lưu Lịch Sử';
    submitButton.addEventListener('click', submitQuiz);
    questionContainer.appendChild(submitButton);

    document.getElementById('result').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    renderQuiz();
});

// --- LOGIC CHẤM ĐIỂM VÀ LƯU TRỮ ---

function submitQuiz() {
    if (isSubmitted) return; 

    let score = 0;
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    const questions = form.querySelectorAll('#currentQuizContent .question'); 
    let answeredCount = 0;
    let firstUnansweredQuestion = null;
    let userAnswers = {}; // Lưu trữ chi tiết nội dung đáp án

    questions.forEach(question => {
        const name = question.id; 
        const selectedInput = question.querySelector('input[name="' + name + '"]:checked');
        const selectedOptionValue = selectedInput ? selectedInput.value : null; // A, B, C, D
        
        // Reset
        question.style.borderLeftColor = '#4285f4'; 
        question.classList.remove('submitted'); 
        question.querySelectorAll('label').forEach(label => {
            label.classList.remove('correct-answer', 'wrong-answer');
        });

        if (selectedOptionValue) {
            answeredCount++;
            
            // Lấy nội dung HTML của đáp án người dùng chọn
            const userLabel = question.querySelector(`label[data-value="${selectedOptionValue}"]`);
            // Lấy innerHTML, sau đó loại bỏ thẻ <input> để chỉ giữ lại nội dung hiển thị
            let userContentHTML = userLabel ? userLabel.innerHTML : `[Không tìm thấy nội dung cho: ${selectedOptionValue}]`;
            userContentHTML = userContentHTML.replace(/<input.*?>/, '').trim(); // Loại bỏ thẻ input radio

            // Lấy nội dung HTML của đáp án đúng
            const correctAnswerValue = correctAnswers[name];
            const correctLabel = question.querySelector(`label[data-value="${correctAnswerValue}"]`);
            let correctContentHTML = correctLabel ? correctLabel.innerHTML : `[Không tìm thấy nội dung cho: ${correctAnswerValue}]`;
            correctContentHTML = correctContentHTML.replace(/<input.*?>/, '').trim(); // Loại bỏ thẻ input radio
            
            // LƯU TRỮ CHI TIẾT ĐẦY ĐỦ VÀ CẢ HTML CONTENT
            userAnswers[name] = {
                value: selectedOptionValue,
                content: userContentHTML, // LƯU HTML CONTENT
                correctValue: correctAnswerValue,
                correctContent: correctContentHTML // LƯU HTML CONTENT
            };

        } else {
            if (!firstUnansweredQuestion) {
                firstUnansweredQuestion = question;
            }
        }
    });
    
    if (answeredCount < QUESTIONS_TO_PICK) {
        firstUnansweredQuestion.style.borderLeftColor = '#f4b400';
        firstUnansweredQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const questionIndex = Array.from(questions).indexOf(firstUnansweredQuestion) + 1;
        resultDiv.innerHTML = `<span style="color: #db4437;">Vui lòng trả lời hết ${QUESTIONS_TO_PICK} câu hỏi. Câu ${questionIndex} chưa được trả lời.</span>`;
        resultDiv.style.display = 'block';
        return;
    }

    // 3. CHẤM ĐIỂM (Sử dụng Value A, B, C, D)
    isSubmitted = true;
    questions.forEach(question => {
        question.classList.add('submitted');
        const name = question.id;
        const selectedOptionValue = userAnswers[name].value;
        const correctAnswer = correctAnswers[name];

        if (selectedOptionValue === correctAnswer) {
            score++;
            question.style.borderLeftColor = '#0f9d58'; // Đúng -> Xanh lá
        } else {
            question.style.borderLeftColor = '#db4437'; // Sai -> Đỏ
        }

        // Hiển thị đáp án (Highlight)
        question.querySelectorAll('label').forEach(label => {
            const optionValue = label.getAttribute('data-value');
            if (optionValue === correctAnswer) {
                label.classList.add('correct-answer'); // Đáp án ĐÚNG
            }
            if (optionValue === selectedOptionValue && selectedOptionValue !== correctAnswer) {
                label.classList.add('wrong-answer'); // Câu trả lời SAI của người dùng
            }
        });
    });

    // 4. HIỂN THỊ KẾT QUẢ VÀ LƯU FIREBASE
    displayResult(score, QUESTIONS_TO_PICK);
    saveScoreToFirebase(score, userAnswers); 
}


function displayResult(score, total) {
    const resultDiv = document.getElementById('result');
    const submitButton = document.getElementById('submitBtn');

    submitButton.disabled = true;
    submitButton.innerText = 'Đã nộp bài';

    const percentage = (score / total) * 100;
    let resultText = `Bạn đã hoàn thành bài kiểm tra! <br>`;
    resultText += `Điểm của bạn: <span style="font-size: 1.5em; color: ${percentage >= 60 ? '#0f9d58' : '#db4437'};">${score}/${total}</span> (${percentage.toFixed(0)}%)`;

    resultDiv.innerHTML = resultText;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    const retryButton = document.createElement('button');
    retryButton.innerText = 'Làm Bài Mới (Ngẫu Nhiên)';
    retryButton.style.backgroundColor = '#4285f4';
    retryButton.style.marginTop = '10px';
    retryButton.addEventListener('click', () => {
        resultDiv.style.display = 'none';
        renderQuiz();
    });
    resultDiv.appendChild(retryButton);
}


// --- FIREBASE FUNCTIONS ---

/**
 * Lưu kết quả làm bài vào Firestore.
 * @param {number} score - Điểm số đạt được.
 * @param {object} userAnswers - Câu trả lời của người dùng (chứa content và value).
 */
function saveScoreToFirebase(score, userAnswers) {
    // LƯU TRỮ CHI TIẾT ĐẦY ĐỦ
    const submittedAnswers = {};
    Object.keys(userAnswers).forEach(qId => {
        submittedAnswers[qId] = {
            userValue: userAnswers[qId].value,
            userContent: userAnswers[qId].content, // LƯU NỘI DUNG HTML
            correctValue: userAnswers[qId].correctValue,
            correctContent: userAnswers[qId].correctContent, // LƯU NỘI DUNG HTML
        };
    });

    db.collection("quiz_scores").add({
        score: score,
        total: QUESTIONS_TO_PICK,
        answers: submittedAnswers,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log("Lịch sử làm bài đã được lưu với ID: ", docRef.id);
        loadHistory();
    })
    .catch((error) => {
        console.error("Lỗi khi lưu lịch sử: ", error);
        alert("Lỗi khi lưu lịch sử làm bài vào Firebase!");
    });
}

/**
 * Tải và hiển thị lịch sử làm bài từ Firestore.
 */
function loadHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '<p>Đang tải lịch sử...</p>';

    db.collection("quiz_scores")
        .orderBy("timestamp", "desc")
        .limit(5)
        .get()
        .then((querySnapshot) => {
            historyList.innerHTML = '';
            if (querySnapshot.empty) {
                historyList.innerHTML = '<p>Chưa có lịch sử làm bài nào được lưu.</p>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const date = data.timestamp ? data.timestamp.toDate().toLocaleString('vi-VN') : 'Không rõ ngày';
                
                const item = document.createElement('div');
                item.className = 'history-item';
                
                item.innerHTML = `
                    <p>Ngày làm bài: ${date}</p>
                    <p>Điểm: <span class="score-display">${data.score} / ${data.total}</span></p>
                    <button class="view-details-btn" data-id="${doc.id}">Xem chi tiết</button>
                    <div id="details-${doc.id}" class="details-content" style="display:none;"></div>
                `;
                
                historyList.appendChild(item);
                
                item.querySelector('.view-details-btn').addEventListener('click', function() {
                    toggleDetails(doc.id, data.answers);
                });
            });
        })
        .catch((error) => {
            console.error("Lỗi khi tải lịch sử: ", error);
            historyList.innerHTML = '<p style="color:red;">Lỗi tải lịch sử! Vui lòng kiểm tra console.</p>';
        });
}

/**
 * Hàm hiển thị/ẩn chi tiết câu trả lời.
 */
function toggleDetails(docId, answers) {
    const detailsDiv = document.getElementById(`details-${docId}`);
    const button = document.querySelector(`.view-details-btn[data-id="${docId}"]`);

    if (detailsDiv.style.display === 'block') {
        detailsDiv.style.display = 'none';
        button.innerText = 'Xem chi tiết';
        return;
    }

    let tableHtml = `
        <table style="width:100%; margin-top: 10px; border-collapse: collapse; font-size: 0.9em;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #ddd; padding: 8px; width: 5%;">Câu</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Đáp án bạn chọn</th>
                    <th style="border: 1px solid #ddd; padding: 8px; color: #0f9d58;">Đáp án đúng</th>
                    <th style="border: 1px solid #ddd; padding: 8px; width: 10%;">Kết quả</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    const sortedQIds = Object.keys(answers).sort((a, b) => {
        return parseInt(a.substring(1)) - parseInt(b.substring(1));
    });

    sortedQIds.forEach(qId => {
        const answerData = answers[qId];
        // So sánh bằng userValue và correctValue (A, B, C, D)
        const isCorrect = answerData.userValue === answerData.correctValue;
        const status = isCorrect ? 'Đúng' : 'Sai';
        const rowColor = isCorrect ? '#e6ffe6' : '#ffe6e6';
        
        // HIỂN THỊ NỘI DUNG HTML (giữ định dạng gạch chân/tô đậm)
        tableHtml += `
            <tr style="background-color: ${rowColor};">
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">${qId}</td>
                <td style="border: 1px solid #ddd; padding: 8px; color: ${isCorrect ? '#0f9d58' : '#db4437'};">${answerData.userContent}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${answerData.correctContent}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${status}</td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table>`;
    detailsDiv.innerHTML = tableHtml;
    detailsDiv.style.display = 'block';
    button.innerText = 'Ẩn chi tiết';
}