function toggleForm(answerId, formId) {
    const answerSection = document.getElementById(answerId);
    const formSection = document.getElementById(formId);

    // Nasconde la sezione del messaggio e mostra il form
    if (answerSection && formSection) {
        answerSection.style.display = "none";
        formSection.style.display = "block";
    }
}
