const cardData1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const cardData2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

const cardData3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

const cardData4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

const cardData5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

const cardData6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

const initialCards = [
  cardData1,
  cardData2,
  cardData3,
  cardData4,
  cardData5,
  cardData6,
];

/* Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-modal-close"
);
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Card & Card Form Elements
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = document.querySelector("#profile-add-card");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-close"
);
const addCardFormElement = addCardModal.querySelector("#add-card-form");

const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = addCardFormElement.querySelector("#add-card-name-input");
const cardImageInput = addCardFormElement.querySelector(
  "#add-card-image-input"
);

/* Functions */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleProfileEditModalKey);
}
const previewImageModal = document.querySelector("#full-image-modal");
const closePreviewModalButton = document.querySelector("#close-modal-button");
closePreviewModalButton.addEventListener("click", () => {
  closePopup(previewImageModal);
});

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeProfileEditModal() {
  closePopup(profileEditModal);
}

function closePreviewModal() {
  closePopup(previewImageModal);
}

function closeImageModal() {
  closePopup(addCardModal);
}

function handleProfileEditModalKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

const previewImageOverlay = document.querySelector("#preview-image-overlay");
previewImageOverlay.addEventListener("click", closePreviewModal);

const addCardOverlay = document.querySelector("#add-card-overlay");
addCardOverlay.addEventListener("click", closeImageModal);

const profileEditOverlay = document.querySelector("#profile-edit-overlay");
profileEditOverlay.addEventListener("click", closeProfileEditModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProfileEditModal();
    closePreviewModal();
    closeImageModal();
  }
});

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteCardButton = cardElement.querySelector(".card__trash-button");
  const previewImageModal = document.querySelector("#full-image-modal");

  const fullImageTitle = document.querySelector("#full-image-title");
  deleteCardButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    const fullImage = previewImageModal.querySelector("#full-image");
    fullImage.src = cardData.link;
    fullImage.alt = cardData.name;
    fullImageTitle.textContent = cardData.name;
    openModal(previewImageModal);
  });

  //add click listener to the cardImageEl

  //openModal with previewImageModal

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}
/*  Event Handelers */

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
}
/** Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

//add new card
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
