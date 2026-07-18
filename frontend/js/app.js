const appContainer = document.getElementById("app");
const navContainer = document.getElementById("nav");

function renderNav() {
  if (!localStorage.getItem("access_token")) {
    navContainer.innerHTML = "";
    return;
  }

  navContainer.innerHTML = `
    <div class="nav-bar">
      <button type="button" id="nav-test">Test vocacional</button>
      <button type="button" id="nav-careers">Catálogo de carreras</button>
    </div>
  `;

  navContainer.querySelector("#nav-test").addEventListener("click", () => renderTestView(appContainer));
  navContainer.querySelector("#nav-careers").addEventListener("click", () => renderCareersView(appContainer));
}

if (localStorage.getItem("access_token")) {
  renderNav();
  renderTestView(appContainer);
} else {
  renderLoginView(appContainer);
}
