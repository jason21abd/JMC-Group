// api.js - Fetch and display Quote of the Day

class QuoteOfTheDay {
  constructor() {
    this.quoteDisplay = document.getElementById('quoteDisplay');
    if (this.quoteDisplay) {
      this.fetchQuote();
    }
  }

  async fetchQuote() {
    this.setLoading();
    try {
      const response = await fetch('/api/quote');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data && data.length > 0) {
        this.showQuote(data[0]);
      } else {
        this.setEmpty();
      }
    } catch (error) {
      this.setError();
    }
  }

  setLoading() {
    this.quoteDisplay.innerHTML = '<p class="lead">Loading...</p>';
  }

  setError() {
    this.quoteDisplay.innerHTML = '<p class="text-danger">Could not load quote. Please try again later.</p>';
  }

  setEmpty() {
    this.quoteDisplay.innerHTML = '<p class="text-muted">No quote available at the moment.</p>';
  }

  showQuote(quoteObj) {
    this.quoteDisplay.innerHTML = `
      <blockquote class="blockquote">
        <p class="mb-2">“${quoteObj.quote}”</p>
        <footer class="blockquote-footer mt-2">${quoteObj.author}</footer>
      </blockquote>
    `;
  }
}

// Initialize quote logic when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new QuoteOfTheDay();
}); 