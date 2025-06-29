import { useState } from 'react';
import './create-user-form.css';

const initialState = { name: '', email: '' };

export function CreateUserForm({ onSubmit }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ───────── helpers ───────── */
  const validate = ({ name, email }) => {
    const errs = {};
    if (!name.trim()) errs.name = 'Ім’я обовʼязкове';
    if (!/^[\w-.]+@[\w-.]+\.[A-Za-z]{2,}$/i.test(email))
      errs.email = 'Неправильний e-mail';
    return errs;
  };

  const handleChange = e =>
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setLoading(true);
      await onSubmit(values);       // await add(user) із useUsers()
      setValues(initialState);      // clear form
    } finally {
      setLoading(false);
    }
  };

  /* ───────── render ───────── */
  return (
    <form className="cuf-card" onSubmit={handleSubmit}>
      <label className="cuf-field">
        <span className="cuf-label">Name</span>
        <input
          className="cuf-input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Alice"
          disabled={loading}
        />
        {errors.name && <span className="cuf-error">{errors.name}</span>}
      </label>

      <label className="cuf-field">
        <span className="cuf-label">E-mail</span>
        <input
          className="cuf-input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="alice@example.com"
          disabled={loading}
        />
        {errors.email && <span className="cuf-error">{errors.email}</span>}
      </label>

      <button className="cuf-btn" type="submit" disabled={loading}>
        {loading ? 'Saving…' : 'Create user'}
      </button>
    </form>
  );
}