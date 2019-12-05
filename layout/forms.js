var validate = new Bouncer(".pform");

let currentFS = document.querySelector("fieldset");
document.querySelectorAll(".next").forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    const next = currentFS.nextElementSibling;
    if (next && checkValidity()) {
      // make sure that this section of the form is valid before moving to the next.
      hideElement(currentFS);
      showElement(next);
      setActive(getFieldsetIndex(next));
      currentFS = next;
    } else {
      setButtonDisabled(true);
    }
  });
});
document.querySelectorAll(".previous").forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    const previous = currentFS.previousElementSibling;
    if (previous) {
      hideElement(currentFS);
      showElement(previous);
      setActive(getFieldsetIndex(previous));
      currentFS = previous;
      setButtonDisabled(false);
    }
  });
});

//helper functions
function showElement(element) {
  element.style.display = "block";
}
function hideElement(element) {
  element.style.display = "none";
}
function setActive(index) {
  const items = document.querySelectorAll(".pform__ProgressBar li");
  items.forEach((item, i) => {
    if (i <= index) item.classList.add("active");
    else item.classList.remove("active");
  });
}
function getFieldsetIndex(fs) {
  let index = null;
  const elements = document.querySelectorAll("fieldset");
  elements.forEach((el, i) => {
    if (el === fs) index = i;
  });
  return index;
}
function setButtonDisabled(state = true) {
  document.querySelectorAll(".next").forEach(button => {
    button.disabled = state;
  });
}
// use Bouncer to check for a valid form
function checkValidity() {
  const isValid = validate.validateAll(currentFS);
  return isValid.length ? false : true;
}

// watch for when errors are removed...when all are gone re-enable the next button
document.addEventListener("bouncerRemoveError", e => {
  setButtonDisabled(!checkValidity());
});
