$(document).ready(function() {
    // Gestione del submit del form
    $('.write-message').on('submit', function(event) {
        event.preventDefault(); // Impedisce il refresh della pagina

        const formData = $(this).serialize(); // Recupera i dati del form

        $.ajax({
            url: '/chat',
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response.status === 'success') {
                    // Aggiorna la lista delle domande con la nuova domanda
                    const newQuestion = `
                        <li class="question-item">
                            ${response.question.content} (${response.question.answered ? 'Answered' : 'Pending'})
                        </li>`;
                    $('.question-block').append(newQuestion);

                    // Resetta il contenuto del textarea
                    $('textarea[name="content"]').val('');
                } else {
                    alert(response.message);
                }
            },
            error: function(xhr) {
                const response = JSON.parse(xhr.responseText);
                alert(response.message);
            }
        });
    });
});