// modal.js - Subscribe Modal Logic

class SubscribeModal {
  constructor() {
    this.form = document.getElementById('subscribeForm');
    this.submitBtn = document.getElementById('submitSubscribe');
    this.modal = document.getElementById('subscribeModal');
    this.init();
  }

  init() {
    if (this.submitBtn && this.form) {
      this.submitBtn.addEventListener('click', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }
    // Simulate async submission
    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Subscribing...';
    setTimeout(() => {
      this.showSuccess();
      this.form.reset();
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Subscribe';
    }, 1200);
  }

  showSuccess() {
    const modalBody = this.modal.querySelector('.modal-body');
    const successMsg = document.createElement('div');
    successMsg.className = 'alert alert-success mt-3';
    successMsg.textContent = 'Thank you for subscribing! You will receive our updates soon.';
    // Remove any previous alerts
    modalBody.querySelectorAll('.alert').forEach(el => el.remove());
    modalBody.appendChild(successMsg);
    setTimeout(() => {
      // Hide modal after 2 seconds
      const modalInstance = bootstrap.Modal.getOrCreateInstance(this.modal);
      modalInstance.hide();
      successMsg.remove();
    }, 2000);
  }
}

// Initialize modal logic when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('subscribeModal')) {
    new SubscribeModal();
  }
}); 