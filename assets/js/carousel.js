let handleKeydown;

function renderCarouselView(deck) {
  const decksSection = document.querySelector(".decks");
  const carouselSection = document.querySelector(".carousel");
  const notFoundSection = document.querySelector("#not-found");
  const aboutSection = document.querySelector("#about");

  decksSection.style.display = "none";
  carouselSection.style.display = "flex";
  notFoundSection.style.display = "none";

  if (aboutSection) {
    aboutSection.style.display = "none";
  }

  let currentIndex = 0;
  let showingQuestion = true;

  const titleEl = carouselSection.querySelector(".carousel__title");
  const cardTextEl = carouselSection.querySelector(".carousel__card-text");
  const cardEl = carouselSection.querySelector(".carousel__card");
  const prevBtn = carouselSection.querySelector(".carousel__btn_type_left");
  const nextBtn = carouselSection.querySelector(".carousel__btn_type_right");
  const flipBtn = carouselSection.querySelector(".carousel__btn_type_flip");

  titleEl.textContent = deck.name;

  let counterEl = carouselSection.querySelector(".carousel__counter");

  if (!counterEl) {
    counterEl = document.createElement("p");
    counterEl.className = "carousel__counter";
    titleEl.after(counterEl);
  }

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];

    if (showingQuestion) {
      cardTextEl.textContent = currentCard.question;
      cardEl.style.backgroundColor = deck.color;
    } else {
      cardTextEl.textContent = currentCard.answer;
      cardEl.style.backgroundColor = "#ffffff";
    }

    counterEl.textContent = `Card ${currentIndex + 1} of ${deck.cards.length}`;

    prevBtn.disabled = currentIndex === 0;
    prevBtn.classList.toggle("carousel__btn_disabled", currentIndex === 0);

    nextBtn.disabled = currentIndex === deck.cards.length - 1;
    nextBtn.classList.toggle(
      "carousel__btn_disabled",
      currentIndex === deck.cards.length - 1,
    );
  }

  function goToCard(index) {
    currentIndex = index;
    showingQuestion = true;
    updateDisplay();
  }

  prevBtn.onclick = () => {
    if (currentIndex > 0) {
      goToCard(currentIndex - 1);
    }
  };

  nextBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      goToCard(currentIndex + 1);
    }
  };

  flipBtn.onclick = () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  };

  if (handleKeydown) {
    window.removeEventListener("keydown", handleKeydown);
  }

  handleKeydown = (evt) => {
    if (
      carouselSection.style.display === "none" ||
      window.location.hash !== `#carousel/${deck.id}`
    ) {
      return;
    }

    if (evt.key === "ArrowLeft" && currentIndex > 0) {
      goToCard(currentIndex - 1);
    } else if (
      evt.key === "ArrowRight" &&
      currentIndex < deck.cards.length - 1
    ) {
      goToCard(currentIndex + 1);
    } else if (evt.key === " " || evt.key === "Enter") {
      evt.preventDefault();
      showingQuestion = !showingQuestion;
      updateDisplay();
    }
  };

  window.addEventListener("keydown", handleKeydown);

  updateDisplay();
}

export { renderCarouselView };
