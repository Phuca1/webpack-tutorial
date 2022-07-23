import Kiwi from "./kiwi2.jpg";
import KiwiAltText from "./Kiwi-alt-text.txt";
import "./kiwi-image.scss";

class KiwiImage {
    render() {
        const img = document.createElement("img");
        img.src = Kiwi;
        img.alt = KiwiAltText;
        img.classList.add("kiwi-image");

        const body = document.querySelector("body");
        body.appendChild(img);
    }
}

export default KiwiImage;
