import { languages } from "./languages.js";

const selectLanguageInput = document.getElementById('select-language-input');
const selectLanguageOutput = document.getElementById('select-language-output');

for (let i = 0; i < languages.length; i++) {
    const optionInput = document.createElement('option');
    optionInput.innerText = languages[i].language;
    selectLanguageInput.appendChild(optionInput);

    const optionOutput = document.createElement('option');
    optionOutput.innerText = languages[i].language;
    selectLanguageOutput.appendChild(optionOutput);
}

var textInput = document.getElementById('text-input');
var textOutput = document.getElementById('text-output');

const translate = document.getElementById('translate');
translate.onclick=function () {
    const languageInput = selectLanguageInput.selectedIndex;
    const languageOutput = selectLanguageOutput.selectedIndex;
    const text = textInput.value;
    console.log(text)
    connection(languageInput, languageOutput, text)
 }

const connection = function (languageInput, languageOutput, text) {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
    method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': '531be1be24msh64369ff09175868p181b16jsna75c74031b80',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	body: new URLSearchParams({
		q: text,
		target: languages[languageOutput].code,
		source: languages[languageInput].code
	})
};

try {
    fetch(url, options)
    .then(function(res){return res.json()})
    .then(function (res) {
        console.log(res.data.translations[0].translatedText);
        textOutput.value = res.data.translations[0].translatedText;
        })
    } catch (error) {
	    console.error(error);
    }    
}