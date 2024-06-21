document.addEventListener('DOMContentLoaded', () => {
    loadWorries();
    updateCounts();

    const worryInput = document.getElementById('worryInput');
    worryInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addWorry();
        }
    });
});


function loadWorries() {
    const worries = JSON.parse(Cookies.get('worries') || '[]');
    worries.forEach(worry => {
        if (!worry.status) {
            createWorryCard(worry.text);
        }
    });
}

function addWorry() {
    const worryInput = document.getElementById('worryInput');
    const worryText = worryInput.value.trim();
    if (worryText) {
        createWorryCard(worryText);
        saveWorry(worryText, null);
        worryInput.value = '';
    }
}

function createWorryCard(worryText) {
    const worryCards = document.getElementById('worryCards');
    const card = document.createElement('div');
    card.className = 'card mt-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = worryText;

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    const goodBtn = document.createElement('button');
    goodBtn.className = 'btn btn-success';
    goodBtn.textContent = 'Good';
    goodBtn.onclick = () => rankWorry(card, 'good');

    const okBtn = document.createElement('button');
    okBtn.className = 'btn btn-warning';
    okBtn.textContent = 'OK';
    okBtn.onclick = () => rankWorry(card, 'ok');

    const badBtn = document.createElement('button');
    badBtn.className = 'btn btn-danger';
    badBtn.textContent = 'Bad';
    badBtn.onclick = () => rankWorry(card, 'bad');

    btnGroup.appendChild(goodBtn);
    btnGroup.appendChild(okBtn);
    btnGroup.appendChild(badBtn);

    cardBody.appendChild(cardText);
    cardBody.appendChild(btnGroup);
    card.appendChild(cardBody);
    worryCards.appendChild(card);
}

function saveWorry(worryText, status) {
    const worries = JSON.parse(Cookies.get('worries') || '[]');
    worries.push({ text: worryText, status: status });
    Cookies.set('worries', JSON.stringify(worries));
}

function rankWorry(card, status) {
    const worryText = card.querySelector('.card-text').textContent;
    let worries = JSON.parse(Cookies.get('worries') || '[]');
    let pastWorries = JSON.parse(Cookies.get('pastWorries') || '[]');
    for (let worry of worries) {
        if (worry.text === worryText && worry.status === null) {
            worry.status = status;
            pastWorries.push({ text: worryText, status: status });
            break;
        }
    }
    Cookies.set('worries', JSON.stringify(worries));
    Cookies.set('pastWorries', JSON.stringify(pastWorries));
    card.remove();
    updateCounts();
}

function updateCounts() {
    const worries = JSON.parse(Cookies.get('worries') || '[]');
    let goodCount = 0;
    let okCount = 0;
    let badCount = 0;
    let totalCount = 0;

    worries.forEach(worry => {
        if (worry.status === 'good') goodCount++;
        if (worry.status === 'ok') okCount++;
        if (worry.status === 'bad') badCount++;
        if (worry.status) totalCount++;
    });

    document.getElementById('goodCount').textContent = `Good: ${goodCount}`;
    document.getElementById('okCount').textContent = `OK: ${okCount}`;
    document.getElementById('badCount').textContent = `Bad: ${badCount}`;

    const goodPercentage = totalCount > 0 ? (goodCount / totalCount * 100).toFixed(2) : 0;
    const okPercentage = totalCount > 0 ? (okCount / totalCount * 100).toFixed(2) : 0;
    const badPercentage = totalCount > 0 ? (badCount / totalCount * 100).toFixed(2) : 0;

    document.getElementById('goodPercentage').textContent = `(${goodPercentage}%)`;
    document.getElementById('okPercentage').textContent = `(${okPercentage}%)`;
    document.getElementById('badPercentage').textContent = `(${badPercentage}%)`;
}

function goToPastWorries() {
    window.location.href = 'past-worries.html';
}