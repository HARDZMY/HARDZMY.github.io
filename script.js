// Dynamic - Working Role [Typing Effect]
const roles = ["Developer", "Programmer", "System Engineer", "System Analyst"];
    const element = document.getElementById("dynamic-role");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            charIndex--;
            element.textContent = currentRole.substring(0, charIndex);
        } else {
            charIndex++;
            element.textContent = currentRole.substring(0, charIndex);
        }

        let typeSpeed = isDeleting ? 80 : 150;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 1000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

// Years of Experience
document.addEventListener('DOMContentLoaded', function (){
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - startYear;
    document.getElementById("years").textContent = yearsOfExperience;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation Bar Active Page
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            navLinks.forEach(link => link.classList.remove('clicked'));
            link.classList.add('clicked');
            link.classList.add('active');

            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Section Pop-Up & Pop-In Transition Animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const imageItems = document.querySelectorAll('.image-item');
    const standardv2Items = document.querySelectorAll('.standardv2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible', 'image-item-visible', 'standardv2-visible');
                entry.target.classList.remove('section-hidden', 'image-item-hidden', 'standardv2-hidden');
            } else {
                entry.target.classList.add('section-hidden', 'image-item-hidden', 'standardv2-hidden');
                entry.target.classList.remove('section-visible', 'image-item-visible', 'standardv2-visible');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });

    imageItems.forEach(item => {
        item.classList.add('image-item-hidden');
        observer.observe(item);
    });

    standardv2Items.forEach(item => {
        item.classList.add('standardv2-hidden');
        observer.observe(item);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    function showModal() {
        const modalElement = document.querySelector('.modal');
        modalElement.classList.add('modal-visible');
    }

    function hideModal() {
        const modalElement = document.querySelector('.modal');
        modalElement.classList.remove('modal-visible');
        
        setTimeout(() => {
            modalElement.style.display = 'none';
        }, 200);
    }

    document.querySelector('.open-modal-button').addEventListener('click', function() {
        const modalElement = document.querySelector('.modal');
        modalElement.style.display = 'flex';
        showModal();
    });

    document.querySelector('.close-modal-button').addEventListener('click', hideModal);
    document.querySelector('.modal').addEventListener('click', function(event) {
        if (event.target === this) {
            hideModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('DOMContentLoaded', function () {
        function showSkills() {
            const skillsElement = document.querySelector('.skills');
            skillsElement.style.display = 'flex';
            requestAnimationFrame(() => {
                skillsElement.classList.remove('skills-hidden');
                skillsElement.classList.add('skills-visible');
            });
        }
    
        function hideSkills() {
            const skillsElement = document.querySelector('.skills');
            skillsElement.classList.remove('skills-visible');
            skillsElement.classList.add('skills-hidden');

            setTimeout(() => {
                skillsElement.style.display = 'none';
            }, 200);
        }
    
        document.querySelector('.show-skills-button').addEventListener('click', showSkills);
    
        document.querySelector('.hide-skills-button').addEventListener('click', hideSkills);
    });
});

// Tic-Tac-Toe
document.addEventListener('DOMContentLoaded', () => {
    const tics = document.querySelectorAll('.tic');
    const restartButton = document.getElementById('restart-button');
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill(null);
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    tics.forEach(tic => {
        tic.addEventListener('click', handleTicClick);
    });

    restartButton.addEventListener('click', restartGame);

    function handleTicClick(event) {
        const ticIndex = event.target.getAttribute('data-index');

        if (gameBoard[ticIndex] || !gameActive) {
            return;
        }

        gameBoard[ticIndex] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            endGame(`${currentPlayer} wins!`);
        } else if (gameBoard.every(tic => tic)) {
            endGame("It's a tie!");
        } else {
            switchPlayer();
            if (currentPlayer === 'O') {
                setTimeout(botMove, 200);
            }
        }
    }

    function botMove() {
        const bestMove = findBestMove();
        gameBoard[bestMove] = 'O';
        tics[bestMove].textContent = 'O';

        if (checkWin('O')) {
            endGame('You lose! &#128541;');
        } else if (gameBoard.every(tic => tic)) {
            endGame("It's a tie!");
        } else {
            switchPlayer();
        }
    }

    function findBestMove() {
        let bestScore = -Infinity;
        let move;

        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i] === null) {
                gameBoard[i] = 'O';
                let score = minimax(gameBoard, 0, false);
                gameBoard[i] = null;

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        let scores = {
            'X': -1,
            'O': 1,
            'tie': 0
        };

        let result = checkWin('O') ? 'O' : checkWin('X') ? 'X' : board.every(tic => tic) ? 'tie' : null;
        if (result !== null) {
            return scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard[index] === player;
            });
        });
    }

    function endGame(message) {
        gameActive = false;
        setTimeout(() => {
            Swal.fire({
                title: message,
                icon: message.includes("wins") ? "success" : "info",
                confirmButtonText: 'Ok',
                allowOutsideClick: false,
                customClass: {
                    popup: 'swal-tic'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    restartGame();
                }
            });
        }, 100);
    }

    function restartGame() {
        gameBoard = Array(9).fill(null);
        tics.forEach(tic => tic.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
    }
});

// Whack-a-Mole
document.addEventListener('DOMContentLoaded', function (){
    const board = document.getElementById('whack');
    const scoreDisplay = document.getElementById('score-value');
    const startButton = document.getElementById('start-button');
    let score = 0;
    const totalMoles = 15; // Total number of moles that will appear
    let molesClicked = 0;
    let moles = [];
    let activeMoleIndex = -1;
    const moleDuration = 900; // Time a mole stays up in milliseconds
    const moleInterval = 1100; // Time between moles appearing in milliseconds
    let gameInterval;
    let moleCount = 0;

    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.classList.add('hole');
        board.appendChild(hole);

        const mole = document.createElement('div');
        mole.classList.add('mole');
        hole.appendChild(mole);
        moles.push(mole);

        hole.addEventListener('click', () => {
            if (moles.indexOf(mole) === activeMoleIndex) {
                score++;
                molesClicked++;
                updateScore();
                mole.style.display = 'none';
                activeMoleIndex = -1;
            }
        });
    }

    function updateScore() {
        scoreDisplay.textContent = `${molesClicked} out of ${totalMoles}`;
    }

    function showMole() {
        if (moleCount >= totalMoles) {
            endGame();
            return;
        }

        if (activeMoleIndex >= 0) {
            moles[activeMoleIndex].style.display = 'none';
        }

        activeMoleIndex = Math.floor(Math.random() * moles.length);
        moles[activeMoleIndex].style.display = 'block';

        setTimeout(() => {
            if (moles[activeMoleIndex].style.display === 'block') {
                moles[activeMoleIndex].style.display = 'none';
                activeMoleIndex = -1;
            }
        }, moleDuration);

        moleCount++;
    }

    function startGame() {
        score = 0;
        molesClicked = 0;
        moleCount = 0;
        updateScore();
        gameInterval = setInterval(showMole, moleInterval);
        startButton.disabled = true;
    }

    function endGame() {
        clearInterval(gameInterval);
        startButton.disabled = false;

        if (molesClicked === totalMoles) {
            Swal.fire({
                title: 'You Won!',
                text: `You clicked all ${totalMoles} dots.`,
                icon: 'success',
                confirmButtonText: 'Ok',
                allowOutsideClick: false,
                customClass: {
                    popup: 'swal-whack'
                }
            });
        } else {
            Swal.fire({
                title: 'Game Over!',
                text: `You clicked ${molesClicked} out of ${totalMoles} dots.`,
                icon: 'error',
                confirmButtonText: 'Ok',
                allowOutsideClick: false,
                customClass: {
                    popup: 'swal-whack2'
                }
            });
        }
    }

    startButton.addEventListener('click', startGame);
});

// Go-To Top Button
document.addEventListener('DOMContentLoaded', function () {
    var goToTopBtn = document.getElementById('goToTopBtn');

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            goToTopBtn.style.display = 'block';
        } else {
            goToTopBtn.style.display = 'none';
        }
    });

    goToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Footer
var currentYear = new Date().getFullYear();
var yearText = currentYear + " | All rights reserved | HARDZMY ";
var rocketGif = '<img src="resources/rocket.gif" alt="rocket" style="vertical-align: middle; width: 22px; height: 22px;">';
document.getElementById("currentYear").innerHTML = yearText + rocketGif;