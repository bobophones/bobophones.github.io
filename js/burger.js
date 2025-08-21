function open_burger() {
    document.getElementById("burger").classList.add("opened");
};
function close_burger() {
    document.getElementById("burger").classList.remove("opened");
};

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("burger_b").addEventListener("click", open_burger);
    document.querySelector("#burger .burger_menu").addEventListener("click", event => {
        event._click_on_panel = true;
    });
    document.getElementById("burger").addEventListener("click", event => {
        if (event._click_on_panel) return;
        close_burger();
    });
});