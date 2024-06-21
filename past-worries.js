document.addEventListener('DOMContentLoaded', () => {
    loadPastWorries();
});

function loadPastWorries() {
    const pastWorries = JSON.parse(Cookies.get('pastWorries') || '[]');
    const pastWorriesList = document.getElementById('pastWorriesList');
    pastWorriesList.innerHTML = '';

    pastWorries.reverse().forEach((worry, index) => {
        const worryElement = document.createElement('div');
        worryElement.className = 'poem-line';
        worryElement.innerHTML = `Did I get cooked by <strong>${worry.text}</strong>?`;
        pastWorriesList.appendChild(worryElement);
    });
}

function goBack() {
    window.location.href = 'index.html';
}

function clearPastWorries() {
    Cookies.remove('pastWorries');
    loadPastWorries();
}
