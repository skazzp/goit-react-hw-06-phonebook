import { nanoid } from 'nanoid';
import { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

const ContactsForm = ({ saveContacts, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    if (event.target.name === 'name') setName(() => event.target.value);
    if (event.target.name === 'number') setNumber(() => event.target.value);
  };
  const resetForm = () => {
    setName(() => {
      return '';
    });
    setNumber(() => {
      return '';
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    if (contacts.filter(elem => elem.name === name).length) {
      return alert(`${name} is already in contacts!`);
    }
    saveContacts(contact);
    resetForm();
  };

  return (
    <form action="submit" onSubmit={handleFormSubmit}>
      <label htmlFor="name">
        <p className={css.label}>Name</p>
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="number">
        <p className={css.label}>Number</p>
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};

export default ContactsForm;

ContactsForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
