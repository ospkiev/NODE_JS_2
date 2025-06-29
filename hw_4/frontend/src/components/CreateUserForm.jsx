import { useState } from 'react';
import './create-user-form.css';

const initialState = { name: '', email: '' };

export function CreateUserForm({ onSubmit }) {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit(values); // await add(user) із useUsers()
      setValues(initialState); // clear form
    } finally {
      setLoading(false);
    }
  };

  /* ───────── render ───────── */
  return (
    <form className='cuf-card' onSubmit={handleSubmit}>
      <label className='cuf-field'>
        <span className='cuf-label'>Назва/суміш зерен</span>
        <input
          className='cuf-input'
          type='text'
          name='beans'
          value={values.beans}
          onChange={handleChange}
          placeholder='Beans'
          disabled={loading}
        />
      </label>
      <label className='cuf-field'>
        <span className='cuf-label'>Спосіб заварювання</span>
        <input
          className='cuf-input'
          type='text'
          name='method'
          value={values.method}
          onChange={handleChange}
          placeholder='aeropress, chemex, espresso'
          disabled={loading}
        />
      </label>
      <label className='cuf-field'>
        <span className='cuf-label'>На скільки смак сподобався</span>
        <input
          className='cuf-input'
          type='text'
          name='rating'
          value={values.rating}
          onChange={handleChange}
          placeholder='від 1 до 10'
          disabled={loading}
        />
      </label>
      <label className='cuf-field'>
        <span className='cuf-label'>Вільні нотатки</span>
        <input
          className='cuf-input'
          type='text'
          name='notes'
          value={values.notes}
          onChange={handleChange}
          placeholder='Вільні нотатки'
          disabled={loading}
        />
      </label>
      <label className='cuf-field'>
        <span className='cuf-label'>Час/дата</span>
        <input
          className='cuf-input'
          type='text'
          name='Brew_at'
          value={values.brew_at}
          onChange={handleChange}
          placeholder='Час/дата'
          disabled={loading}
        />
      </label>

      <button className='cuf-btn' type='submit' disabled={loading}>
        {loading ? 'Saving…' : 'Brew'}
      </button>
    </form>
  );
}
