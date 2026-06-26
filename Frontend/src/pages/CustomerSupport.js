import { useState } from "react";

function CustomerSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    alert(
      "Your support request has been submitted successfully!"
    );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="support-page">

      {/* Header */}

      <div className="support-header">
        <h1>Customer Support</h1>

        <p>
          We're available 24/7 to help
          with your orders, returns,
          payments, and account issues.
        </p>
      </div>

      {/* Support Options */}

      <div className="support-grid">

        <div className="support-card">
          <h3>📞 Phone Support</h3>

          <p>
            +91 98765 43210
          </p>

          <span>
            Available 24/7
          </span>
        </div>

        <div className="support-card">
          <h3>✉ Email Support</h3>

          <p>
            support@trendera.com
          </p>

          <span>
            Reply within 24 hours
          </span>
        </div>

        <div className="support-card">
          <h3>💬 Live Chat</h3>

          <p>
            Instant Assistance
          </p>

          <span>
            Monday - Sunday
          </span>
        </div>

        <div className="support-card">
          <h3>📦 Track Orders</h3>

          <p>
            Real-Time Tracking
          </p>

          <span>
            Monitor shipments
          </span>
        </div>

      </div>

      {/* Contact Form */}

      <div className="contact-support">

        <h2>
          Contact Support Team
        </h2>

        <form
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name:
                  e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email:
                  e.target.value,
              })
            }
            required
          />

          <textarea
            rows="6"
            placeholder="Describe your issue..."
            value={
              formData.message
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                message:
                  e.target.value,
              })
            }
            required
          />

          <button type="submit">
            Submit Request
          </button>

        </form>
      </div>

      {/* FAQ Section */}

      <div className="faq-section">

        <h2>
          Frequently Asked Questions
        </h2>

        <div className="faq-card">
          <h4>
            How can I track my
            order?
          </h4>

          <p>
            Go to Orders page and
            click "Track Order".
          </p>
        </div>

        <div className="faq-card">
          <h4>
            What is your return
            policy?
          </h4>

          <p>
            Products can be
            returned within
            7 days of delivery.
          </p>
        </div>

        <div className="faq-card">
          <h4>
            How long does delivery
            take?
          </h4>

          <p>
            Standard delivery takes
            3-7 business days.
          </p>
        </div>

        <div className="faq-card">
          <h4>
            Are payments secure?
          </h4>

          <p>
            Yes. We use encrypted
            payment gateways for
            maximum security.
          </p>
        </div>

      </div>

    </div>
  );
}

export default CustomerSupport;