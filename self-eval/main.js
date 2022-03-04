const outcomes = [
  {
    shortCode: "learn",
    outcome:
      "Solve problems through independent study and application—learn how to learn.",
    objectives: [
      {
        shortCode: 1,
        text: "Student demonstrates the ability to review someone else's CSS/HTML code or documentation for learning/understanding.",
        score: 0
      },
      {
        shortCode: 2,
        text: "Student is adept at finding good sources to answer questions that may arise from challenges they face.",
        score: 0
      },
      {
        shortCode: 3,
        text: "Student has the ability/resources to follow current trends and changes in the industry and can assess when it is appropriate to implement a new addition to CSS in a project.",
        score: 0
      }
    ],
    score: 0
  }
];
function formDataToJSON(formElement) {
  var formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
function getScores(outcome) {
  return [...outcome].map((item, index) => {
    return { item: index + 1, score: parseFloat(item.value) };
  });
}
function getOutcomes() {
  const learn = document.querySelectorAll("[name |=learn]");
  const css = document.querySelectorAll("[name |=css]");
  const scss = document.querySelectorAll("[name |=scss]");
  const group = document.querySelectorAll("[name |=group]");

  const data = {};
  data.learn = getScores(learn);
  data.css = getScores(css);
  data.scss = getScores(scss);
  data.group = getScores(group);
  data.learn.avg = avgScores(data.learn);
  data.css.avg = avgScores(getScores(css));
  data.scss.avg = avgScores(getScores(scss));
  data.group.avg = avgScores(getScores(group));
  return data;
}
function avgScores(data) {
  const count = data.length;
  const avg = data.reduce((total, item) => (total += item.score), 0) / count;
  return avg.toFixed(2);
}
function outputObj(objs) {
  return objs.map((obj) => `<p>${obj.item}: ${obj.score}</p>`).join("");
}
function outputScores(data, time) {
  const outputElement = document.querySelector("#summary");
  // const html = `<ol><li>Learn how to Learn: <span>${data.learnAvg}</span></li>
  //   <li>CSS: <span>${data.cssAvg}</span></li>
  //   <li>Preprocessors: <span></span></li>
  //   <li>Teamwork: <span></span></li></ol>
  //   <p>Overall: <span></span></p>`;
  let html = `<table>
  <tr>
    <td>1. Learn how to Learn ${outputObj(data.learn)}</td>
    <td>${data.learn.avg}</td>
  </tr>
  <tr>
    <td>2. CSS ${outputObj(data.css)}</td>
    <td>${data.css.avg}</td>
  </tr>
  <tr>
    <td>3. Preprocessors ${outputObj(data.scss)}</td>
    <td>${data.scss.avg}</td>
  </tr>
  <tr>
    <td>4. Teamwork ${outputObj(data.group)}</td>
    <td>${data.group.avg}</td>
  </tr>`;
  if (time == "midterm") {
    html += "</table>";
  } else {
    html += `<tr>
    <td>Overall</td>
    <td>${data.overall}</td>
  </tr>
</table>`;
  }

  outputElement.innerHTML = html;
  console.log(data);
}

function processForm(e) {
  e.preventDefault();

  const formData = formDataToJSON(this);
  const time = formData.time;
  let data = getOutcomes();
  data.overall =
    (parseFloat(data.learn.avg) +
      parseFloat(data.css.avg) +
      parseFloat(data.scss.avg) +
      parseFloat(data.group.avg)) /
    4;
  outputScores(data, time);
}

document.querySelector("#outcomes").addEventListener("submit", processForm);
