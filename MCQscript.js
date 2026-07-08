// MCQscript.js - Phiên bản Tết: Chuyên đề Thì Hiện Tại Đơn (Lớp 3)

// 🚨 CẤU HÌNH FIREBASE (Giữ nguyên của bạn) 🚨
const firebaseConfig = {
  apiKey: "AIzaSyA0Zpsobh9D4tciogJgZ_lAmA7-X42Hpsg",
  authDomain: "grade3-u1-to-u4.firebaseapp.com",
  projectId: "grade3-u1-to-u4",
  storageBucket: "grade3-u1-to-u4.firebasestorage.app",
  messagingSenderId: "540984537868",
  appId: "1:540984537868:web:7986cbfa22aeae9da9cf29",
  measurementId: "G-FQYMMG7NYF"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 🚨 NGÂN HÀNG CÂU HỎI MỚI: THÌ HIỆN TẠI ĐƠN 🚨
// 🚨 NGÂN HÀNG CÂU HỎI MỚI: THÌ HIỆN TẠI ĐƠN (LỚP 3 - KHÔNG TỪ ĐỂ HỎI) 🚨
const fullQuizData = [
    // --- DẠNG TRẮC NGHIỆM (MCQ) ---
    { id: "ps_01", tag: "Số ít", q: "She _______ her face in the morning.", options: {A: "wash", B: "washes", C: "washing"}, correct: "B", explain: "Chủ ngữ số ít 'She' nên động từ 'wash' thêm 'es'." },
    { id: "ps_02", tag: "Số nhiều", q: "They _______ with a yo-yo.", options: {A: "play", B: "plays", C: "playing"}, correct: "A", explain: "Chủ ngữ 'They' số nhiều nên động từ giữ nguyên." },
    { id: "ps_03", tag: "Động từ To Be", q: "This _______ my new schoolbag.", options: {A: "am", B: "is", C: "are"}, correct: "B", explain: "Số ít (This) đi với 'is'." },
    { id: "ps_04", tag: "Phủ định", q: "My brother _______ like robots.", options: {A: "don't", B: "doesn't", C: "not"}, correct: "B", explain: "Số ít 'My brother' dùng phủ định 'doesn't'." },
    { id: "ps_05", tag: "Động từ To Be", q: "These pencils _______ blue.", options: {A: "am", B: "is", C: "are"}, correct: "C", explain: "Số nhiều (These pencils) đi với 'are'." },
    { id: "ps_06", tag: "Sở hữu", q: "He _______ a big teddy bear.", options: {A: "has", B: "have", C: "having"}, correct: "A", explain: "He (số ít) dùng 'has'." },
    { id: "ps_07", tag: "Số nhiều", q: "We _______ to the music room.", options: {A: "go", B: "goes", C: "going"}, correct: "A", explain: "We (số nhiều) động từ giữ nguyên." },
    { id: "ps_08", tag: "Câu hỏi Yes/No", q: "_______ she like dolls?", options: {A: "Do", B: "Does", C: "Is"}, correct: "B", explain: "Câu hỏi với 'she' dùng trợ động từ 'Does'." },
    { id: "ps_09", tag: "Phủ định", q: "I _______ have a kite.", options: {A: "doesn't", B: "not", C: "don't"}, correct: "C", explain: "I dùng phủ định 'don't'." },
    { id: "ps_10", tag: "Màu sắc", q: "The leaves _______ green in spring.", options: {A: "is", B: "are", C: "am"}, correct: "B", explain: "The leaves (số nhiều) dùng 'are'." },

    // --- DẠNG SẮP XẾP CÂU (ORDERING) ---
    { id: "ps_11", tag: "Sắp xếp", q: "Sắp xếp: sister / My / has / a / doll / .", options: {A: "My sister has a doll.", B: "My has sister a doll.", C: "A doll has my sister."}, correct: "A", explain: "S + has + Object." },
    { id: "ps_12", tag: "Sắp xếp", q: "Sắp xếp: like / you / Do / ships / ?", options: {A: "Do you like ships?", B: "You do like ships?", C: "Do ships like you?"}, correct: "A", explain: "Câu hỏi: Do + S + V?" },
    { id: "ps_13", tag: "Sắp xếp", q: "Sắp xếp: is / This / my / classroom / .", options: {A: "This my is classroom.", B: "This is my classroom.", C: "My classroom is this."}, correct: "B", explain: "Giới thiệu đồ vật/nơi chốn: This is + my + N." },
    { id: "ps_14", tag: "Sắp xếp", q: "Sắp xếp: not / is / He / tall / .", options: {A: "He is not tall.", B: "He not is tall.", C: "Not he is tall."}, correct: "A", explain: "Phủ định To Be: S + is + not + Adj." },
    { id: "ps_15", tag: "Sắp xếp", q: "Sắp xếp: balls / have / They / many / .", options: {A: "Many balls they have.", B: "They many have balls.", C: "They have many balls."}, correct: "C", explain: "Chủ ngữ + động từ + tân ngữ." },

    // --- DẠNG HỘI THOẠI YES/NO (MATCHING) ---
    { id: "ps_16", tag: "Nối câu", q: "Nối: 'Is that your father?' - '_________'", options: {A: "Yes, it is.", B: "Yes, I am.", C: "Yes, he does."}, correct: "A", explain: "Hỏi với 'Is that' trả lời 'Yes, it is' hoặc 'No, it isn't'." },
    { id: "ps_17", tag: "Nối câu", q: "Nối: 'Do you have a car?' - '_________'", options: {A: "No, I don't.", B: "No, I doesn't.", C: "No, I am not."}, correct: "A", explain: "Hỏi 'Do you' trả lời 'I don't'." },
    { id: "ps_18", tag: "Nối câu", q: "Nối: 'Are they your friends?' - '_________'", options: {A: "Yes, they are.", B: "Yes, they do.", C: "Yes, it is."}, correct: "A", explain: "Hỏi 'Are they' trả lời 'they are'." },
    { id: "ps_19", tag: "Nối câu", q: "Nối: 'Does your dog like bones?' - '_________'", options: {A: "Yes, it does.", B: "Yes, it is.", C: "Yes, I do."}, correct: "A", explain: "Hỏi 'Does + vật số ít' trả lời 'it does'." },
    { id: "ps_20", tag: "Nối câu", q: "Nối: 'Is she your teacher?' - '_________'", options: {A: "No, she isn't.", B: "No, she don't.", C: "No, she is."}, correct: "A", explain: "Hỏi 'Is she' trả lời 'she isn't'." },
// --- BỔ SUNG DẠNG TRẮC NGHIỆM (MCQ) ---
    { id: "ps_21", tag: "Số nhiều", q: "The cats _______ sleeping under the tree.", options: {A: "am", B: "is", C: "are"}, correct: "C", explain: "Chủ ngữ 'The cats' là số nhiều nên dùng to be 'are'." },
    { id: "ps_22", tag: "Thói quen", q: "I _______ up at 6 o'clock every morning.", options: {A: "get", B: "gets", C: "getting"}, correct: "A", explain: "Chủ ngữ 'I' đi với động từ thường giữ nguyên 'get'." },
    { id: "ps_23", tag: "Câu hỏi To Be", q: "_______ this your pen?", options: {A: "Am", B: "Is", C: "Are"}, correct: "B", explain: "'this' là số ít nên đi với to be 'Is' đứng đầu câu." },
    { id: "ps_24", tag: "Phủ định", q: "We _______ go to school on Sunday.", options: {A: "don't", B: "doesn't", C: "aren't"}, correct: "A", explain: "Chủ ngữ 'We' (số nhiều) dùng trợ động từ phủ định 'don't'." },
    { id: "ps_25", tag: "Từ để hỏi", q: "_______ is that? - That is my mother.", options: {A: "What", B: "Who", C: "How"}, correct: "B", explain: "Câu trả lời chỉ người ('my mother') nên dùng từ để hỏi 'Who' (Ai)." },
    { id: "ps_26", tag: "Từ để hỏi", q: "_______ color is your kite?", options: {A: "What", B: "Who", C: "Where"}, correct: "A", explain: "Hỏi màu sắc dùng cụm từ 'What color'." },
    { id: "ps_27", tag: "Số ít", q: "My mother _______ dinner every evening.", options: {A: "cook", B: "cooks", C: "cooking"}, correct: "B", explain: "Chủ ngữ 'My mother' là ngôi thứ 3 số ít nên động từ 'cook' thêm 's'." },
    { id: "ps_28", tag: "Số nhiều", q: "The books _______ on the table.", options: {A: "is", B: "am", C: "are"}, correct: "C", explain: "Chủ ngữ 'The books' có 's' (số nhiều) nên dùng 'are'." },
    { id: "ps_29", tag: "Câu hỏi Yes/No", q: "_______ you like apples?", options: {A: "Do", B: "Does", C: "Are"}, correct: "A", explain: "Chủ ngữ 'you' dùng trợ động từ 'Do' để hỏi." },
    { id: "ps_30", tag: "Giới từ", q: "They play football _______ the afternoon.", options: {A: "on", B: "in", C: "at"}, correct: "B", explain: "Chỉ các buổi trong ngày (morning/afternoon/evening) dùng giới từ 'in'." },

    // --- BỔ SUNG DẠNG SẮP XẾP CÂU (ORDERING) ---
    { id: "ps_31", tag: "Sắp xếp", q: "Sắp xếp: is / book / Where / my / ?", options: {A: "Where is my book?", B: "Where my book is?", C: "My book is where?"}, correct: "A", explain: "Câu hỏi vị trí: Where + is/are + S?" },
    { id: "ps_32", tag: "Sắp xếp", q: "Sắp xếp: have / I / two / cars / .", options: {A: "I two cars have.", B: "I have two cars.", C: "Two cars have I."}, correct: "B", explain: "Chủ ngữ (I) + động từ (have) + số lượng + danh từ (two cars)." },
    { id: "ps_33", tag: "Sắp xếp", q: "Sắp xếp: name / is / What / your / ?", options: {A: "What is your name?", B: "What your name is?", C: "Your name is what?"}, correct: "A", explain: "Mẫu câu hỏi tên cơ bản: What is your name?" },
    { id: "ps_34", tag: "Sắp xếp", q: "Sắp xếp: old / How / you / are / ?", options: {A: "How you are old?", B: "How are you old?", C: "How old are you?"}, correct: "C", explain: "Cấu trúc hỏi tuổi: How old + are/is + S?" },
    { id: "ps_35", tag: "Sắp xếp", q: "Sắp xếp: not / I / like / do / cats / .", options: {A: "I do not like cats.", B: "I not do like cats.", C: "I like not do cats."}, correct: "A", explain: "Câu phủ định: S + do not (don't) + V nguyên mẫu + tân ngữ." },
    { id: "ps_36", tag: "Sắp xếp", q: "Sắp xếp: brother / is / That / my / .", options: {A: "That my is brother.", B: "That is my brother.", C: "My brother is that."}, correct: "B", explain: "Giới thiệu người ở xa: That is + my + người." },
    { id: "ps_37", tag: "Sắp xếp", q: "Sắp xếp: reading / is / He / book / a / .", options: {A: "He is a book reading.", B: "He is reading a book.", C: "He reading is a book."}, correct: "B", explain: "Thì hiện tại tiếp diễn: S + is + V-ing + Object." },
    { id: "ps_38", tag: "Sắp xếp", q: "Sắp xếp: friend / This / my / is / Mary / .", options: {A: "This is my friend Mary.", B: "This my friend is Mary.", C: "Mary is this my friend."}, correct: "A", explain: "Giới thiệu người ở gần: This is my friend + Tên." },
    { id: "ps_39", tag: "Sắp xếp", q: "Sắp xếp: color / What / your / is / bag / ?", options: {A: "What color your bag is?", B: "What is color your bag?", C: "What color is your bag?"}, correct: "C", explain: "Cấu trúc hỏi màu: What color + is/are + S?" },
    { id: "ps_40", tag: "Sắp xếp", q: "Sắp xếp: room / The / large / is / .", options: {A: "The large room is.", B: "The room is large.", C: "Is the room large."}, correct: "B", explain: "Miêu tả: S (The room) + to be (is) + Adj (large)." },

    // --- BỔ SUNG DẠNG HỘI THOẠI / NỐI CÂU (MATCHING) ---
    { id: "ps_41", tag: "Nối câu", q: "Nối: 'What's your name?' - '_________'", options: {A: "I'm ten.", B: "I'm fine.", C: "My name is Tony."}, correct: "C", explain: "Hỏi tên (name) thì trả lời 'My name is...' hoặc 'I am...'." },
    { id: "ps_42", tag: "Nối câu", q: "Nối: 'How old is she?' - '_________'", options: {A: "She is fine.", B: "She is ten.", C: "She is Mary."}, correct: "B", explain: "Hỏi tuổi (How old) thì trả lời số tuổi." },
    { id: "ps_43", tag: "Nối câu", q: "Nối: 'Where are the balls?' - '_________'", options: {A: "They are under the bed.", B: "It is on the table.", C: "Yes, they are."}, correct: "A", explain: "Hỏi vị trí số nhiều (Where are) trả lời 'They are + giới từ + nơi chốn'." },
    { id: "ps_44", tag: "Nối câu", q: "Nối: 'Is this your eraser?' - '_________'", options: {A: "Yes, it is.", B: "Yes, this is.", C: "No, it don't."}, correct: "A", explain: "Câu hỏi Yes/No với 'Is this' thường trả lời 'Yes, it is' hoặc 'No, it isn't'." },
    { id: "ps_45", tag: "Nối câu", q: "Nối: 'What color are they?' - '_________'", options: {A: "It is yellow.", B: "They are yellow.", C: "They are big."}, correct: "B", explain: "Hỏi 'What color are they' thì trả lời 'They are + màu sắc'." },
    { id: "ps_46", tag: "Nối câu", q: "Nối: 'Does he like monkeys?' - '_________'", options: {A: "No, he doesn't.", B: "No, he isn't.", C: "No, he don't."}, correct: "A", explain: "Hỏi 'Does he' thì phủ định là 'No, he doesn't'." },
    { id: "ps_47", tag: "Nối câu", q: "Nối: 'Do they have a pet?' - '_________'", options: {A: "Yes, they have.", B: "Yes, they do.", C: "Yes, they are."}, correct: "B", explain: "Câu hỏi bắt đầu bằng 'Do they' thì trả lời 'Yes, they do'." },
    { id: "ps_48", tag: "Nối câu", q: "Nối: 'Who is that?' - '_________'", options: {A: "That is my grandmother.", B: "That is a book.", C: "She is fine."}, correct: "A", explain: "Hỏi người 'Who' thì trả lời chỉ người (grandmother)." },
    { id: "ps_49", tag: "Nối câu", q: "Nối: 'May I come in?' - '_________'", options: {A: "Yes, you can.", B: "Yes, I can.", C: "Yes, it is."}, correct: "A", explain: "Xin phép 'May I...' thì đáp lại bằng 'Yes, you can' hoặc 'No, you can't'." },
    { id: "ps_50", tag: "Nối câu", q: "Nối: 'Are those your notebooks?' - '_________'", options: {A: "No, it isn't.", B: "No, those aren't.", C: "No, they aren't."}, correct: "C", explain: "Đại từ thay thế cho 'those' (số nhiều) ở câu trả lời ngắn là 'they'." }
];

// --- GIỮ NGUYÊN TOÀN BỘ LOGIC HÀM PHÍA DƯỚI ---
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor(Math.random() * i);
        temp = shuffled[i];
        shuffled[i] = shuffled[index];
        shuffled[index] = temp;
    }
    return shuffled.slice(0, size);
}

const selectedQuestions = getRandomSubarray(fullQuizData, 20);

const quizForm = document.getElementById('quizForm');
if (quizForm) {
    selectedQuestions.forEach((item, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question';
        qDiv.id = item.id;

        const pTag = document.createElement('p');
        pTag.innerText = `Câu ${index + 1}: ${item.q}`;
        qDiv.appendChild(pTag);

        for (const [key, val] of Object.entries(item.options)) {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            const label = document.createElement('label');
            label.dataset.value = key;
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = item.id;
            radio.value = key;
            
            label.appendChild(radio);
            label.appendChild(document.createTextNode(` ${key}. ${val}`));
            optionDiv.appendChild(label);
            qDiv.appendChild(optionDiv);
        }
        quizForm.appendChild(qDiv);
    });
}

// Hàm toggleMusic (giữ nguyên)
let isPlaying = false;
const audio = document.getElementById("tetAudio");
const musicBtn = document.querySelector(".music-control");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");
if(audio) audio.volume = 0.5;

function toggleMusic() {
    if (!audio) return;
    if (isPlaying) {
        audio.pause();
        musicIcon.innerText = "🔇";
        musicText.innerText = "Bật Nhạc";
        if(musicBtn) musicBtn.classList.remove("music-playing");
    } else {
        audio.play().then(() => {
            musicIcon.innerText = "💿";
            musicText.innerText = "Đang Phát";
            if(musicBtn) musicBtn.classList.add("music-playing");
        }).catch(error => alert("Lỗi nhạc."));
    }
    isPlaying = !isPlaying;
}

// Logic nộp bài (giữ nguyên)
function submitQuiz() {
    let score = 0;
    const total = selectedQuestions.length;
    let wrongTopics = new Set();
    let detailHistory = [];

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Đã Nộp Bài - Chúc Mừng Năm Mới! 🧧";
    submitBtn.style.backgroundColor = "#555";

    selectedQuestions.forEach(item => {
        const selectedOption = document.querySelector(`input[name="${item.id}"]:checked`);
        const qContainer = document.getElementById(item.id);
        
        let userAnswerKey = selectedOption ? selectedOption.value : null;
        
        // CHỈNH SỬA TẠI ĐÂY: Lấy nội dung chữ của đáp án thay vì A, B, C
        let userAnswerText = userAnswerKey ? item.options[userAnswerKey] : "Bỏ trống";
        let correctAnswerText = item.options[item.correct]; // Lấy chữ của đáp án đúng
        
        let isCorrect = userAnswerKey === item.correct;

        detailHistory.push({
            question: item.q,
            userAnswer: userAnswerText, // Lưu nội dung chữ
            correctAnswer: correctAnswerText, // Lưu nội dung chữ
            explanation: item.explain,
            isCorrect: isCorrect
        });

        if (isCorrect) {
            score++;
            if (selectedOption) selectedOption.parentElement.classList.add('correct-answer');
        } else {
            if (selectedOption) selectedOption.parentElement.classList.add('wrong-answer');
            wrongTopics.add(item.tag);
            const correctLabel = qContainer.querySelector(`label[data-value="${item.correct}"]`);
            if (correctLabel) correctLabel.classList.add('correct-answer');
            const explainDiv = document.createElement('div');
            explainDiv.style.marginTop = '10px';
            explainDiv.style.color = '#d32f2f';
            explainDiv.style.fontStyle = 'italic';
            explainDiv.innerHTML = `💡 ${item.explain}`;
            qContainer.appendChild(explainDiv);
        }
        qContainer.querySelectorAll('input').forEach(r => r.disabled = true);
    });

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    let message = score >= total * 0.8 ? "Tuyệt vời! Nhận lì xì thôi! 🧧" : "Cố gắng hơn nhé! 💪";
    let improveHtml = wrongTopics.size > 0 ? `<br><strong>Cần ôn lại:</strong> ${Array.from(wrongTopics).join(", ")}` : "";
    resultDiv.innerHTML = `<h3>Kết quả: ${score}/${total}</h3><p>${message}</p>${improveHtml}`;

    saveToFirebase(score, total, detailHistory);
}

// Firebase và Lịch sử (giữ nguyên)
function saveToFirebase(score, total, details) {
    if (typeof db === 'undefined') return;
    let nameInput = document.getElementById("studentName");
    let name = (nameInput && nameInput.value.trim() !== "") ? nameInput.value : "Bạn Giấu Tên";
    db.collection("exam_history").add({
        name: name,
        score: score,
        total: total,
        topic: "Tet_Grade3_Final",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        details: details
    })
    .then(() => { loadHistory(); })
    .catch((error) => console.error("Lỗi lưu:", error));
}

let globalHistoryData = [];
function loadHistory() {
    const historyList = document.getElementById('history-list');
    if(!historyList) return;
    historyList.innerHTML = "⏳ Đang tải...";
    if (typeof db === 'undefined') return;
    db.collection("exam_history")
        .limit(50)
        .get()
        .then((querySnapshot) => {
            let exams = [];
            querySnapshot.forEach((doc) => { exams.push(doc.data()); });
            exams = exams.filter(item => item.topic === "Tet_Grade3_Final");
            exams.sort((a, b) => {
                let tA = a.timestamp ? a.timestamp.seconds : 0;
                let tB = b.timestamp ? b.timestamp.seconds : 0;
                return tB - tA;
            });
            exams = exams.slice(0, 10);
            globalHistoryData = exams;
            let html = '<ul style="list-style: none; padding: 0;">';
            if (exams.length === 0) {
                html += '<li style="padding:10px;">Chưa có bài làm nào.</li>';
            } else {
                exams.forEach((data, index) => {
                    let timeString = "---";
                    if (data.timestamp) {
                        const date = data.timestamp.toDate();
                        timeString = `${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')} - ${date.getDate()}/${date.getMonth()+1}`;
                    }
                    const isMax = data.score === data.total;
                    const icon = isMax ? '🏆' : '📝';
                    html += `<li style="border-bottom: 1px dashed #ef9a9a; padding: 8px 0; display: flex; justify-content: space-between; align-items: center;">
                        <div><span>${icon} <strong>${data.name}</strong></span><br><small style="color:#777;">${timeString}</small></div>
                        <div style="text-align: right;"><span style="font-weight: bold; font-size: 1.1em; color: ${isMax ? '#d32f2f' : '#333'}">${data.score}/${data.total}</span><br>
                        <button class="btn-view-detail" onclick="viewHistoryDetail(${index})">Xem lại</button></div></li>`;
                });
            }
            html += '</ul>';
            historyList.innerHTML = html;
        });
}

function viewHistoryDetail(index) {
    const data = globalHistoryData[index];
    if (!data || !data.details) {
        alert("Dữ liệu chi tiết không tồn tại!");
        return;
    }

    const modal = document.getElementById("historyModal");
    const modalBody = document.getElementById("modalBody");
    
    let html = `
        <div style="margin-bottom: 15px; background: #fffde7; padding: 10px; border-radius: 8px; border-left: 5px solid #d32f2f;">
            <strong>Học sinh:</strong> ${data.name} <br>
            <strong>Thời gian:</strong> ${data.timestamp ? data.timestamp.toDate().toLocaleString('vi-VN') : '---'}
        </div>
        <div class="table-responsive">
            <table class="detail-table">
                <thead>
                    <tr>
                        <th style="width: 35%;">Câu hỏi</th>
                        <th style="width: 20%;">Bạn chọn</th>
                        <th style="width: 20%;">Câu đúng</th>
                        <th style="width: 25%;">Giải thích</th>
                    </tr>
                </thead>
                <tbody>
    `;

    data.details.forEach((item, idx) => {
        const rowClass = item.isCorrect ? 'row-correct' : 'row-wrong';
        const statusIcon = item.isCorrect ? '<span style="color:green">✅</span>' : '<span style="color:red">❌</span>';
        
        // Hiện nội dung giải thích (chỉ hiển thị chi tiết khi chọn sai)
        const explanationContent = item.isCorrect 
            ? '<span style="color:#2e7d32; font-weight:bold;">Chính xác!</span>' 
            : `<span style="color:#d32f2f;">${item.explanation}</span>`;

        html += `
            <tr class="${rowClass}">
                <td style="font-weight:500;">Câu ${idx + 1}: ${item.question}</td>
                <td style="text-align:center;">${item.userAnswer} ${statusIcon}</td>
                <td style="text-align:center; font-weight:bold; color:#1b5e20;">${item.correctAnswer}</td>
                <td style="font-size: 0.9em; font-style: italic;">${explanationContent}</td>
            </tr>
        `;
    });

    // Tính toán kết luận dựa trên phần trăm điểm
    const percentage = Math.round((data.score / data.total) * 100);
    let rank = "";
    let color = "";
    
    if (percentage === 100) { rank = "Xuất sắc! Hoàn hảo 🏆"; color = "#d32f2f"; }
    else if (percentage >= 80) { rank = "Giỏi quá! Tiếp tục phát huy nhé 🌟"; color = "#2e7d32"; }
    else if (percentage >= 50) { rank = "Khá tốt! Cần cẩn thận hơn một chút 💪"; color = "#f57c00"; }
    else { rank = "Cần cố gắng nhiều hơn nữa em nhé! 📚"; color = "#5d4037"; }

    html += `
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #fdf2f2; border: 2px dashed #d32f2f; border-radius: 10px; text-align: center;">
            <h3 style="margin: 0; color: ${color};">
                KẾT LUẬN: ${data.score}/${data.total} điểm (${percentage}%) - ${rank}
            </h3>
        </div>
    `;

    modalBody.innerHTML = html;
    modal.style.display = "block";
}

function closeModal() { document.getElementById("historyModal").style.display = "none"; }
window.onclick = function(event) { if (event.target == document.getElementById("historyModal")) closeModal(); }

loadHistory();