function createForm(formId, parentId, params) {
  // Create a form dynamically
  var form = document.createElement("form");
  form.setAttribute("id",formId)
  // form.setAttribute("method", "post");
  // form.setAttribute("action", "callback");
  for (let param of Object.keys(params)){
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", param);
    input.setAttribute("placeholder", `Enter your ${param}`);
    form.appendChild(input);
  }
  // create a submit button
  var btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.innerHTML = 'Submit'
  form.appendChild(btn);
  document.getElementById(parentId).appendChild(form);
  return form;
}
export {createForm};