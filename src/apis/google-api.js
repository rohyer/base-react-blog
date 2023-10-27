var comboGoogleTradutor = null;

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'pt',
    includedLanguages: 'pt,en,es,zh-CN',
    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
  }, 'google_translate_element');

  comboGoogleTradutor = document.getElementById("google_translate_element").querySelector(".goog-te-combo");
}

function changeEvent(el) {
  if (el.fireEvent) {
    el.fireEvent('onchange');
  } else {
    var evObj = document.createEvent("HTMLEvents");

    evObj.initEvent("change", false, false);
    el.dispatchEvent(evObj);
  }
}

function trocarIdioma(sigla) {
  if (comboGoogleTradutor) {
    comboGoogleTradutor.value = sigla;
    changeEvent(comboGoogleTradutor);
  }
}