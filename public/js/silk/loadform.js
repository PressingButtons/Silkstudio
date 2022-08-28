export default function(type) {

    return fetch(`/public/html/${type}.html`)
    .then(res => res.text( ))
    .then(html => {
        document.getElementById('overpane').innerHTML = html;
        document.getElementById('overpane').classList.add('show');
        return document.getElementById('overpane').firstChild;
    });

}