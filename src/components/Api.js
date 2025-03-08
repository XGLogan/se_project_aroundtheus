export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  

    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
   // Get initial cards
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      }).then(this._handleResponse);
    }
  
    // Get user info
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      }).then(this._handleResponse);
    }
  
    // Patch profile info
    setUserInfo(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }).then(this._handleResponse);
    }
  
    // Add new card
    addNewCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }).then(this._handleResponse);
    }

    setAvatar(avatarUrl) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ avatar: avatarUrl })
      })
        .then((res) => this._handleResponse(res));
    }
    
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(res => this._handleResponse(res));
      }
      likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(res => this._handleResponse(res));
      }
      
      unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(res => this._handleResponse(res));
      }
      
}

