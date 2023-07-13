
async function includeHTML(translation) {
    var z, element, file;

    z = document.getElementsByTagName("div");

    for (let i = 0; i < z.length; i++) {
        element = z[i];

        file = element.getAttribute("include-html");
        if (file) {
            try {
                let response = await (await fetch(file)).text();
                let scripts = [];

                new DOMParser()
                    .parseFromString(response, 'text/html')
                    .querySelectorAll('script[src]')
                    .forEach((script) => {
                        let newScript = document.createElement('script');

                        newScript.src = script.src;

                        script.remove();

                        scripts.push(newScript);
                    });

                element.outerHTML = response;

                scripts.forEach((script) => {
                    document.body.appendChild(script);
                });
            }
            catch (error) {
                console.log(error);
            }

            element.removeAttribute("include-html");
            if (translation) await translateHTML(translation);
            await includeHTML(translation);

            return;
        }
    }
}



async function translateHTML(translation) {
    if (!translation) return;

    var z, element, key;

    z = document.getElementsByTagName("*");

    for (let i = 0; i < z.length; i++) {
        element = z[i];

        key = element.getAttribute("translate-html");
        if (key) {
            try {
                let keys = key.split(".");
                let trans = translation;

                for (let j = 0; j < keys.length; j++) {
                    trans = trans[keys[j]];
                }

                if (trans) element.innerHTML = trans;
            }
            catch (error) {
                console.log(error);
            }

            element.removeAttribute("translate-html");
        }


        key = element.getAttribute("translate-tooltip");
        if (key) {
            try {
                let keys = key.split(".");
                let trans = translation;

                for (let j = 0; j < keys.length; j++) {
                    trans = trans[keys[j]];
                }

                if (trans) element.setAttribute("tooltip", trans);
            }
            catch (error) {
                console.log(error);
            }

            element.removeAttribute("translate-tooltip");
        }
    }
}



window.onload = async function() {
    let lang = navigator.language.substring(0, 2);
    document.querySelector("html").setAttribute("lang", lang);
    let translation = await fetch(`/assets/lang/${lang}.json`);
    if (translation) translation = await translation.json();
    includeHTML(translation)
        .then(() => translateHTML(translation));
}
