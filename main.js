// booking form and testimonials logic
   // MODAL
    const reserveBtn = document.querySelector(".reserve-btn");
    const modal = document.getElementById("bookingModal");
    const closeModal = document.getElementById("closeModal");

    reserveBtn.addEventListener("click", () => {
      modal.classList.add("show");
    });

    closeModal.addEventListener("click", () => {
      modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });

    // CALENDARIO
    flatpickr("#calendar", {
      minDate: "today",
      dateFormat: "Y-m-d",
      disable: [
        "2026-05-20",
        "2026-05-24"
      ]
    });


// =========================================
// TESTIMONIOS DINÁMICOS
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  const testimonialForm =
  document.querySelector(".testimonial-form");

  const testimonialsGrid =
  document.querySelector(".testimonials-grid");

  const stars =
  document.querySelectorAll(".stars-select span");

  const starsContainer =
  document.querySelector(".stars-select");

  let selectedRating = 0;

  // =========================================
  // ESTRELLAS INTERACTIVAS
  // =========================================

  stars.forEach(star => {

    star.addEventListener("click", () => {

      selectedRating =
      Number(star.dataset.value);

      starsContainer.dataset.rating =
      selectedRating;

      updateStars(selectedRating);

    });

  });

  function updateStars(rating){

    stars.forEach(star => {

      const value =
      Number(star.dataset.value);

      if(value <= rating){

        star.style.color = "#ffd166";

        star.style.opacity = "1";

      }else{

        star.style.color = "#666";

        star.style.opacity = ".5";

      }

    });

  }

  updateStars(selectedRating);

  // =========================================
  // VALIDAR
  // =========================================

  if(!testimonialForm || !testimonialsGrid) return;

  // =========================================
  // CARGAR REVIEWS
  // =========================================

  const savedReviews =
  JSON.parse(
    localStorage.getItem("crystalwaveReviews")
  ) || [];

  savedReviews.forEach(review => {
    createReviewCard(review);
  });

  // =========================================
  // SUBMIT
  // =========================================

  testimonialForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name =
    testimonialForm.querySelector("input").value;

    const service =
    testimonialForm.querySelector("select").value;

    const comment =
    testimonialForm.querySelector("textarea").value;

    if(
      name.trim() === "" ||
      service.trim() === "" ||
      comment.trim() === ""
    ){
      alert("Completa todos los campos.");
      return;
    }

    // REVIEW DATA

    const reviewData = {
      name,
      service,
      comment,
      rating:selectedRating
    };

    // CREAR CARD

    createReviewCard(reviewData);

    // GUARDAR

    const existingReviews =
    JSON.parse(
      localStorage.getItem("crystalwaveReviews")
    ) || [];

    existingReviews.push(reviewData);

    localStorage.setItem(
      "crystalwaveReviews",
      JSON.stringify(existingReviews)
    );

    // RESET

    testimonialForm.reset();

selectedRating = 0;

updateStars(selectedRating);

    alert("¡Comentario publicado!");

  });

  // =========================================
  // CREAR CARD
  // =========================================

  function createReviewCard(review){

    const card =
    document.createElement("div");

    card.classList.add("testimonial-card");

    let starsHTML = "";

    for(let i = 1; i <= 5; i++){

      if(i <= review.rating){

        starsHTML += "★";

      }else{

        starsHTML += "☆";

      }

    }

    card.innerHTML = `

      <div class="testimonial-stars">
        ${starsHTML}
      </div>

      <p>
        "${review.comment}"
      </p>

      <div class="testimonial-user">
        <h4>${review.name}</h4>
        <span>${review.service}</span>
      </div>

    `;

    testimonialsGrid.prepend(card);

  }

});