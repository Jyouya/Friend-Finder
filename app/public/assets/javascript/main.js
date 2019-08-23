const survey = [
    new Question('Do you like to sleep in?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like sweet foods?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you prefer Summer to Winter?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like to exercise?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like to swim?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like hiking?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like road trips?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like snow?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('How physically coordinated would you say you are?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all'),
    new Question('Do you like to lead rather than follow?', 'A lot', 'A little', 'Neutral', 'Not really', 'Not at all')

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
});

$('#start-survey').click(function (event) {
    $('#survey').show();

    // $('#survey').addClass('is-active');
    $('.questions').empty();
    // $(window).animate({scrollTop: '100vh'},500);
    // $('#survey')[0].scrollIntoView({
    //     behavior: "smooth", // or "auto" or "instant"
    //     block: "start" // or "end"
    // })

    $('html').animate({ scrollTop: $('#survey').prop("scrollHeight")}, 500);
    questions = surveyGen(survey);
    askNextQuestion();
});

$('.restart').click(function (event) {
    $('#survey').hide();
});

function showResult(friend) {
    $('.modal').removeClass('is-active');
    $('#results-image').empty().append(
        $('<img class="photo">').attr('src', friend.photo)
    )
    $('#results-content').empty().append(
        $('<p class="title is-4">').text(friend.name),
    )

    // blur background, then display modal
    $('body').addClass('modal-open');
    new Promise(resolve => setTimeout(resolve, 400)).then(() => {
        $('#results').addClass('is-active');
    })

    $('#results .modal-close, #results .modal-background').one('click', function () {
        $('#results').removeClass('is-active');
        $('body').removeClass('modal-open');
    });
}


function askNextQuestion() {
    const next = questions.next().value;
    console.log(next);
    if (next) {
        $('.questions').append(next)
        $('.survey-content').scrollTop('100%');;
        $(".survey-content").animate({ scrollTop: $('.survey-content').prop("scrollHeight")}, 500);

    } else {
        $('.questions').append(
            $('<div class="field">').append(
                $('<div class="control">').append(
                    $('<button class="button is-link">')
                        .text('Submit')
                )
            )
        )
        $(".survey-content").animate({ scrollTop: $('.survey-content').prop("scrollHeight")}, 500);
    }
}