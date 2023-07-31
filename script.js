pnh = document.getElementById("nh");
pnh.addEventListener("click", nh);
let kody = [];

function losowanie() {
    let rng = Math.floor(Math.random() * 465639) + 1;
    kody.push(rng)
}

function nh() {
    iloscKodow = 12;
    let nhl = 'https://www.nhentai.net/g/'
    let linki = [];

    for (let i = 0; i < 1; i++) {
        losowanie();
    }
    for (var i = 0; i < kody.length; i++) {
        linki.push(nhl + kody[i]);
    }
    let druknh = document.getElementById("printnh");
    for (let i = 0; i < linki.length; i++) {
        link = linki[i];
        for (let i = 0; i < kody.length; i++) {
            kod = kody[i];
        }
    }
    druknh.innerHTML += '<a href=' + link + '>' + '<p class="link">' + kod + '</p>' + '</a>';

}