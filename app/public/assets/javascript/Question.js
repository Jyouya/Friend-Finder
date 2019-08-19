class Question {
    constructor(question, ...options) {
        this.question = question;
        this.options = options;
    }

    buildHTML() {
        const dropdown = $('<div class="field is-horizontal">').append(
            $('<div class="control">').append(
                $('<select>').append(
                    $('<option value="" selected disabled hidden>').text('Choose an option...'),
                    ...this.options.map((option, index) => $('<option>').text(option).val(index))
                )
            )
        )

        dropdown.one('change', askNextQuestion);

        return $('<div class="question">').append(
            $('<p>').text(this.question),
            dropdown
        )
    }
}