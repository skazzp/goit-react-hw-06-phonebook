import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/store';
import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.data);
  const filterQuery = useSelector(state => state.filter);
  const dispatch = useDispatch();
  // console.log(first)
  const filterContacts = (contacts, filterQuery) => {
    console.log(contacts, filterQuery);
    return filterQuery
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(filterQuery.toLowerCase())
        )
      : contacts;
  };
  const filteredContacts = filterContacts(contacts, filterQuery);
  // console.log(filteredContacts);
  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => {
        return (
          <li key={contact.id} className={css.item}>
            <span className={css.name}>{contact.name} : </span>
            <span>{contact.number}</span>
            <button
              type="button"
              onClick={() => {
                // console.log(contacts);
                dispatch(removeContact(contact.id));
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
