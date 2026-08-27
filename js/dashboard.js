document.addEventListener("DOMContentLoaded", () => {

    const sidebarToggle =
        document.getElementById("sidebarToggle");

    if (!sidebarToggle) {
        console.error("Botão da sidebar não encontrado.");
        return;
    }

    const savedState =
        localStorage.getItem(
            "nuvora-sidebar-collapsed"
        );

    if (savedState === "true") {
        document.body.classList.add(
            "sidebar-collapsed"
        );
    }

    sidebarToggle.addEventListener("click", () => {

        document.body.classList.toggle(
            "sidebar-collapsed"
        );

        const collapsed =
            document.body.classList.contains(
                "sidebar-collapsed"
            );

        localStorage.setItem(
            "nuvora-sidebar-collapsed",
            collapsed
        );

        sidebarToggle.setAttribute(
            "aria-label",
            collapsed
                ? "Expandir menu"
                : "Recolher menu"
        );

    });

});