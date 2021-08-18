const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

const results = [
  new Result("Вам нужно развивать логику", 0),
  new Result("У Вас уже неплохо развита логика", 2),
  new Result("Ваш уровень логики выше среднего", 4),
  new Result("Уровень Вашей логики впечатляет!", 6),
];

const questions = [
  new Question(
    "Алёна задумала число, прибавил к нему 5, потом разделил итоговое число на 3, умножил результат на 4, отнял 6, разделил на 7 и получил 2. Какое число задумала Алёна??",
    [
      new Answer("5", 0),
      new Answer("7", 0),
      new Answer("10", 1),
      new Answer("15", 0),
    ]
  ),
  new Question(
    "6 карасей легче 5 окуней, но тяжелее 10 лещей. Что тяжелее — 2 карася или 3 леща?",
    [
      new Answer("2 карася", 1),
      new Answer("3 леща", 0),
      new Answer("Их вес будет одинаков", 0),
    ]
  ),
  new Question(
    "Есть 100 кг ягод, 99% веса которых составляет вода. Из-за продолжительного хранения содержание воды в ягодах сократилось до 98%. Сколько теперь весят ягоды?",
    [new Answer("99 кг", 0), new Answer("98,8 кг", 0), new Answer("50 кг", 1)]
  ),
  new Question(
    "Книга содержит N страниц, которые пронумерованы стандартно: от 1 до N. Если сложить количество цифр (не сами числа), что содержатся в каждом номере страницы, выйдет 1095. Так сколько в книге страниц?",
    [new Answer("401", 1), new Answer("130", 0), new Answer("282", 0)]
  ),
  new Question("Сколько раз встречается цифра 4 в целых числах от 1 до 50?", [
    new Answer("10", 0),
    new Answer("15", 1),
    new Answer("7", 0),
    new Answer("16", 0),
  ]),
  new Question(
    "Топор весит килограмм и полтопора. Сколько килограммов весит топор?",
    [
      new Answer("1,75", 0),
      new Answer("3", 0),
      new Answer("1,5", 0),
      new Answer("2", 1),
    ]
  ),
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update() {
  if (quiz.current < quiz.questions.length) {
    headElem.innerHTML = quiz.questions[quiz.current].text;

    buttonsElem.innerHTML = "";

    for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
      let btn = document.createElement("button");
      btn.className = "button";

      btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

      btn.setAttribute("index", i);

      buttonsElem.appendChild(btn);
    }

    pagesElem.innerHTML = quiz.current + 1 + " / " + quiz.questions.length;

    Init();
  } else {
    buttonsElem.innerHTML = "";
    headElem.innerHTML = quiz.results[quiz.result].text;
    pagesElem.innerHTML = "Очки: " + quiz.score;
  }
}

function Init() {
  let btns = document.getElementsByClassName("button");

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) {
      Click(e.target.getAttribute("index"));
    });
  }
}

function Click(index) {
  let correct = quiz.Click(index);

  let btns = document.getElementsByClassName("button");

  for (let i = 0; i < btns.length; i++) {
    btns[i].className = "button button_passive";
  }

  if (quiz.type == 1) {
    if (correct >= 0) {
      btns[correct].className = "button button_correct";
    }

    if (index != correct) {
      btns[index].className = "button button_wrong";
    }
  } else {
    btns[index].className = "button button_correct";
  }
  setTimeout(Update, 1000);
}
