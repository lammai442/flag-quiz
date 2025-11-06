const playBtnRef = document.querySelector('.welcome__play-btn');
playBtnRef.addEventListener('click', () => {
    const welcomeSectionRef = document.querySelector('#welcomeBox');
    const gamefieldRef = document.querySelector('#gamefield');
    welcomeSectionRef.classList.add('d-none');
    gamefieldRef.classList.toggle('d-none');
});
//# sourceMappingURL=index.js.map