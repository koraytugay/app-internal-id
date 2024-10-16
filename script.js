chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  const url = tabs[0].url;
  if (url.includes("management/view/application")) {
    const appPublicId = url.substring(url.lastIndexOf('/') + 1);
    doTheNeedful(url, appPublicId);
  } else {
    mainDiv().innerText = "Navigate to an application..";
  }
});

function doTheNeedful(url, publicId) {
  const applicationsUrl = url.substring(0, url.indexOf('/assets')).concat("/api/v2/applications");
  fetch(applicationsUrl, {mode: 'no-cors'})
  .then(response =>  response.text())
  .then(text => {
    mainDiv().innerText
        = JSON.parse(text).applications.filter(app => app.publicId === publicId)[0].id;
  });
}

function mainDiv() {
  return document.getElementById("main");
}
