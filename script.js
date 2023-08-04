function startSimulation() {
    const initialAtoms = document.getElementById("initialAtoms").value;
    const intervalTime = document.getElementById("intervalTime").value;

    fetch('http://localhost:5000/simulate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            initial_atoms: parseInt(initialAtoms),
            delta_time: parseFloat(intervalTime)
        })
    })
    .then(response => response.json())
    .then(data => {
        const countdownDiv = document.getElementById('countdown');
        //countdownDiv.innerHTML = 'Simulação começando em 3 segundos.';
        let countdown = 3;
        let segundos = 'segundos';

        const countdownInterval = setInterval(() => {
            if (countdown == 1) {
                segundos = 'segundo';
            }
            countdownDiv.innerHTML = `Simulação começando em ${countdown} ${segundos}.`;
            countdown--;

            if (countdown < 0) {
                clearInterval(countdownInterval);
                countdownDiv.innerHTML = '';
                startTimer(parseFloat(intervalTime));
            }
        }, 1000);
    })
    .catch(error => console.error('Error starting simulation:', error));
}

function startTimer(intervalTime) {
    const timerDiv = document.getElementById('timer');
    timerDiv.style.display = 'block';

    fetch('http://localhost:5000/data')
    .then(response => response.json())
    .then(data => {
        let index = 0;

        const timerInterval = setInterval(() => {
            if (index >= data.length) {
                clearInterval(timerInterval);
                timerDiv.style.display = 'none';
            } else {
                document.getElementById('currentTime').innerText = data[index].time;
                document.getElementById('currentAtoms').innerText = data[index].atoms;
                index++;
            }
        }, intervalTime * 1000);
    })
    .catch(error => console.error('Error fetching data table:', error));
}
