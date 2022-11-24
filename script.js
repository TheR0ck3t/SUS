pnh = document.getElementById("nh");
pnh.addEventListener("click", nh);
pxv = document.getElementById("pxv");
pxv.addEventListener("click", px);

function nh() {
    let nhl = 'https://www.nhentai.net/g/'
    let kodnh = Math.floor(Math.random() * 430000) + 1;
    //window.open( + kodnh + '/');
    let druknh = document.getElementById("printnh");
    let linknh = nhl + kodnh;
    druknh.innerHTML += '<a href=' + linknh + '>' + kodnh + '</a>' + '  ';
}

function px() {
    let pxl = 'https://www.pixiv.net/en/artworks/';
    let kodpx = Math.floor(Math.random() * 120000000) + 1;
    //window.open(px + kodpx + '/');
    let drukpx = document.getElementById("printpx");
    let linkpx = pxl + kodpx;
    drukpx.innerHTML += '<a href =' + linkpx + '>' + kodpx; + '</a>';
}

function dyski() {

}