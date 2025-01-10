import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  }
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");

// Card & Card Form Elements
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = document.querySelector("#profile-add-card");
const addCardFormElement = addCardModal.querySelector("#add-card-form");

const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = addCardFormElement.querySelector("#add-card-name-input");
const cardImageInput = addCardFormElement.querySelector("#add-card-image-input");

const validationSettings = {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible'
};

/* Functions */
function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener("keydown", handleModalKeyDown);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleModalKeyDown);
}

function handleModalKeyDown(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Handle image click event
function handleImageClick(name, link) {
  const fullImage = previewImageModal.querySelector("#full-image");
  const fullImageTitle = previewImageModal.querySelector("#full-image-title");
  fullImage.src = link;
  fullImage.alt = name;
  fullImageTitle.textContent = name;
  openModal(previewImageModal);
}

// Render a card
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link });
  closeModal(addCardModal);
  addCardFormElement.reset();
  addCardFormValidator.disableButton();
}

/** Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

const modalCloseButtons = document.querySelectorAll('.modal__close-button');
modalCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});
function closeModalOnOverlayClick(event) {
  if (event.target.classList.contains('modal')) {
    closeModal(event.target); 
  }
}
const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
  modal.addEventListener('click', closeModalOnOverlayClick);  
});

// Close preview image modal
const previewImageModal = document.querySelector("#full-image-modal");
const closePreviewModalButton = document.querySelector("#close-modal-button");
closePreviewModalButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData));

const profileFormValidator = new FormValidator(validationSettings, profileEditForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, addCardFormElement);
addCardFormValidator.enableValidation();
