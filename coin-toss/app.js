let coin = document.querySelector("#coin");
let btn = document.querySelector("button");

let coinFlip = () => {
    coin.disabled = true;
    btn.disabled = true;
    let choice = Math.floor(Math.random() * 2);
    coin.classList.add("animation");

    setTimeout(() => {
        if (choice === 0) {
            coin.innerText = "Heads";
            coin.classList.remove("animation");
            btn.disabled = false;
            coin.disabled = false;
        }
        else {
            coin.innerText = "Tails";
            coin.classList.remove("animation");
            btn.disabled = false;
            coin.disabled = false;
        }
    }, 1000);
}

btn.addEventListener("click", coinFlip);
coin.addEventListener("click", coinFlip);