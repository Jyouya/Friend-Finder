class Question {
    constructor(question, ...options) {
        this.question = question;
        this.options = options;
    }

    buildHTML(index) {
        const dropdown = $('<div class="question field">').append(
            $('<label class="label">').text(this.question),
            $('<div class="control">').append(
                $('<div class="select">').append(
                    $('<select>').attr('name', index).append(
                        $('<option value="" selected disabled hidden>').text('Choose an option...'),
                        ...this.options.map((option, index) => $('<option>').text(option).val(index))
                    )
                )
            )
        )

        dropdown.one('change', askNextQuestion);

        return dropdown;

        // return $('<div class="question">').append(
            
        //     dropdown
        // )
    }
}