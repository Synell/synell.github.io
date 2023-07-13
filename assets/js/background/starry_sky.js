function init() {
    var styles = ["animate4", "animate1", "animate2", "animate3"];
    var scales = ["scale1", "scale2", "scale3"];
    var opacities = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var stars = "";
    // var count = (window.innerWidth * window.innerHeight) / 9000;
    // count = rand(count * 0.9, count * 1.1);
    var count = 20;
    var middle_x = window.innerWidth / 2;
    var middle_y = window.innerHeight / 2;
    var largest_radius = Math.sqrt(middle_x * middle_x + middle_y * middle_y);

    for (var i = 0; i < count; i++) {
        var t = 2 * Math.PI * Math.random();
        var r = Math.sqrt(Math.random()) * largest_radius;
        var x = middle_x + r * Math.cos(t);
        var y = middle_y + r * Math.sin(t);

        stars += "<span class='star " + styles[rand(0, 4)] + " " + opacities[rand(0, 6)] + " "
        + scales[rand(0, 3)] + "' style='animation-delay: ." + rand(0, 9)+ "s; left: "
        + x + "px; top: " + y + "px;'></span>";
    }

    document.querySelector(".sky").innerHTML = stars;
}

init();
window.onresize = init;
