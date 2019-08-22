const survey = [
    new Question('Do you like to sleep in?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like sweet foods?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you prefer Summer to Winter?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like to exercise?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like to swim?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),


];
let questions;

function* surveyGen(questions) {
    let index = 0;
    for (let question of questions) {
        yield question.buildHTML(index);
        index++;
    }
}

$('.survey-content').submit(function (event) {
    event.preventDefault();
    $.post('./api/friends', $(this).serialize()).then(function (response) {
        console.log(response);
        showResult(response);
    });
})

$('#start-survey').click(function (event) {
    $('#survey').show();

    // $('#survey').addClass('is-active');
    $('.survey-content').empty();
    // $(window).animate({scrollTop: '100vh'},500);
    $('#survey')[0].scrollIntoView({
        behavior: "smooth", // or "auto" or "instant"
        block: "start" // or "end"
    })
    questions = surveyGen(survey);
    askNextQuestion();
})

function showResult(friend) {
    $('.modal').removeClass('is-active');
    $('#results-image').empty().append(
        $('<img class="photo">').attr('src', friend.photo)
    )
    $('#results-content').empty().append(
        $('<p class="title is-4">').text(friend.name),
    )
    $('#results').addClass('is-active');

    $('#results .modal-close, #results .modal-background').one('click', function () {
        $('#results').removeClass('is-active');
    });
}


function askNextQuestion() {
    const next = questions.next().value;
    console.log(next);
    if (next) {
        $('.survey-content').append(next)
    } else {
        $('.survey-content').append(
            $('<div class="field">').append(
                $('<div class="control">').append(
                    $('<button class="button is-link">')
                        .text('Submit')
                )
            )
        )
        $('.survey-content').animate({ scrollTop: '100%' }, 500);
    }
}