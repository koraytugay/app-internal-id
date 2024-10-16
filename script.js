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
  alert('hello 1');
  fetch('https://sonatype.sonatype.app/platform/rest/ci/componentDetails/application/nexus-iq-fortify/allVersions?componentIdentifier=%7B%22format%22%3A%22maven%22%2C%22coordinates%22%3A%7B%22artifactId%22%3A%22jetty-server%22%2C%22classifier%22%3A%22%22%2C%22extension%22%3A%22jar%22%2C%22groupId%22%3A%22org.eclipse.jetty%22%2C%22version%22%3A%229.4.51.v20230217%22%7D%7D&hash=d0572c8460eb26adf842&matchState=exact&proprietary=false&identificationSource=Sonatype&scanId=6ac1cd0aaac54ae7bd6acd147d6ec675&stageId=build&dependencyType=transitive&timestamp=1729114732399', {mode: 'no-cors'})
  .then(response =>  alert(response));
  return document.getElementById("main");
}
