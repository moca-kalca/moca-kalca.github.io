document.getElementById("zatvoriModal").onclick = () => 
{
  document.getElementById("modal").remove();
};

//zatvaranje modala pomocu ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.style.display = "none";
    }
  }
});

