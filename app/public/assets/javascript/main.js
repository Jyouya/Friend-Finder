const survey = [
    new Question('test question 1', 'answer 1', 'answer 2', 'answer 3', 'answer 4'),
    new Question('test question 2', 'answer 5', 'answer 6',' answer 7', 'answer 8')
];
let questions;

function* surveyGen(questions) {
    for (let question of questions) {
        yield question.buildHTML();
    }
}

$('#survey-content').submit(function (event) {
    event.preventDefault();
    $.post('./api/friends', $(this).serialize()).then(function (response) {

    });
})

$('#start-survey').click(function (event) {
    $('#survey').toggle('is-active');
    $('#survey-content').empty();
    questions = surveyGen(survey);
    askNextQuestion();
})

$('#survey').on('click', '.modal-close, .modal-background', function (event) {
    console.log('debug');
    $('#survey').toggle('is-active');
});


function askNextQuestion() {
    const next = questions.next().value;
    console.log(next);
    if (next) {
        $('#survey-content').append(next)
    } else {
        $('#survey-content').append(
            $('<div class="field">').append(
                $('<div class="control">').append(
                    $('<button class="button is-link">')
                        .text('Submit')
                )
            )
        )
        $('#survey-content').scrollTop('100%');
    }
}