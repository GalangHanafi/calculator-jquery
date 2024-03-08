$(document).ready(function () {
    // Variabel untuk menyimpan ekspresi matematika
    var equation = [];
    var number = [];

    var operators = {
        mul: '*',
        div: '/',
        add: '+',
        sub: '-',
        mod: '%'
    };
    var operatorsValues = Object.values(operators);

    function displayEquationAndResult(equation, result) {
        $("#equation").val(equation.join(''));
        $("#display").val(result.join(''));
    }

    // Fungsi untuk menghapus isi layar kalkulator
    $("#clear").click(function () {
        equation = [];
        number = [];
        displayEquationAndResult([""], ["0"]);
    });

    // Fungsi untuk menambahkan angka ke ekspresi
    for (let index = 0; index < 10; index++) {
        $(`#${index}`).click(function () {
            var value = $(this).attr("id");
            equation.push(value);
            number.push(value);
            displayEquationAndResult(equation, number);
        });
    }

    // Fungsi untuk menambahkan operator ke ekspresi
    Object.keys(operators).forEach(element => {
        $(`#${element}`).click(function () {
            number = [];

            var lastEquation = equation[equation.length - 1];
            var firstEquation = equation[0];
            var operatorId = $(this).attr("id");

            if (!operatorsValues.includes(lastEquation) && firstEquation !== undefined) {
                equation.push(operators[operatorId]);

            } else if (operatorsValues.includes(lastEquation)) {
                equation.pop();
                equation.push(operators[operatorId]);
            }

            displayEquationAndResult(equation, [0]);
        });
    });

    // Fungsi untuk mengevaluasi ekspresi matematika saat tombol "=" diklik
    $("#equal").click(function () {
        var lastEquation = equation[equation.length - 1];
        var firstEquation = equation[0];

        if (!operatorsValues.includes(lastEquation) && firstEquation !== undefined) {
            var result = [eval(equation.join(""))];
        } else if (operatorsValues.includes(lastEquation)) {
            equation.pop();
            var result = [eval(equation.join(""))];
        }

        equation = [result];
        displayEquationAndResult(equation, result);
    });
});
